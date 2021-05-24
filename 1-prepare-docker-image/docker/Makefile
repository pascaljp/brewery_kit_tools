all: docker

docker: Dockerfile
	docker login
	docker build --network=host -t pascaljp/inkbird:raspi-zero .
	docker push pascaljp/inkbird:raspi-zero
