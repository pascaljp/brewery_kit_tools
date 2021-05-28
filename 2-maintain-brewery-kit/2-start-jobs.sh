#!/bin/bash -eux
# This script runs when the system boots.

source ./2-start-jobs-lib.sh

CLIENT_VERSION=$(cat ~/client_version)
SOURCE_DIR=$(docker volume inspect inkbird | jq -r .[0].Mountpoint)

if [[ -z "${CLIENT_VERSION}" ]]; then
  CLIENT_VERSION=pascaljp/inkbird:latest
fi

setup_host "${CLIENT_VERSION}"
setup_container "${CLIENT_VERSION}"
