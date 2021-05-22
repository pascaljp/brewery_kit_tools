// Tools this program depends on:
// - curl
// - unzip
// - npm

import {run} from './util';

function install(rootDir: string, firmwareZipUrl: string) {
  try {
    // Compare the latest version with current version.
    run(`touch ${rootDir}/firmwareZipUrl`);
    const currentFirmwareZipUrl = run(`cat ${rootDir}/firmwareZipUrl`).split('\n')[0];
    if (currentFirmwareZipUrl == firmwareZipUrl) {
      return;
    }

    // Install.
    run(`curl -sS ${firmwareZipUrl} -o /tmp/firmware.zip`);
    run('ls -la', rootDir);
    run('rm -rf brewery_kit*', rootDir);
    run(`unzip /tmp/firmware.zip -d ${rootDir}`);
    run(`mv brewery_kit* brewery_kit`, rootDir);
    run('npm install --production', `${rootDir}/brewery_kit/monitoring`);
    run(`echo ${firmwareZipUrl} > ${rootDir}/firmwareZipUrl`);
  } catch (e) {
    console.error(e);
  }
}

export {install};
