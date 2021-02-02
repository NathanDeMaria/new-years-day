output "endpoint" {
  value = module.rds-aurora.this_rds_cluster_endpoint
}

output "db_name" {
  value = module.rds-aurora.this_rds_cluster_database_name
}
