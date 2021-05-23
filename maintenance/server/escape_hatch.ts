import {execSync} from 'child_process';
import firebase from '@firebase/app';
import '@firebase/database';
import type {DataSnapshot} from '@firebase/database-types';

class EscapeHatch {
  constructor() {}

  init(machineId: string) {
    if (!firebase.database) {
      throw new Error('Firebase realtime database is not available');
    }

    // Special path that anyone can write under the following conditions.
    // - The key needs to be ' '.
    // - The value needs to be a string 'fake'.
    //
    // The purpose is to create a path
    // '/admin/escape_hatch/${machineId}/request' so that reqRoot can listen
    // the changes to the path.
    firebase
      .database()
      .ref(`/admin/escape_hatch/${machineId}/request`)
      .child(' ')
      .set('fake');
    console.log(`machine id: ${machineId}`);

    // Anyone can read.
    // Admin of the system can write.
    const reqRoot = firebase
      .database()
      .ref(`/admin/escape_hatch/${machineId}/request`);
    // Admin of the system can read.
    // Anyone can write under the following conditions:
    // - The key needs to exist in reqRoot.
    // - The value should be a string with length <= 4096.
    // - Existing value cannot be overwritten.
    const resRoot = firebase
      .database()
      .ref(`/admin/escape_hatch/${machineId}/response`);

    const callback = async (snapshot: DataSnapshot) => {
      const command = snapshot.val();
      console.log(command);
      let result = null;
      try {
        result = execSync(command + ' 2>/dev/null').toString();
      } catch (e) {
        console.log(e.stdout.toString());
        console.warn(e.stderr.toString());
      }
      const o: {[key: string]: any} = {};
      const key = snapshot.key as string;
      o[key] = result;
      try {
        await resRoot.update(o);
      } catch (e) {
        console.warn(e);
      }
    };

    reqRoot
      .orderByKey()
      .limitToLast(1)
      .once('value')
      .then((snapshot) => {
        console.log(snapshot.val());
        const lastKey = snapshot.val()
          ? Object.keys(snapshot.val())[0] || ''
          : '';
        console.log(lastKey);
        reqRoot.orderByKey().startAfter(lastKey).on('child_added', callback);
        reqRoot.orderByKey().startAfter(lastKey).on('child_changed', callback);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export {EscapeHatch};
