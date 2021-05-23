#!/bin/bash -eux

function install_brewery_kit_tools() {
  if [[ ! -d ${SOURCE_DIR}/brewery_kit_tools ]]; then
    echo '### Installing brewery_kit_tools'
    TMP_DIR=$(mktemp -d)
    URL=https://codeload.github.com/pascaljp/brewery_kit_tools/zip/refs/tags/0.1
    cd ${TMP_DIR}
    curl ${URL} -o ./source.zip
    unzip ./source.zip
    sudo mv brewery_kit_tools* ${SOURCE_DIR}/brewery_kit_tools
    cd ${SOURCE_DIR}/brewery_kit_tools
    npm install --production
  fi
}

function install_brewery_kit() {
  echo '### Installing brewery_kit'

  # Prepare new source code.
  TMP_DIR=$(mktemp -d)
  URL=https://codeload.github.com/pascaljp/brewery_kit/zip/refs/tags/2.0
  cd ${TMP_DIR}
  curl ${URL} -o ./source.zip
  unzip ./source.zip

  sudo mv brewery_kit* ${SOURCE_DIR}/brewery_kit
  cd ${SOURCE_DIR}/brewery_kit
  npm install --production
}

SOURCE_DIR=/tmp/

install_brewery_kit_tools
install_brewery_kit
