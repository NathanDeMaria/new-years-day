data "aws_region" "current" {}

module "task_execution_role" {
  source = "./task_execution_role"
}

module "task_role" {
  source = "./task_role"
}

resource "aws_ecs_task_definition" "api" {
  family                   = "service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = module.task_execution_role.role_arn
  task_role_arn            = module.task_role.role_arn
  container_definitions = jsonencode([
    {
      "image" : var.image
      "name" : "api",
      "environment" : [
        { "name" : "DB_URL", "value" : var.db_endpoint },
        { "name" : "DB_NAME", "value" : var.db_name }
      ]
      "portMappings" : [
        {
          "containerPort" : 8000,
          "hostPort" : 8000
        }
      ],
      "logConfiguration" : {
        "logDriver" : "awslogs",
        "options" : {
          // TODO: this has to match the group in the cluster name
          "awslogs-group" : "/ecs/new-years-day",
          "awslogs-region" : data.aws_region.current.name,
          "awslogs-stream-prefix" : "ecs"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "service" {
  name            = "new-years-day"
  cluster         = var.ecs_cluster_arn
  task_definition = aws_ecs_task_definition.api.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  network_configuration {
    security_groups  = [var.sg_id]
    assign_public_ip = true
    subnets          = var.subnet_ids
  }
}
