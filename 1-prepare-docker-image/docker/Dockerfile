FROM alpine:3.12 AS build
RUN apk add curl npm
RUN apk add sudo bash python3 make g++ linux-headers bluez-libs
# RUN apk add eudev-dev

ARG BREWERY_KIT_VERSION
ARG BREWERY_KIT_TOOLS_VERSION
ARG DEV_TIMESTAMP
ENV BREWERY_KIT_VERSION ${BREWERY_KIT_VERSION:-2.0}
ENV BREWERY_KIT_TOOLS_VERSION ${BREWERY_KIT_TOOLS_VERSION:-0.1}
ENV DEV_TIMESTAMP ${DEV_TIMESTAMP:-}

COPY . /tmp/
RUN bash /tmp/install_brewery_kit.sh "${BREWERY_KIT_VERSION}" "${BREWERY_KIT_TOOLS_VERSION}"


FROM alpine:3.12
RUN apk add bash nodejs sudo
# To use @abandonware/noble without root permission.
# Document: https://github.com/abandonware/noble#running-without-rootsudo-linux-specific
RUN apk add libcap && setcap cap_net_raw+eip $(eval readlink -f `which node`)

ARG BREWERY_KIT_VERSION
ARG BREWERY_KIT_TOOLS_VERSION
ARG DEV_TIMESTAMP
ARG USERNAME=docker
ENV BREWERY_KIT_VERSION ${BREWERY_KIT_VERSION:-2.0}
ENV BREWERY_KIT_TOOLS_VERSION ${BREWERY_KIT_TOOLS_VERSION:-0.1}
ENV DEV_TIMESTAMP ${DEV_TIMESTAMP:-}
ENV USER=${USERNAME}

RUN adduser --home=/mnt/inkbird --disabled-password -G wheel --shell /bin/bash ${USERNAME}
RUN mkdir -p /home/docker
RUN echo '%wheel ALL=(ALL) NOPASSWD: ALL' >>/etc/sudoers
RUN sudo chmod u+s /bin/ping

USER ${USERNAME}

COPY --from=build /tmp/brewery_kit /home/docker/brewery_kit
COPY --from=build /tmp/brewery_kit_tools /home/docker/brewery_kit_tools

WORKDIR /home/docker
