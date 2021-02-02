push: _ecr-login
	docker build -t ${REPO} -f .devcontainer/Dockerfile .
	docker push ${REPO}

_ecr-login:
	$$(aws ecr get-login --no-include-email)
