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

  rm -rf ${DIR_NAME}
  sudo mv * ${DIR_NAME}
  cd ${DIR_NAME}
  npm install --production
}

# function install_brewery_kit_tools() {
#   install_from_zip_url https://codeload.github.com/pascaljp/brewery_kit_tools/zip/refs/tags/${BREWERY_KIT_TOOLS_VERSION} /tmp/brewery_kit_tools
# }

function install_brewery_kit() {
  install_from_zip_url https://codeload.github.com/pascaljp/brewery_kit/zip/refs/tags/${BREWERY_KIT_VERSION} /tmp/brewery_kit
}

if [[ $# -ne 1 ]]; then
  echo '1 argument needs to be passed'
  exit 1
fi
BREWERY_KIT_VERSION=$1
echo <<"EOL"
BREWERY_KIT_VERSION=${BREWERY_KIT_VERSION}
# BREWERY_KIT_TOOLS_VERSION=${BREWERY_KIT_TOOLS_VERSION}
EOL

# install_brewery_kit_tools
install_brewery_kit
