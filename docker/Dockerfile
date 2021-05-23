FROM alpine:3.12 AS build
RUN apk add curl npm
RUN apk add sudo bash python3 make g++ linux-headers eudev-dev bluez-libs

RUN ls
ADD install_brewery_kit.sh /tmp/install_brewery_kit.sh
RUN bash /tmp/install_brewery_kit.sh


FROM alpine:3.12
RUN apk add bash nodejs sudo
# To use @abandonware/noble without root permission.
# Document: https://github.com/abandonware/noble#running-without-rootsudo-linux-specific
RUN apk add libcap && setcap cap_net_raw+eip $(eval readlink -f `which node`)

ARG username=docker
RUN adduser --home=/mnt/inkbird --disabled-password -G wheel --shell /bin/bash ${username}
RUN mkdir -p /home/docker
RUN echo '%wheel ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers
ENV USER=${username}

USER ${username}

COPY --from=build /tmp/brewery_kit /home/docker/brewery_kit
COPY --from=build /tmp/brewery_kit_tools /home/docker/brewery_kit_tools

# WORKDIR /mnt/inkbird/
