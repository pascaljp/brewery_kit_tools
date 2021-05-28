NAME=2021-03-04-raspios-buster-armhf-lite
TMPDIR=./tmp

all: write_image

${NAME}.zip:
	# Linked from here: https://www.raspberrypi.org/software/operating-systems/
	curl -O https://downloads.raspberrypi.org/raspios_lite_armhf/images/raspios_lite_armhf-2021-03-25/2021-03-04-raspios-buster-armhf-lite.zip

${NAME}.img: ${NAME}.zip
	unzip ${NAME}.zip
	touch ${NAME}.img

update_image: ${NAME}.img
	$(eval OFFSET := $(shell fdisk -l -u 2021-03-04-raspios-buster-armhf-lite.img | grep FAT32 | awk '{print $$2}'))
	$(eval BYTE_OFFSET := $(shell expr $(OFFSET) \* 512))
	mkdir -p ./mnt
	sudo mount -t vfat -o loop,offset=$(BYTE_OFFSET) ${NAME}.img ./mnt
	sudo touch ./mnt/ssh
	sudo cp ./wpa_supplicant.conf ./mnt/wpa_supplicant.conf
	sudo umount ./mnt

	$(eval OFFSET := $(shell fdisk -l -u 2021-03-04-raspios-buster-armhf-lite.img | grep Linux | awk '{print $$2}'))
	$(eval BYTE_OFFSET := $(shell expr $(OFFSET) \* 512))
	mkdir -p ./mnt
	sudo mount -t ext4 -o loop,offset=$(BYTE_OFFSET) ${NAME}.img ./mnt
	mkdir -p ./mnt/home/pi/scripts/
	curl https://raw.githubusercontent.com/pascaljp/brewery_kit_tools/main/2-maintain-brewery-kit/{1-install-commands.sh} -o ./mnt/home/pi/scripts/#1
	curl https://raw.githubusercontent.com/pascaljp/brewery_kit_tools/main/2-maintain-brewery-kit/{2-start-jobs.sh} -o ./mnt/home/pi/scripts/#1
	curl https://raw.githubusercontent.com/pascaljp/brewery_kit_tools/main/2-maintain-brewery-kit/{2-start-jobs-lib.sh} -o ./mnt/home/pi/scripts/#1
	curl https://raw.githubusercontent.com/pascaljp/brewery_kit_tools/main/2-maintain-brewery-kit/{3-run-hourly.sh} -o ./mnt/home/pi/scripts/#1

	sudo umount ./mnt
	rmdir ./mnt

write_image: update_image
	echo "Find a device name and run\n  sudo dd if=${NAME}.img of=/dev/diskX bs=64M"

clean:
	rm ${NAME}.img
