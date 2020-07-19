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
    max_ttl                = 31536000
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
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
