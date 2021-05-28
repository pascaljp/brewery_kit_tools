import * as fs from 'fs';
const {ArgumentParser} = require('argparse');

import {getConfigPath} from '../common/config';
import {EscapeHatch} from './escape_hatch';
import {CheckNetwork} from './check_network';
import {UpdateContainer} from './update_container';
import {initFirebase} from './firebase';

function getConfig(): {machineId: string} {
  return JSON.parse(fs.readFileSync(getConfigPath(), {encoding: 'utf8'}));
}

function main() {
  const parser = new ArgumentParser({
    description: 'Brewery-kit maintenance tool',
  });
  parser.add_argument('--version', {help: 'Docker container version'});
  const args: any = parser.parse_args();

  try {
    initFirebase();
    const config = getConfig();

    // Run the escape hatch service.
    const escapeHatch = new EscapeHatch();
    escapeHatch.init(config.machineId);

    // Notify the host that machine is disconnected from the network for 5 minutes.
    new CheckNetwork(5, '/mnt/notify_from_container/network_error');

    new UpdateContainer(
      '/mnt/notify_from_container/new_container_available',
      args.version
    );
  } catch (e) {
    console.error(e);
  }
}

main();
