#!/bin/bash -eu

# Example: pascaljp/inkbird:raspi-zero
CURRENT_VERSION=$(cat ~/client_version)
VERSION=$(curl https://brewery-app.com/client_version)

if [[ ! "${VERSION" =~ ^pascaljp/inkbird:.* ]]; then
  VERSION=pascaljp/inkbird:raspi-zero
fi

if [[ "${CURRENT_VERSION}" == "${VERSION}" ]]; then
  return
fi

docker pull "${VERSION}" &&
  echo "${VERSION}" >~/client_version

sudo reboot
