#!/usr/bin/python3

# from asyncore import loop
import getpass
import os
import pwd
import subprocess
import sys

from more_itertools import partition


def main():
  print(os.getcwd())
  IMAGE_PATH = os.getcwd() + '/2022-04-04-raspios-bullseye-armhf-lite.img'
  RESOURCE_DIR = os.getcwd() + '/resources'

  with Runner('pascal') as runner:
    runner.run('cp {}.orig {}'.format(IMAGE_PATH, IMAGE_PATH))
  extendImage(IMAGE_PATH, 4*1024*1024*1024)
  updateImage(IMAGE_PATH, RESOURCE_DIR)


def getPartitionInfo(runner, image_path, partition_number):
  """Returns a tuple (partitionOffset, partitionSize)."""
  lines = runner.run('parted -m {}'.format(image_path), stdin=bytes('unit B print', 'utf8'))['stdout'].split('\n')
  for line in lines:
    fields = line.split(':')
    if fields[0] == str(partition_number):
      return (fields[1].replace('B', ''), fields[3].replace('B', ''))
  return (None, None)

def extendImage(image_path, image_size):
  with Runner('root') as runner:
    loop_device = runner.run('losetup -f')['stdout'].strip()
    print('loop device: {}'.format(loop_device))

  # Change the image size.
  with Runner('pascal') as runner:
    runner.run('truncate -s {} {}'.format(image_size, image_path))

  # Mount the image to a loopback device, change a partition size and unmount.
  with Runner('root') as runner:
    runner.run('losetup {} {}'.format(loop_device, image_path))
    runner.run('parted -s -a optimal {} resizepart 2 100%'.format(loop_device))
    runner.run('losetup -d {}'.format(loop_device))

  # Mount the root partition and resize its filesystem.
  with Runner('root') as runner:
    root_partition_offset, _ = getPartitionInfo(runner, image_path, 2)
    runner.run('losetup -o {} {} {}'.format(root_partition_offset, loop_device, image_path))
    runner.run('e2fsck -y -f {}'.format(loop_device))
    runner.run('resize2fs {}'.format(loop_device))
    runner.run('losetup -d {}'.format(loop_device))


def updateImage(image_path, resource_dir):
  user_name = input('New username for Raspberry pi: ')
  password = getpass.getpass('Password for {}: '.format(user_name))
  hostname = input('Hostname (default=brewerykit): ') or 'brewerykit'

  with Runner('root') as runner:
    with MountPartitions(image_path):
      # Setup boot partition.

      # Enable SSH.
      # runner.run('touch ./mnt/boot/ssh')
      # Setup the default user.
      encrypted_password = runner.run('openssl passwd -6 {}'.format(password))['stdout'].strip()
      runner.run('echo "{}:{}" >./mnt/boot/userconf.txt'.format(user_name, encrypted_password))

      # Create the content of firstrun.sh.
      firstRunScript = ['#!/bin/bash', 'set +e']
      # Setup hostname.
      firstRunScript.append('CURRENT_HOSTNAME=$(cat /etc/hostname | tr -d \" \\t\\n\\r\")')
      firstRunScript.append('echo "{}" >/etc/hostname'.format(hostname))
      firstRunScript.append('sed -i "s/127.0.1.1.*${{CURRENT_HOSTNAME}}/127.0.1.1\\t{}/g\" /etc/hosts'.format(hostname))
      # Setup SSH.
      firstRunScript.append('FIRSTUSER=$(getent passwd 1000 | cut -d: -f1)')
      firstRunScript.append('FIRSTUSERHOME=$(getent passwd 1000 | cut -d: -f6)')
      firstRunScript.append('install -o "${FIRSTUSER}" -m 700 -d "${FIRSTUSERHOME}/.ssh"')
      with open('/home/pascal/.ssh/authorized_keys') as f:
        pubkey = f.read()
      firstRunScript.append('install -o "${{FIRSTUSER}}" -m 600 <(printf "{}") "${{FIRSTUSERHOME}}/.ssh/authorized_keys"'.format(pubkey.replace('\n', '\\n')))
      firstRunScript.append('echo "PasswordAuthentication no" >>/etc/ssh/sshd_config')
      # Setup new account.
      firstRunScript.append('/usr/lib/userconf-pi/userconf {} {}'.format(user_name, encrypted_password))
      # Enable SSH.
      firstRunScript.append('systemctl enable ssh')
      # Setup Wi-Fi.
      firstRunScript.append('''cat >/etc/wpa_supplicant/wpa_supplicant.conf <<"EOF"
country=JP
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
  key_mgmt=WPA-PSK
  ssid="bioruby"
  psk="kumamushi.net"
}
EOF''')
      firstRunScript.append('chmod 600 /etc/wpa_supplicant/wpa_supplicant.conf')
      firstRunScript.append('rfkill unblock wifi')
      firstRunScript.append('for filename in /var/lib/systemd/rfkill/*:wlan ; do')
      firstRunScript.append('  echo 0 > ${filename}')
      firstRunScript.append('done')
      # Setup locale.
      firstRunScript.append('rm -f /etc/localtime')
      firstRunScript.append('echo "Asia/Tokyo" >/etc/timezone')
      firstRunScript.append('dpkg-configure -f noninteractive tzdata')
      # Setup crontab.
      firstRunScript.append('echo "SHELL=/bin/bash\n@reboot /usr/local/bin/setup_root.sh" | crontab -')
      firstRunScript.append('echo "SHELL=/bin/bash\n@reboot /usr/local/bin/start_inkbird.sh\n0 * * * * /usr/local/bin/3-run-hourly.sh" | crontab -')

      firstRunScript.append('')

      # Cleanup the first run script.
      # firstRunScript.append('rm -f /boot/firstrun.sh')
      firstRunScript.append('sed -i "s| systemd.run.*||g" /boot/cmdline.txt')
      firstRunScript.append('exit 0')

      runner.run('cat >./mnt/boot/firstrun.sh', stdin='\n'.join(firstRunScript).encode('utf8'))
      """
# Prepare scripts that will be used after setup.
mkdir -p /home/pi/.inkbird/scripts/
cp -r /tmp/0-install-os/resources/*.sh /home/pi/.inkbird/scripts/
chmod 755 /home/pi/.inkbird/scripts/*

# Install crontab.
cat /tmp/0-install-os/resources/crontab | crontab -

echo pascaljp/inkbird:latest >/home/pi
/client_version"""
      cmdline = runner.run('cat ./mnt/boot/cmdline.txt')['stdout'].strip()
      cmdline += ' systemd.run=/boot/firstrun.sh systemd.run_success_action=reboot systemd.unit=kernel-command-line.target'
      print(cmdline)
      runner.run('cat >./mnt/boot/cmdline.txt', stdin=cmdline.encode('ascii'))

      # Setup root partition.
      def install(path):
        runner.run('install -D {}{} ./mnt/root{}'.format(resource_dir, path, path))
      install('/usr/local/bin/setup_root.sh')
      install('/usr/local/bin/bluetooth.py')


class Runner(object):
  def __init__(self, user_name, cwd='/tmp'):
    self.user_name = user_name
    self.cwd = cwd


  def __enter__(self):
    return self

  def __exit__(self, exc, exc_value, traceback):
    pass

  def run(self, command, encoding='utf8', stdin=None):
    pw_record = pwd.getpwnam(self.user_name)
    user_name = pw_record.pw_name
    user_home_dir = pw_record.pw_dir
    user_uid = pw_record.pw_uid
    user_gid = pw_record.pw_gid
    env = os.environ.copy()
    env['HOME'] = user_home_dir
    env['LOGNAME'] = user_name
    env['PWD'] = self.cwd
    env['USER'] = user_name
    print('{} {}'.format('#' if self.user_name == 'root' else '$', str(command)))
    try:
      process = subprocess.Popen(command, shell=True, preexec_fn=Runner.demote(
          user_uid, user_gid), cwd=self.cwd, env=env, stdin=subprocess.PIPE if stdin else None, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
      stdout, stderr = process.communicate(input=stdin)
      result = process.wait()
      if result != 0:
        print('result: ', result)
        print('STDOUT:')
        print('\n'.join(['  ' + x for x in str(stdout, encoding).split('\n')]))
        print('STDERR:')
        print('\n'.join(['  ' + x for x in str(stderr, encoding).split('\n')]))
        sys.exit(1)
      return {'stdout': str(stdout, encoding), 'stderr': str(stderr, encoding)}
    except Exception as e:
      print('Unexpected error:', e)
      sys.exit(1)



  def demote(user_uid, user_gid):
    def result():
      os.setgid(user_gid)
      os.setuid(user_uid)
    return result


class MountPartitions(object):
  def __init__(self, image_path):
    self.image_path = image_path
  
  def __enter__(self):
    with Runner('root') as runner:
      runner.run('mkdir -p ./mnt/boot ./mnt/root')
      bootPartitionOffset, bootPartitionSize = getPartitionInfo(runner, self.image_path, 1)
      runner.run('mount -t vfat -o loop,offset={},sizelimit={} {} ./mnt/boot'.format(bootPartitionOffset, bootPartitionSize, self.image_path))
      rootPartitionOffset, rootPartitionSize = getPartitionInfo(runner, self.image_path, 2)
      runner.run('mount -t ext4 -o loop,offset={},sizelimit={} {} ./mnt/root'.format(rootPartitionOffset, rootPartitionSize, self.image_path))

  def __exit__(self, exc, exc_value, traceback):
    with Runner('root') as runner:
      runner.run('umount ./mnt/root ./mnt/boot')
      runner.run('rmdir ./mnt/boot ./mnt/root')

if __name__ == '__main__':
    main()
