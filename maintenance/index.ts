import firebase from 'firebase';
import * as fs from 'fs';
import * as os from 'os';

import {EscapeHatch} from './escape_hatch';
// import {install} from './installer';
import {run} from './util';

function getUserName() {
  return os.userInfo().username;
}

function isOnDocker() {
  return getUserName() == 'docker';
}

function getRootDir() {
  if (isOnDocker()) {
    const userName = getUserName();
    run(`sudo chown ${userName}:${userName} -R /mnt/inkbird`);
    return '/mnt/inkbird';
  } else {
    run('mkdir -p /tmp/inkbird');
    return '/tmp/inkbird';
  }
}

function main() {
  try {
    firebase.initializeApp({
      apiKey: 'AIzaSyBT6_J6eKuV1gX5zJZQHMyCsb4LSxfi68Y',
      appId: '1:567787916313:web:b31c427a013911da88ee88',
      projectId: 'brewery-kit',
      // authDomain: 'brewery-kit.firebaseapp.com',
      databaseURL: 'https://brewery-kit.firebaseio.com',
      // storageBucket: 'brewery-kit.appspot.com',
      // messagingSenderId: '567787916313',
    });

    const rootDir: string = getRootDir();
    const machineId: string = JSON.parse(
      fs.readFileSync(`${rootDir}/config.json`, {encoding: 'utf8'})
    ).machineId;

    const escapeHatch = new EscapeHatch();
    escapeHatch.init(machineId);

    // firebase
    //   .database()
    //   .ref('/admin/firmware_url')
    //   .on('value', (snapshot) => {
    //     // e.g. https://codeload.github.com/pascaljp/brewery_kit/zip/refs/tags/1.0
    //     const firmwareUrl: string = snapshot.val();
    //     if (typeof firmwareUrl == 'string') {
    //       console.log(`Installing ${firmwareUrl}`);
    //       install(rootDir, firmwareUrl);
    //       // TODO: Restart the job.
    //     }
    //   });
  } catch (e) {
    console.error(e);
  }
}

main();
