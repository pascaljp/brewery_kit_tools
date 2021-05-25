ARCHITECTURE=$(shell arch)

all: docker

docker: Dockerfile
	docker build \
      --build-arg BREWERY_KIT_VERSION=2.0 \
      --build-arg BREWERY_KIT_TOOLS_VERSION=0.1 \
      --build-arg DEV_TIMESTAMP=$(shell date +%s) \
      -t pascaljp/inkbird:${ARCHITECTURE} \
      .
	docker login
	docker push pascaljp/inkbird:${ARCHITECTURE}
