#!/bin/bash -eux
# This script runs when the system boots.

USER=pi
CLIENT_VERSION=$(cat ~/client_version)

if [[ -z "${CLIENT_VERSION}" ]];
  CLIENT_VERSION=pascaljp/inkbird:raspi-zero
fi

function run() {
  docker run \
    --rm \
    --privileged --net=host \
    --mount type=volume,src=inkbird,dst=/mnt/inkbird \
    ${CLIENT_VERSION} \
    bash -c "$1"
}

function run_daemon() {
  docker run -d \
    --rm \
    --privileged --net=host \
    --name "$1" \
    --mount type=volume,src=inkbird,dst=/mnt/inkbird \
    ${CLIENT_VERSION} \
    bash -c "$2"
}

function create_config_file() {
  run "node /home/docker/brewery_kit_tools/dist/create_config.js"
}

SOURCE_DIR=$(docker volume inspect inkbird | jq -r .[0].Mountpoint)

run "sudo chown docker:nogroup /mnt/inkbird"

create_config_file
run_daemon brewery-kit-tools-instance "node /home/docker/brewery_kit_tools/dist/index.js"
run_daemon brewery-kit-instance "node /home/docker/brewery_kit/monitoring/inkbird.js"
