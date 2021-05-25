#!/bin/bash -eux
# Run this script on host machine.

CLIENT_VERSION=pascaljp/inkbird:raspi-zero

function install_docker() {
  type docker >/dev/null || {
    echo '### Installing docker.'
    curl -sSL https://get.docker.com | sh
    # This command does not take effect until reboot.
    sudo usermod -aG docker ${USER}

    echo '### Creating a shared directory'
    # sudo is needed if the computer is not rebooted after running "usermod".
    sudo docker volume create inkbird
  }
  sudo docker pull ${CLIENT_VERSION}
  echo ${CLIENT_VERSION} >~/client_version
}

function install_crontab() {
  mkdir -p scripts
  cd scripts
  curl https://raw.githubusercontent.com/pascaljp/brewery_kit_tools/main/2-maintain-brewery-kit/2-start-jobs.sh -O
  curl https://raw.githubusercontent.com/pascaljp/brewery_kit_tools/main/2-maintain-brewery-kit/3-run-hourly.sh -O
  chmod 755 *.sh

  if [[ -z "$(crontab -l)" ]] || [[ ! -z $(crontab -l | grep '# Updated by brewery-kit') ]]; then
    echo '### Installing crontab'
    (
      echo '# Updated by brewery-kit'
      echo 'SHELL=/bin/bash'
      echo "@reboot /home/pi/scripts/brewery_kit_tools/2-start-jobs.sh"
      echo "0 * * * * /home/pi/scripts/3-run-hourly.sh"
    ) | crontab -
  fi
}

function install_3g_network() {
  sudo bash -c "curl https://soracom-files.s3.amazonaws.com/setup_air.sh | bash"
}

sudo apt -y update
sudo apt -y install curl         # Required
sudo apt -y install jq mailutils # For manual maintenance

install_docker
install_crontab
install_3g_network

sudo reboot
