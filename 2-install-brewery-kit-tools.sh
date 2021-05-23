#!/bin/bash -eux
# This script runs when the system boots.

USER=pi

function run() {
  docker run \
    --rm \
    --privileged --net=host \
    --mount type=volume,src=inkbird,dst=/mnt/inkbird \
    pascaljp/inkbird:raspi-zero \
    bash -c "$1"
}

function run_daemon() {
  docker run -d \
    --rm \
    --privileged --net=host \
    --name "$1" \
    --mount type=volume,src=inkbird,dst=/mnt/inkbird \
    pascaljp/inkbird:raspi-zero \
    bash -c "$2"
}

function install_crontab() {
  if [[ ! -z $(crontab -l | grep 'Updated by brewery-kit') ]]; then
    echo '### Installing crontab'
    (
      echo '# Updated by brewery-kit'
      echo 'SHELL=/bin/bash'
      echo "@reboot /home/${USER}/brewery_kit_tools/2-install-brewery-kit-tools.sh"
      echo "0 * * * * /home/${USER}/brewery_kit_tools/3-run-hourly.sh"
    ) | crontab -
  else
    echo '### Crontab is already installed'
  fi
}

function install_brewery_kit_tools() {
  if [[ ! -d ${SOURCE_DIR}/brewery_kit_tools ]]; then
    echo '### Installing brewery_kit_tools'
    BASE_DIR=$(mktemp -d)
    URL=https://codeload.github.com/pascaljp/brewery_kit_tools/zip/refs/tags/0.1
    cd ${BASE_DIR}
    curl ${URL} -o ./source.zip
    unzip ./source.zip
    sudo mv brewery_kit_tools* ${SOURCE_DIR}/brewery_kit_tools
    sudo bash -c "echo ${URL} > ${SOURCE_DIR}/url_brewery_kit_tools"
    run "cd /mnt/inkbird/brewery_kit_tools; npm install --production"
  fi
}

function create_config_file() {
  run "node /mnt/inkbird/brewery_kit_tools/dist/create_config.js"
}

function install_brewery_kit() {
  echo '### Installing brewery_kit'

  # Prepare new source code.
  BASE_DIR=$(mktemp -d)
  URL=https://codeload.github.com/pascaljp/brewery_kit/zip/refs/tags/2.0
  cd ${BASE_DIR}
  curl ${URL} -o ./source.zip
  unzip ./source.zip

  # Reuse existing node_modules.
  if [[ -d ${SOURCE_DIR}/brewery_kit/node_modules ]]; then
    mv ${SOURCE_DIR}/brewery_kit/node_modules brewery_kit*/
  fi
  sudo rm -rf ${SOURCE_DIR}/brewery_kit
  sudo mv brewery_kit* ${SOURCE_DIR}/brewery_kit
  run "cd /mnt/inkbird/brewery_kit; npm install --production"

  sudo bash -c "echo ${URL} > ${SOURCE_DIR}/url_brewery_kit"
}

SOURCE_DIR=$(docker volume inspect inkbird | jq -r .[0].Mountpoint)

run "sudo chown docker:nogroup /mnt/inkbird"

install_brewery_kit_tools
install_brewery_kit
create_config_file
install_crontab

run_daemon brewery-kit-tools-instance "node /mnt/inkbird/brewery_kit_tools/dist/index.js"
run_daemon brewery-kit-instance "node /mnt/inkbird/brewery_kit/monitoring/inkbird.js"
