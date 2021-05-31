#!/bin/bash

set -eux
set -o pipefail
set -E  # Subshell inherits trap.

CLIENT_VERSION=pascaljp/inkbird:latest

raise() {
  echo $1 1>&2
  return 1
}
catch() {
  LINE_NUMBNER=$1
  FUNCTION_NAME=$2
  echo $(date +'%Y-%m-%d %H:%M:%S')] Error in ${FUNCTION_NAME} at line ${LINE_NUMBNER}
}
finally() {
  unmount_partition
}
trap 'catch ${LINENO[0]} ${FUNCNAME[0]:-main}' ERR
trap finally EXIT

IMG_PATH=$1

mount_boot_partition() {
  mkdir -p ./mnt

  # Mount boot directory.
  OFFSET=$(fdisk -l -u 2021-03-04-raspios-buster-armhf-lite.img | grep FAT32 | awk '{print $2}')
  BYTE_OFFSET=$(expr ${OFFSET} \* 512)
  sudo mount -t vfat -o loop,offset=${BYTE_OFFSET} ${IMG_PATH} ./mnt
}

mount_root_partition() {
  mkdir -p ./mnt

  # Mount root directory.
  OFFSET=$(fdisk -l -u 2021-03-04-raspios-buster-armhf-lite.img | grep Linux | awk '{print $2}')
  BYTE_OFFSET=$(expr ${OFFSET} \* 512)
  sudo mount -t ext4 -o loop,offset=${BYTE_OFFSET} ${IMG_PATH} ./mnt
}

unmount_partition() {
  sudo umount ./mnt 2>/dev/null || true
  rm -rf ./mnt
}

# Run sudo first.
sudo pwd >/dev/null

mount_boot_partition
# Enable SSH
sudo touch ./mnt/ssh
# Connect to Wi-Fi 
sudo cp ./wpa_supplicant.conf ./mnt/wpa_supplicant.conf
unmount_partition

mount_root_partition
cat <<EOL |
set -eux
sudo -u pi bash /tmp/brewery_kit_tools/0-install-os/run_as_pi.sh
bash /tmp/brewery_kit_tools/0-install-os/run_as_root.sh
df -m
EOL
sudo systemd-nspawn \
  --directory=./mnt \
  --bind-ro=$(pwd)/..:/tmp/brewery_kit_tools \
  --bind-ro=/home/pascal/.ssh:/tmp/.ssh

unmount_partition
