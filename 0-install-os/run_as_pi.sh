#!/bin/bash -eux

# Setup password-less SSH.
mkdir -p /home/pi/.ssh/
cp /tmp/.ssh/raspi.pub /home/pi/.ssh/authorized_keys

# Prepare scripts that will be used after setup.
mkdir -p /home/pi/.inkbird/scripts/
cp -r /tmp/brewery_kit_tools/2-maintain-brewery-kit/*.sh /home/pi/.inkbird/scripts/
chmod 755 /home/pi/.inkbird/scripts/*

# Install crontab.
cat /tmp/brewery_kit_tools/0-install-os/crontab | crontab -

echo pascaljp/inkbird:latest >/home/pi/client_version
