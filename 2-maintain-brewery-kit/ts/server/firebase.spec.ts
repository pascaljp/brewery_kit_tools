import {initFirebase} from './firebase';
import firebase from '@firebase/app';
import '@firebase/database';
import type {DataSnapshot} from '@firebase/database-types';

describe('firebase', () => {
  test('initFirebase sets database', (done) => {
    try {
      expect(firebase.database).not.toBeNull();
      initFirebase();
      expect(firebase.database).not.toBeNull();

      if (!firebase.database) {
        done('firebase.database is not defined');
        return;
      }
      const database = firebase.database();
      database
        .ref('/admin/container_name')
        .once('value', (snapshot: DataSnapshot) => {
          console.log(snapshot.val());
          done();
        });
    } catch (err) {
      done(err);
    }
  });
});
