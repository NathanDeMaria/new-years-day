data "aws_region" "current" {}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "new-years-day-execution-role"
  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "ecs-tasks.amazonaws.com"
        },
        "Action" : "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_policy" "ecr-access" {
  name        = "new-years-ecr-access"
  description = "Let the ECR service pull the image"

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchCheckLayerAvailability",
          "ecr:BatchGetImage"
        ],
        "Resource" : "arn:aws:ecr:*:080353813015:repository/new-years-day"
      },
      {
        "Effect" : "Allow",
        "Action" : "ecr:GetAuthorizationToken",
        "Resource" : "*"
      },
      { "Effect" : "Allow",
        "Action" : [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Resource" : [
          "arn:aws:logs:*:080353813015:log-group:/ecs/new-years-day:log-stream:*",
          "arn:aws:logs:*:080353813015:log-group:/ecs/new-years-day"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "test-attach" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = aws_iam_policy.ecr-access.arn
}

resource "aws_ecs_task_definition" "api" {
  family                   = "service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  container_definitions = jsonencode([
    {
      "image" : var.image
      "name" : "api",
      "environment" : [
        { "name" : "DB_URL", "value" : "!!!!!!!!!!!TODO: fill this once you make a DB" }
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
