SSH:=0

push:
	terraform init && terraform apply -var 'allow_ssh=${SSH}'

ssh:
	ssh -i ~/.ssh/main.pem ec2-user@$(shell terraform output public_dns)

backup-db:
	scp -i ~/.ssh/main.pem ec2-user@$(shell terraform output public_dns):/home/ec2-user/db/sql_app.db ./sql_app.db.backup
