#!/bin/bash -eux

IMG_PATH=$1


truncate -s 2GiB ${IMG_PATH}
LOOPBACK=$(sudo losetup -f)

sudo losetup ${LOOPBACK} ${IMG_PATH}
catch() {
  LINE_NUMBNER=$1
  FUNCTION_NAME=$2
  echo $(date +'%Y-%m-%d %H:%M:%S')] Error in ${FUNCTION_NAME} at line ${LINE_NUMBNER}
}
finally() {
  # Unmount when the program exits.
  sudo losetup -d ${LOOPBACK}
  # Notify the OS that the partition table has been updated.
  partprobe
}
trap 'catch ${LINENO[0]} ${FUNCNAME[0]:-main}' ERR
trap finally EXIT

sudo fdisk -lu ${LOOPBACK}
sed -e 's/\s*\([\+0-9a-zA-Z]*\).*/\1/' << EOF | sudo fdisk ${LOOPBACK} || true
p  # Print.
d  # Delete root partition (partition number 2).
2
n  # Create a primary partition 2.
p
2
532480   # After boot partition.
   # Default end sector.
t  # Set partition type "Linux" to partition 2.
2
83
p  # Print.
w  # Write.
EOF

sudo losetup -d ${LOOPBACK}

sudo losetup -o $((532480*512)) ${LOOPBACK} ${IMG_PATH}
# Resize the partition.
sudo e2fsck -y -f ${LOOPBACK}
sudo resize2fs ${LOOPBACK}
