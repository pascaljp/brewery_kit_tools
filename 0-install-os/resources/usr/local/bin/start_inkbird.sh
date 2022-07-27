#!/bin/bash -eux
# This script runs when the system boots.

cd $(dirname $0)
source ./start_inkbird_lib.sh

CLIENT_VERSION=$(cat ~/client_version)
SOURCE_DIR=$(docker volume inspect inkbird | jq -r .[0].Mountpoint)

if [[ -z "${CLIENT_VERSION}" ]]; then
  CLIENT_VERSION=pascaljp/inkbird:latest
fi

setup_host
setup_container "${CLIENT_VERSION}"
