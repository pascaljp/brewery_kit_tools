#!/bin/bash -eux

export DEBIAN_FRONTEND=noninteractive

if [ ! -f /root/install_status ]; then
  # Update the system.
  apt -qq -y update
  apt -qq -y install --fix-broken
  apt -qq -y install python3-pip
  pip3 install pybleno
  echo '1' > /root/install_status
fi


# Start the device maintenance tool.
nohup bluetooth.py &

INSTALL_STATUS=$(cat /root/install_status)
if [ "${INSTALL_STATUS}" == 1 ]; then
  apt -qq -y install curl inotify-tools # Required
  apt -qq -y install jq mailutils # For manual maintenance

  # Install docker.
  type docker >/dev/null || {
    echo '### Installing docker.'
    curl -sSL https://get.docker.com | sh
    sed -i -r 's/^(docker:x:[0-9]+):$/\1:pi/' /etc/group
  }

  # Setup 3G network.
  bash -c "curl https://soracom-files.s3.amazonaws.com/setup_air.sh | bash" || true
  echo '2' > /root/install_status
fi
