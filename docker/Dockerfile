# How to run an instance:

# VOLUME=inkbird
# MOUNT_POINT=/mnt/inkbird
# docker volume create ${VOLUME}
# docker run --privileged --net=host --name brewery-kit-instance --mount type=volume,src=${VOLUME},dst=${MOUNT_POINT} brewery-kit /bin/bash -c "node inkbird.js --tmpdir=${MOUNT_POINT}" -it

FROM alpine:3.12
LABEL target="Raspberry Pi Zero" description="Container for inkbird client"
ARG username=docker

RUN apk update \
  && apk add bash curl npm python3 make g++ sudo
# For npm install usb.
RUN apk add linux-headers eudev-dev bluez-libs

# To use @abandonware/noble without root permission.
# Document: https://github.com/abandonware/noble#running-without-rootsudo-linux-specific
RUN apk add libcap && setcap cap_net_raw+eip $(eval readlink -f `which node`)

RUN adduser --home=/mnt/inkbird --disabled-password -G wheel --shell /bin/bash ${username}
RUN echo '%wheel ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers
ENV USER=${username}
USER ${username}
WORKDIR /mnt/inkbird/
