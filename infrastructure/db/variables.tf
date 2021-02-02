variable "subnet_ids" {
  description = "Ids of subnets to run the service in"
  type        = list(string)
}

variable "vpc_id" {
  description = "Id of the VPC this is all in"
}

variable "sg_id" {
  description = "SG to allow access to"
}
