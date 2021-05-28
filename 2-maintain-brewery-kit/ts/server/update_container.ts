import firebase from '@firebase/app';
import * as fs from 'fs';

class UpdateContainer {
  private notifyPath_: string;

  constructor(notifyPath: string, containerVersion: string) {
    this.notifyPath_ = notifyPath;

    if (!firebase.database) {
      console.log('firebase.database is not defined');
      return;
    }
    firebase
      .database()
      .ref('/admin/container_name')
      .on('value', (snapshot) => {
        // e.g. pascaljp/inkbird:latest
        const newContainerVersion: string = snapshot.val();
        if (
          typeof newContainerVersion == 'string' &&
          containerVersion != newContainerVersion
        ) {
          fs.writeFileSync(this.notifyPath_, newContainerVersion);
        }
      });
  }
}

export {UpdateContainer};
