BREWERY_KIT_VERSION=2.0
BREWERY_KIT_TOOLS_VERSION=0.1

all: docker

fix-docker-issue:
	# Thanks to https://stackoverflow.com/questions/43164912/install-bash-on-alpine-docker-using-qemu-for-arm-host/66600257#66600257
	docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
	docker buildx rm builder || echo
	docker buildx create --name builder --driver docker-container --use
	docker buildx inspect --bootstrap

docker: fix-docker-issue Dockerfile install_brewery_kit.sh
	docker buildx build \
		--platform linux/arm/v6,linux/amd64 \
		--build-arg BREWERY_KIT_VERSION=$(BREWERY_KIT_VERSION) \
		--build-arg BREWERY_KIT_TOOLS_VERSION=$(BREWERY_KIT_TOOLS_VERSION) \
		--build-arg DEV_TIMESTAMP=$(shell date +%s) \
		--push \
		-t pascaljp/inkbird:$(BREWERY_KIT_VERSION)-$(BREWERY_KIT_TOOLS_VERSION) .
		-t pascaljp/inkbird:latest .

		# --progress=plain \
