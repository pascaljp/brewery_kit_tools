#!/usr/bin/python3

from pybleno import *
import array
import subprocess
import sys
import time

class EchoCharacteristic(Characteristic):

  def __init__(self, uuid):
    Characteristic.__init__(self, {
      'uuid': uuid,
      'properties': ['read', 'write', 'notify'],
      'value': None
    })

    self._value = array.array('B', [0] * 0)
    self._updateValueCallback = None

  def onReadRequest(self, offset, callback):
    print('EchoCharacteristic - %s - onReadRequest: value = %s' % (self['uuid'], [hex(c) for c in self._value]))
    callback(Characteristic.RESULT_SUCCESS, self._value[offset:])

  def onWriteRequest(self, data, offset, withoutResponse, callback):
    self._value = data

    print('EchoCharacteristic - %s - onWriteRequest: value = %s' % (self['uuid'], [hex(c) for c in self._value]))

    if self._updateValueCallback:
      print('EchoCharacteristic - onWriteRequest: notifying')
      self._updateValueCallback(self._value)
      
      callback(Characteristic.RESULT_SUCCESS)
        
  def onSubscribe(self, maxValueSize, updateValueCallback):
    print('EchoCharacteristic - onSubscribe')
    self._updateValueCallback = updateValueCallback

  def onUnsubscribe(self):
    print('EchoCharacteristic - onUnsubscribe');
    self._updateValueCallback = None

class DebugCharacteristic(Characteristic):
  def __init__(self, uuid):
    Characteristic.__init__(self, {
      'uuid': uuid,
      'properties': ['read', 'write'],
      'value': None
    })
    self.data = b''

  def onReadRequest(self, offset, callback):
    print('EchoCharacteristic - %s - onReadRequest: value = %s' % (self['uuid'], [hex(c) for c in self._value]))
    callback(Characteristic.RESULT_SUCCESS, self._value[offset:])

  def onWriteRequest(self, data, offset, withoutResponse, callback):
    print('DebugCharacteristic - %s - onWriteRequest: value = %s' % (self['uuid'], [hex(c) for c in data]))
    print(data.decode())
    command = data.decode()
    p = subprocess.run(command, shell=True, capture_output=True)
    self._value = p.stdout
    callback(Characteristic.RESULT_SUCCESS)

class WiFiStateCharacteristic(Characteristic):
  def __init__(self, uuid):
    Characteristic.__init__(self, {
      'uuid': uuid,
      'properties': ['read'],
      'value': None
    })

  def onReadRequest(self, offset, callback):
    print('EchoCharacteristic - %s - onReadRequest' % (self['uuid']))
    p = subprocess.run('ping 8.8.8.8 -c 1 >/dev/null | echo $?', shell=True, capture_output=True)
    print('[{}]'.format(p.stdout))
    connected = p.stdout[0] == '0'
    callback(Characteristic.RESULT_SUCCESS, bytearray('\x01' if connected else '\x00', encoding='utf8'))


SERVICE_UUID = '5df27299-6bc8-41e4-81d3-46cf1907d5a5'

print('bleno - echo');

bleno = Bleno()

def onStateChange(state):
  print('on -> stateChange: ' + state);
  if (state == 'poweredOn'):
    bleno.startAdvertising('brewerykit', [SERVICE_UUID])
  else:
    bleno.stopAdvertising()

bleno.on('stateChange', onStateChange)

def onAdvertisingStart(error):
  print('on -> advertisingStart: ' + ('error ' + error if error else 'success'));

  if not error:
    bleno.setServices([
      BlenoPrimaryService({
        'uuid': SERVICE_UUID,
        'characteristics': [
          EchoCharacteristic('ec0F'),
          DebugCharacteristic('290f71cf-e43f-4a6d-ba34-63da4e1e47f3'),
          WiFiStateCharacteristic('9601f3a2-60de-49c4-8524-0db4ab930349'),
        ]
      })
    ])
bleno.on('advertisingStart', onAdvertisingStart)

bleno.start()

while True:
  time.sleep(86400)

# print ('Hit <ENTER> to disconnect')
# if (sys.version_info > (3, 0)):
#   input()
# else:
#   raw_input()

# bleno.stopAdvertising()
# bleno.disconnect()

# print ('terminated.')
# sys.exit(1)
