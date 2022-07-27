#!/usr/bin/python3
# This script runs when the system boots.

import sys
import os
import subprocess

CLIENT_VERSION='pascaljp/inkbird:latest'
# SOURCE_DIR=$(docker volume inspect inkbird | jq -r .[0].Mountpoint)

def RunOnDocker(command):
  with Runner() as runner:
    runner.run('docker run --rm --privileged --net=host --mount type=volume,src=inkbird,dst=/mnt/inkbird  {} bash -c "{}"'.format(CLIENT_VERSION, command.replace('"', '\\"')))

def RunDaemon(instance_name, command):
  with Runner() as runner:
    runner.run('docker rm "{}" || true'.format(instance_name))
    runner.run('docker run -d --restart=on-failure --privileged --net=host --name "{}" --mount type=volume,src=inkbird,dst=/mnt/inkbird {} bash -c "{}"'.format(instance_name, CLIENT_VERSION, command.replace('"', '\\"')))
    # runner.run('docker run -d --restart=on-failure --privileged --net=host --name "{}" --mount type=volume,src=inkbird,dst=/mnt/inkbird --mount type=bind,src=/tmp/inkbird/notify_from_container,dst=/mnt/notify_from_container {} bash -c "{}"'.format(container_name, CLIENT_VERSION, command))

def main():
  with Runner() as runner:
    runner.run('docker pull {}'.format(CLIENT_VERSION))
    runner.run('docker volume create inkbird')
    RunOnDocker('sudo chown docker:nogroup /mnt/inkbird')
    # RunOnDocker('node /home/docker/brewery_kit_tools/2-maintain-brewery-kit/dist/create_config.js')
    # RunDaemon('brewery-kit-tools-instance', 'node /home/docker/brewery_kit_tools/2-maintain-brewery-kit/dist/index.js --version={}'.format(CLIENT_VERSION))

    RunDaemon('brewery-kit-instance',  'node /home/docker/brewery_kit/monitoring/inkbird.js')
    #RunOnDocker('node /home/docker/brewery_kit/monitoring/inkbird.js')


class Runner(object):
  def __init__(self, cwd='/tmp'):
    self.cwd = cwd

  def __enter__(self):
    return self

  def __exit__(self, exc, exc_value, traceback):
    pass

  def run(self, command, encoding='utf8', stdin=None):
    env = os.environ.copy()
    env['PWD'] = self.cwd
    print('$ {}'.format(str(command)))
    try:
      process = subprocess.Popen(command, shell=True, cwd=self.cwd, env=env, stdin=subprocess.PIPE if stdin else None, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
      while True:
        line = process.stdout.readline()
        if not line:
          break
        print(line.decode())
      # stdout, stderr = process.communicate(input=stdin)
      result = process.wait()
      if result != 0:
        print('result: ', result)
        # print('STDOUT:')
        # print('\n'.join(['  ' + x for x in str(stdout, encoding).split('\n')]))
        # print('STDERR:')
        # print('\n'.join(['  ' + x for x in str(stderr, encoding).split('\n')]))
        sys.exit(1)
      # return {'stdout': str(stdout, encoding), 'stderr': str(stderr, encoding)}
      return
    except Exception as e:
      print('Unexpected error:', e)
      sys.exit(1)


if __name__ == '__main__':
  main()
