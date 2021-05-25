import firebase from '@firebase/app';
import '@firebase/database';

function initFirebase() {
  if (firebase.apps.length == 0) {
    firebase.initializeApp({
      apiKey: 'AIzaSyBT6_J6eKuV1gX5zJZQHMyCsb4LSxfi68Y',
      appId: '1:567787916313:web:b31c427a013911da88ee88',
      projectId: 'brewery-kit',
      databaseURL: 'https://brewery-kit.firebaseio.com',
    });
  }
}

export {initFirebase};
