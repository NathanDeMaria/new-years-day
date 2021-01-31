variable "ecs_cluster_arn" {
  description = "ARN of the ECS cluster"
}

variable "image" {
  description = "URL of the API image"
}

variable "subnet_ids" {
  description = "Ids of subnets to run the service in"
  type        = list(string)
}

variable "sg_id" {
  description = "Security group for the ECS tasks to run in"
}
