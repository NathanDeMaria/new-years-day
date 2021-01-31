output "subnet_ids" {
  value = aws_subnet.private.*.id
}

output "sg_id" {
  value = aws_security_group.ecs_tasks.id
}
