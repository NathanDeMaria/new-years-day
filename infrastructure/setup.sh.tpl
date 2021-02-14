#!/usr/bin/env bash
set -EuOo pipefail

# TODO: bake this into an AMI with EC2 Image Builder or Packer or something

# AWS CLI v2
yum install unzip -y
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

ACCOUNT_ID=$(/usr/local/bin/aws sts get-caller-identity --output text | awk '{ print $1 }')
REGION=$(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone | sed 's/\(.*\)[a-z]/\1/')
/usr/local/bin/aws ecr get-login-password --region $${REGION} | docker login --username AWS --password-stdin $${ACCOUNT_ID}.dkr.ecr.$${REGION}.amazonaws.com

docker pull ${ image }
docker run -d --rm -p ${ app_port }:8000 -e DB_URL=sqlite:///./sql_app.db -v ~/sql_app.db:/root/sql_app.db ${ image } main:app --host 0.0.0.0
