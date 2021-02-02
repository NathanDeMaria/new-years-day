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

module "cluster" {
  source = "./cluster"
}

module "network" {
  source = "./network"
}

module "db" {
  source     = "./db"
  subnet_ids = module.network.subnet_ids
  vpc_id     = module.network.vpc_id
  sg_id      = module.network.sg_id
}

module "service" {
  source          = "./service"
  ecs_cluster_arn = module.cluster.arn
  image           = aws_ecr_repository.repo.repository_url
  subnet_ids      = module.network.subnet_ids
  sg_id           = module.network.sg_id
  db_endpoint     = module.db.endpoint
}
