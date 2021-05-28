#!/bin/bash -eux
# Run this script on host machine.

CLIENT_VERSION=pascaljp/inkbird:latest

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
  if [[ -z "$(crontab -l)" ]] || [[ ! -z $(crontab -l | grep '# Updated by brewery-kit') ]]; then
    echo '### Installing crontab'
    (
      echo '# Updated by brewery-kit'
      echo 'SHELL=/bin/bash'
      echo "@reboot /home/pi/.inkbird/scripts/2-start-jobs.sh"
      echo "0 * * * * /home/pi/.inkbird/scripts/3-run-hourly.sh"
    ) | crontab -
  fi
}

function install_3g_network() {
  sudo bash -c "curl https://soracom-files.s3.amazonaws.com/setup_air.sh | bash"
}

sudo apt -y update
sudo apt -y install curl inotify-tools # Required
sudo apt -y install jq mailutils # For manual maintenance

install_docker
install_3g_network
install_crontab

sudo reboot
