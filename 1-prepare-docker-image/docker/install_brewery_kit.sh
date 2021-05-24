#!/bin/bash -eux

# Args: ZIP_URL DIR_NAME
function install_from_zip_url() {
  local ZIP_URL=$1
  local DIR_NAME=$2
  echo "### Installing ${DIR_NAME}"
  TMP_DIR=$(mktemp -d)
  cd ${TMP_DIR}
  curl ${ZIP_URL} -o ./source.zip
  unzip ./source.zip
  rm ./source.zip

  rm -rf ${SOURCE_DIR}/${DIR_NAME}
  sudo mv * ${SOURCE_DIR}/${DIR_NAME}
  cd ${SOURCE_DIR}/${DIR_NAME}
  npm install --production
}

function install_brewery_kit_tools() {
  install_from_zip_url https://codeload.github.com/pascaljp/brewery_kit_tools/zip/refs/tags/0.1 brewery_kit_tools
}

function install_brewery_kit() {
  install_from_zip_url https://codeload.github.com/pascaljp/brewery_kit/zip/refs/tags/2.0 brewery_kit
}

SOURCE_DIR=/tmp/
install_brewery_kit_tools
install_brewery_kit
