# NAME=2021-03-04-raspios-buster-armhf-lite
NAME=2022-04-04-raspios-bullseye-armhf-lite
TMPDIR=./tmp

all: write_image

${NAME}.img.orig:
	# Linked from here: https://www.raspberrypi.org/software/operating-systems/
	# curl -O https://downloads.raspberrypi.org/raspios_lite_armhf/images/raspios_lite_armhf-2021-03-25/2021-03-04-raspios-buster-armhf-lite.zip
	curl -O https://downloads.raspberrypi.org/raspios_lite_armhf/images/raspios_lite_armhf-2022-04-07/2022-04-04-raspios-bullseye-armhf-lite.img.xz -#
	unxz ${NAME}.img.xz
	mv ${NAME}.img ${NAME}.orig

${NAME}.img: ${NAME}.img.orig build_os_image.py
	sudo python3 build_os_image.py

write_image: ${NAME}.img
	echo "Find a device name and run\n  sudo dd if=${NAME}.img of=/dev/diskX bs=64M"

clean:
	rm ${NAME}.img
