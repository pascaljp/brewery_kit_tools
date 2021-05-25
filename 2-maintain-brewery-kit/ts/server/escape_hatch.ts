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
    console.log(`machineId=${machineId}`);

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
      console.log(`[Incomming command]: ${command}`);
      let result = null;
      try {
        result = execSync(command).toString();
      } catch (e) {
        const stdout = e.stdout.toString();
        const stderr = e.stderr.toString();
        result = `[STDOUT]\n${stdout}\n[STDERR]\n${stderr}`;
      }
      console.log(`[Outgoing response]\n${result}`);
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
        const lastKey = snapshot.val()
          ? Object.keys(snapshot.val())[0] || ''
          : '';
        reqRoot.orderByKey().startAfter(lastKey).on('child_added', callback);
        reqRoot.orderByKey().startAfter(lastKey).on('child_changed', callback);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export {EscapeHatch};
