#!/bin/bash

cd /home/pi/brewery_kit_tools/docker
git pull

docker image prune
make
