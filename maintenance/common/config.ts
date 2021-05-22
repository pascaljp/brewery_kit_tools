import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

function getConfigPath(): string {
  try {
    fs.mkdirSync(path.join(os.homedir(), '.inkbird'), {recursive: true});
  } catch {}
  return path.join(os.homedir(), '.inkbird', 'config.json');
}

function getDataDir(): string {
  try {
    fs.mkdirSync(path.join(os.homedir(), '.inkbird'), {recursive: true});
  } catch {}
  return path.join(os.homedir(), '.inkbird', 'data');
}

export {getConfigPath, getDataDir};
