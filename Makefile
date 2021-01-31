deploy:
	cd infrastructure && $(MAKE) push
	# TODO: figure out if this output is set pre/post infra push
	# This might just be working b/c the output never changes
	cd api/ && $(MAKE) push REPO=$(shell cd infrastructure && terraform output push_name)
