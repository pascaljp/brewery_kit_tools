import * as os from 'os';
import * as path from 'path';

function getConfigPath(): string {
  return path.join(os.homedir(), '.inkbird', 'config.json');
}

function getDataDir(): string {
  return path.join(os.homedir(), '.inkbird', 'data');
}

export {getConfigPath, getDataDir};
