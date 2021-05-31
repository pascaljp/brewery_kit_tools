#!/bin/bash -eux

# Update the system.
apt -y update
apt -y install --fix-broken
apt -y install curl inotify-tools # Required
apt -y install jq mailutils # For manual maintenance

# Setup password-less SSH.
sed -i '/^#PasswordAuthentication/s/^.*$/PasswordAuthentication no/' /etc/ssh/sshd_config

# Install docker.
type docker >/dev/null || {
  echo '### Installing docker.'
  curl -sSL https://get.docker.com | sh
  sed -i -r 's/^(docker:x:[0-9]+):$/\1:pi/' /etc/group
}

# Setup 3G network.
bash -c "curl https://soracom-files.s3.amazonaws.com/setup_air.sh | bash" || true
