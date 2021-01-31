# Nearly directly lifted from
# https://medium.com/@bradford_hamilton/deploying-containers-on-amazons-ecs-using-fargate-and-terraform-part-2-2e6f6a3a957f
data "aws_availability_zones" "available" {
}

locals {
  az_count = length(data.aws_availability_zones.available.names)
}

resource "aws_vpc" "main" {
  cidr_block = "172.17.0.0/16"
}

# Create private subnets, each in a different AZ
resource "aws_subnet" "private" {
  count             = local.az_count
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]
  vpc_id            = aws_vpc.main.id
}

# Create public subnets, each in a different AZ
resource "aws_subnet" "public" {
  count                   = local.az_count
  cidr_block              = cidrsubnet(aws_vpc.main.cidr_block, 8, local.az_count + count.index)
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  vpc_id                  = aws_vpc.main.id
  map_public_ip_on_launch = true
}

# Internet Gateway for the public subnet
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
}

# Route the public subnet traffic through the IGW
resource "aws_route" "internet_access" {
  route_table_id         = aws_vpc.main.main_route_table_id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.gw.id
}

# Create a NAT gateway with an Elastic IP for each private subnet to get internet connectivity
resource "aws_eip" "gw" {
  count      = local.az_count
  vpc        = true
  depends_on = [aws_internet_gateway.gw]
}

resource "aws_nat_gateway" "gw" {
  count         = local.az_count
  subnet_id     = element(aws_subnet.public.*.id, count.index)
  allocation_id = element(aws_eip.gw.*.id, count.index)
}

# Create a new route table for the private subnets, make it route non-local traffic through the NAT gateway to the internet
resource "aws_route_table" "private" {
  count  = local.az_count
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = element(aws_nat_gateway.gw.*.id, count.index)
  }
}

# Explicitly associate the newly created route tables to the private subnets (so they don't default to the main route table)
resource "aws_route_table_association" "private" {
  count          = local.az_count
  subnet_id      = element(aws_subnet.private.*.id, count.index)
  route_table_id = element(aws_route_table.private.*.id, count.index)
}

resource "aws_security_group" "ecs_tasks" {
  name        = "new-years-day-ecs-tasks"
  description = "Allow inbound access from the ALB only"
  vpc_id      = aws_vpc.main.id

  # ingress {
  #   protocol        = "tcp"
  #   from_port       = var.app_port
  #   to_port         = var.app_port
  #   security_groups = [aws_security_group.lb.id]
  # }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}
