import firebase from '@firebase/app';
import * as fs from 'fs';

class UpdateContainer {
  private notifyPath_: string;

  constructor(notifyPath: string) {
    this.notifyPath_ = notifyPath;

    if (!firebase.database) {
      return;
    }
    firebase
      .database()
      .ref('/admin/container_name')
      .on('value', (snapshot) => {
        // e.g. pascaljp/inkbird:latest
        const containerName: string = snapshot.val();
        if (typeof containerName == 'string') {
          fs.writeFileSync(this.notifyPath_, containerName);
        }
      });
  }
}

export {UpdateContainer};
