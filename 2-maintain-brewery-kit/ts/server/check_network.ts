import {execSync} from 'child_process';
import * as fs from 'fs';

class CheckNetwork {
  private threshold_: number;
  private notifyPath_: string;
  private consecutiveFailures_: number;

  constructor(threshold: number, notifyPath: string) {
    this.threshold_ = threshold;
    this.notifyPath_ = notifyPath;
    this.consecutiveFailures_ = 0;
    // Check network status every minute.
    setInterval(this.ping_.bind(this), 60 * 1000);
  }

  private ping_() {
    try {
      execSync('ping -c 1 8.8.8.8');
      this.consecutiveFailures_ = 0;
      console.log('OK: CheckNetwork.ping');
    } catch {
      this.consecutiveFailures_++;
      console.log('NG: CheckNetwork.ping');
      if (this.consecutiveFailures_ >= this.threshold_) {
        fs.writeFileSync(this.notifyPath_, '');
        // TODO: reboot
      }
    }
  }
}

export {CheckNetwork};
