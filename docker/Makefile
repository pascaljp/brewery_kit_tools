all: docker

docker:
	docker login
	docker build --network=host -t pascaljp/inkbird:raspi-zero .
	docker push pascaljp/inkbird:raspi-zero
