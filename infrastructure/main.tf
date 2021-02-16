terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "us-east-2"
}

resource "aws_ecr_repository" "repo" {
  name = "new-years-day"
}

locals {
  app_port = 5477
  # I manually made this key
  # - https://console.aws.amazon.com/ec2/v2/home?#KeyPairs
  # - chmod 600 main.pem
  # - ssh -i ~/.ssh/main.pem ec2-user@public_dns
  key_name = "main"
}

data "aws_ami" "ecs_ami" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn-ami-*-amazon-ecs-optimized"]
  }
}

resource "aws_security_group" "sg" {
  name        = "new-years-day"
  description = "Controls access to the API"
}

resource "aws_security_group_rule" "app" {
  type              = "ingress"
  protocol          = "tcp"
  from_port         = local.app_port
  to_port           = local.app_port
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.sg.id
}

data "http" "myip" {
  url = "http://ipv4.icanhazip.com"
}

resource "aws_security_group_rule" "ssh" {
  count             = var.allow_ssh ? 1 : 0
  type              = "ingress"
  protocol          = "tcp"
  from_port         = 22
  to_port           = 22
  cidr_blocks       = ["${chomp(data.http.myip.body)}/32"]
  security_group_id = aws_security_group.sg.id
}

resource "aws_security_group_rule" "egress" {
  type              = "egress"
  protocol          = "-1"
  from_port         = 0
  to_port           = 0
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.sg.id
}

resource "aws_iam_instance_profile" "server" {
  name = "nyd-server"
  role = aws_iam_role.server.name
}

resource "aws_iam_role" "server" {
  name = "nyd"
  path = "/"

  assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
               "Service": "ec2.amazonaws.com"
            },
            "Effect": "Allow",
            "Sid": ""
        }
    ]
}
EOF
}

resource "aws_iam_role_policy" "docker" {
  name = "docker"
  role = aws_iam_role.server.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "ecr:GetAuthorizationToken",
        ]
        Effect   = "Allow"
        Resource = "*"
      },
      {
        Action   = ["ecr:BatchGetImage", "ecr:GetDownloadUrlForLayer"]
        Effect   = "Allow"
        Resource = aws_ecr_repository.repo.arn
      }
    ]
  })
}

resource "aws_instance" "server" {
  ami                  = data.aws_ami.ecs_ami.id
  instance_type        = "t2.micro" # t2.nano is cheaper, but micro is free tier eligible
  security_groups      = [aws_security_group.sg.name]
  iam_instance_profile = aws_iam_instance_profile.server.name
  key_name             = local.key_name
  user_data            = templatefile("${path.module}/setup.sh.tpl", { image = aws_ecr_repository.repo.repository_url, app_port = local.app_port })
}
