output "push_name" {
  value = aws_ecr_repository.repo.repository_url
}

output "public_dns" {
  value = aws_instance.server.public_dns
}
