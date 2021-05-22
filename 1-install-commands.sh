#!/bin/bash -eux
# Run this script on host machine.

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
}

function install_crontab() {
  echo '### Installing crontab'
  # TODO: Download 2-install-brewery-kit-tools.sh from web here.
  if [[ -z $(crontab -l) ]]; then
    (
      echo '# Updated by brewery-kit'
      echo 'SHELL=/bin/bash'
      echo "@reboot /home/${USER}/2-install-brewery-kit-tools.sh"
    ) | crontab -
  fi
}

function install_3g_network() {
  sudo bash -c "curl https://soracom-files.s3.amazonaws.com/setup_air.sh | bash"
}

sudo apt -y update
sudo apt -y install curl  # Required
sudo apt -y install jq mailutils  # For manual maintenance

install_docker
install_crontab
install_3g_network

sudo reboot
