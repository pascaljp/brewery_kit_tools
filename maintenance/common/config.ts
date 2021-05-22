import * as os from 'os';
import * as path from 'path';

function getConfigPath(): string {
  return path.join(os.homedir(), 'config.json');
}

function getDataDir(): string {
  return path.join(os.homedir(), 'data');
}

export {getConfigPath, getDataDir};
