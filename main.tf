provider "aws" {
  region = "eu-west-1"
}

resource "aws_route53_record" "a_record" {
  zone_id = "Z2NO2HNDAEBJY7"
  name    = "markwilson.me"
  type    = "A"
  records = ["185.199.108.153", "185.199.109.153", "185.199.110.153", "185.199.111.153"] # GitHub IPs
  ttl     = 3600
}

resource "aws_route53_record" "aaaa_record" {
  zone_id = "Z2NO2HNDAEBJY7"
  name    = "markwilson.me"
  type    = "A"
  records = ["2606:50c0:8000::153", "2606:50c0:8001::153", "2606:50c0:8002::153", "2606:50c0:8003::153"] # GitHub IPs
  ttl     = 3600
}

resource "aws_route53_record" "verification" {
  zone_id = "Z2NO2HNDAEBJY7"
  name    = "_github-pages-challenge-markwilson.markwilson.me"
  type    = "TXT"
  records = ["c5d30a00ecd790beb0f73122665f53"]
  ttl     = 3600
}

terraform {
  backend "s3" {
    bucket = "terraform.markwilson.me"
    key    = "markwilson.me"
    region = "eu-west-1"
  }
}
