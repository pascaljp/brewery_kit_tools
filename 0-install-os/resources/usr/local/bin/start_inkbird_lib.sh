#!/bin/bash

run() {
  local CLIENT_VERSION=$1
  local COMMAND=$2
  docker run \
    --rm \
    --privileged --net=host \
    --mount type=volume,src=inkbird,dst=/mnt/inkbird \
    ${CLIENT_VERSION} \
    bash -c "${COMMAND}"
}

run_daemon() {
  local CLIENT_VERSION=$1
  local NAME=$2
  local COMMAND=$3
  docker rm "${NAME}" || true
  docker run -d \
    --restart=on-failure \
    --privileged --net=host \
    --name "${NAME}" \
    --mount type=volume,src=inkbird,dst=/mnt/inkbird \
    --mount type=bind,src=/tmp/inkbird/notify_from_container,dst=/mnt/notify_from_container \
    ${CLIENT_VERSION} \
    bash -c "${COMMAND}"
}

create_config_file() {
  local CLIENT_VERSION=$1
  run "${CLIENT_VERSION}" "node /home/docker/brewery_kit_tools/2-maintain-brewery-kit/dist/create_config.js"
}

setup_host() {
  docker volume create inkbird
  # Listens to file modifications made by container, and take actions.
  mkdir -p /tmp/inkbird/notify_from_container
  (
    inotifywait -m -e close --format %w%f /tmp/inkbird/notify_from_container | \
      while read FILE; do
        case "${FILE}" in
        '/tmp/inkbird/notify_from_container/network_error')
          sudo reboot
          ;;
        '/tmp/inkbird/notify_from_container/new_container_available')
          local NEW_CLIENT_VERSION=$(cat ${FILE})
          # Example: pascaljp/inkbird:latest
          if [[ "${NEW_CLIENT_VERSION}" =~ ^pascaljp/inkbird:.* ]]; then
            echo "New client version: ${NEW_CLIENT_VERSION}"
            docker pull "${NEW_CLIENT_VERSION}" && echo "${NEW_CLIENT_VERSION}" >~/client_version && sudo reboot
          fi
          ;;
        esac
      done
  ) &
}

setup_container() {
  local CLIENT_VERSION=$1

  docker volume create inkbird
  run ${CLIENT_VERSION} "sudo chown docker:nogroup /mnt/inkbird"
  create_config_file "${CLIENT_VERSION}"
  run_daemon "${CLIENT_VERSION}" brewery-kit-tools-instance "node /home/docker/brewery_kit_tools/2-maintain-brewery-kit/dist/index.js --version=${CLIENT_VERSION}"
  run_daemon "${CLIENT_VERSION}" brewery-kit-instance "node /home/docker/brewery_kit/monitoring/inkbird.js"
}
