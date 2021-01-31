push: _ecr-login
	echo "Pretend I'm pushing to ${REPO}"
	docker build -t ${REPO} -f .devcontainer/Dockerfile .
	docker push ${REPO}

_ecr-login:
	$$(aws ecr get-login --no-include-email)
