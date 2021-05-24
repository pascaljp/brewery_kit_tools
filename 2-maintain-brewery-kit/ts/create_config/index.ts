import * as fs from 'fs';
import * as crypto from 'crypto';

import {getConfigPath, getDataDir} from '../common/config';

function createMachineId(): string {
  const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return (
    'random-' +
    Array.from(crypto.randomFillSync(new Uint8Array(16)))
      .map((n) => S[n % S.length])
      .join('')
  );
}

function initializeConfig() {
  let updated: boolean = false;
  let config: {[key: string]: string} = {};
  try {
    config = JSON.parse(
      fs.readFileSync(getConfigPath(), {encoding: 'utf8'})
    );
  } catch {}
  if (!config.machineId) {
    config.machineId = createMachineId();
    updated = true;
  }
  if (!config.dataDir) {
    config.dataDir = getDataDir();
    updated = true;
  }
  if (updated) {
    fs.writeFileSync(getConfigPath(), JSON.stringify(config));
  }
}

initializeConfig();
