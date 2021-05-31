NAME=2021-03-04-raspios-buster-armhf-lite
TMPDIR=./tmp

all: write_image

${NAME}.zip:
	# Linked from here: https://www.raspberrypi.org/software/operating-systems/
	curl -O https://downloads.raspberrypi.org/raspios_lite_armhf/images/raspios_lite_armhf-2021-03-25/2021-03-04-raspios-buster-armhf-lite.zip

${NAME}.img: ${NAME}.zip
	unzip ${NAME}.zip
	touch ${NAME}.img

update_image: ${NAME}.img extend_image.sh update_image.sh
	./extend_image.sh ${NAME}.img
	./update_image.sh ${NAME}.img

write_image: update_image
	echo "Find a device name and run\n  sudo dd if=${NAME}.img of=/dev/diskX bs=64M"

clean:
	rm ${NAME}.img
