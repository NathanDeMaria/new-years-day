# TODO: I'm assuming this'll eventually get more complicated
# If not, this doesn't need to be its own module
resource "aws_ecs_cluster" "cluster" {
  name = "new-years-day"
}

resource "aws_cloudwatch_log_group" "logs" {
  name = "/ecs/${aws_ecs_cluster.cluster.name}"
}
