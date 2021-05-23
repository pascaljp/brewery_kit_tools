#!/bin/bash -eu

# Example: pascaljp/inkbird:raspi-zero
CURRENT_VERSION=$(cat ~/client_version)
VERSION=$(curl https://brewery-app.com/client_version)

if [[ -z ${VERSION} ]]; then
  VERSION=pascaljp/inkbird:raspi-zero
fi

if [[ "${CURRENT_VERSION}" == "${VERSION}" ]]; then
  return
fi

function install_crontab() {
  if [[ -z "$(crontab -l)" ]] || [[ ! -z $(crontab -l | grep '# Updated by brewery-kit') ]]; then
    echo '### Installing crontab'
    (
      echo '# Updated by brewery-kit'
      echo 'SHELL=/bin/bash'
      echo '@reboot (docker run --rm '${CLIENT_VERSION}' cat /home/docker/brewery_kit_tools/2-start_jobs.sh) | bash'
      echo '0 * * * * (docker run --rm '${CLIENT_VERSION}' cat /home/docker/brewery_kit_tools/3-run-hourly.sh) | bash'
    ) | crontab -
  fi
}

docker pull "${VERSION}" &&
  echo "${VERSION}" >~/client_version
install_crontab

sudo reboot
