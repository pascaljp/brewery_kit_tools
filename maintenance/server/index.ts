import firebase from '@firebase/app';
import '@firebase/database';
import * as fs from 'fs';

import {getConfigPath} from '../common/config';

import {EscapeHatch} from './escape_hatch';
// import {install} from './installer';

function getConfig(): {machineId: string} {
  return JSON.parse(
    fs.readFileSync(getConfigPath(), {encoding: 'utf8'})
  );
}

function main() {
  try {
    firebase.initializeApp({
      apiKey: 'AIzaSyBT6_J6eKuV1gX5zJZQHMyCsb4LSxfi68Y',
      appId: '1:567787916313:web:b31c427a013911da88ee88',
      projectId: 'brewery-kit',
      databaseURL: 'https://brewery-kit.firebaseio.com',
    });

    const config = getConfig();

    // Run the escape hatch service.
    const escapeHatch = new EscapeHatch();
    escapeHatch.init(config.machineId);

    // Temporary disabled. We want to check escape-hatch logic first.
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
