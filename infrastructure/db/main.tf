# This was manually created outside of terraform...srry
data "aws_secretsmanager_secret_version" "creds" {
  secret_id = "new-years-day/db"
}

locals {
  db_creds = jsondecode(
    data.aws_secretsmanager_secret_version.creds.secret_string
  )
}

module "rds-aurora" {
  source  = "terraform-aws-modules/rds-aurora/aws"
  version = "3.4.0"

  name                    = "new-years-day"
  engine                  = "aurora-mysql"
  engine_version          = "5.7.mysql_aurora.2.07.2"
  subnets                 = var.subnet_ids
  vpc_id                  = var.vpc_id
  instance_type           = "db.t2.small"
  allowed_security_groups = [var.sg_id]
  username                = local.db_creds.username
  password                = local.db_creds.password
  create_random_password  = false
  # Has to match connection string in API :/
  database_name = "newYearsDay"
}
