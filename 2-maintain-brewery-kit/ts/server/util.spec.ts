import {run} from './util';

describe('UpdateJob', () => {
  test('run', () => {
    const output = run('cd /; ls');
    expect(output).toContain('tmp');
    expect(output).toContain('home');
    expect(output).toContain('bin');
  });
});
