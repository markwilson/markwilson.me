variable "recaptcha_secret" {
  type = string
}

variable "send_to" {
  type = string
}

provider "aws" {
  region = "eu-west-1"
}

resource "aws_s3_bucket" "bucket" {
  bucket = "markwilson.me"
  acl    = "private"
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "access-identity-markwilson.me.s3.amazonaws.com"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = "markwilson.me.s3.amazonaws.com"
    origin_id   = "S3-markwilson.me"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  is_ipv6_enabled     = true
  price_class         = "PriceClass_100"
  enabled             = true
  default_root_object = "index.html"

  aliases = ["markwilson.me"]

  viewer_certificate {
    acm_certificate_arn      = "arn:aws:acm:us-east-1:834225440640:certificate/e6a5f7b1-caa1-40df-b23d-0661d49300b0"
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2019"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-markwilson.me"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 60
    default_ttl            = 300
    max_ttl                = 2419200
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  custom_error_response {
    error_caching_min_ttl = 60
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
  }
}

resource "aws_route53_record" "site" {
  zone_id = "Z2NO2HNDAEBJY7"
  name    = "markwilson.me"
  type    = "A"

  alias {
    evaluate_target_health = false
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
  }
}

resource "aws_route53_record" "verification" {
  zone_id = "Z2NO2HNDAEBJY7"
  name    = "_github-pages-challenge-markwilson.markwilson.me"
  type    = "TXT"
  records = ["c5d30a00ecd790beb0f73122665f53"]
  ttl     = 3600
}

data "aws_iam_policy_document" "AWSLambdaTrustPolicy" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda_iam" {
  name               = "sendmessage"
  assume_role_policy = data.aws_iam_policy_document.AWSLambdaTrustPolicy.json
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_iam.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "ses_policy" {
  role       = aws_iam_role.lambda_iam.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSESFullAccess"
}

resource "aws_lambda_function" "send_message_function" {
  filename      = "send_message.zip"
  function_name = "send_message"
  role          = aws_iam_role.lambda_iam.arn
  handler       = "index.handler"

  source_code_hash = filebase64sha256("send_message.zip")

  runtime = "nodejs12.x"
  timeout = 10

  environment {
    variables = {
      # TODO: configure CORS better, it's currently open to all
      "INCLUDE_CORS_HEADERS" = "true"
      "SCORE_THRESHOLD"      = "0.5"

      "RECAPTCHA_SECRET" = var.recaptcha_secret
      "SEND_TO"          = var.send_to
    }
  }
}

resource "aws_apigatewayv2_api" "send_message_api" {
  name          = "send_message"
  protocol_type = "HTTP"

  target    = aws_lambda_function.send_message_function.arn
  route_key = "POST /"

  cors_configuration {
    allow_headers = ["*"]
    allow_methods = [
      "OPTIONS",
      "POST",
    ]
    allow_origins = ["*"]
  }
}

resource "aws_lambda_permission" "api_gateway" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.send_message_function.arn
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.send_message_api.execution_arn}/*/*"
}

terraform {
  backend "s3" {
    bucket = "terraform.markwilson.me"
    key    = "markwilson.me"
    region = "eu-west-1"
  }
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.s3_distribution.id
}

output "api_domain" {
  value = aws_apigatewayv2_api.send_message_api.api_endpoint
}
