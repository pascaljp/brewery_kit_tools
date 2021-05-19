import {execSync} from 'child_process';

function run(command: string, cwd?: string) {
  const result = execSync(`${command}`, {cwd: cwd, encoding: 'utf8'});
  console.log(`$ ${command}\n${result}`);
  return result;
}

export {run};
