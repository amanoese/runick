const runick_cmd = `./src/cli.js`

import fs from 'fs';
import { execSync } from 'child_process';
import help_message from '../test_data/help_message';

describe('runick',()=>{
  test('generate',async ()=>{
    let result = execSync(`${runick_cmd}`)
    expect(result.toString()).toEqual(expect.anything())
  })
  test('--help',async ()=>{
    let result = execSync(`${runick_cmd} --help`)
    expect(result.toString()).toEqual(help_message)
  })
  test('encode to decode',async ()=>{
    let result = execSync(`echo -n unko | ${runick_cmd} | ${runick_cmd} -d`)
    expect(result.toString()).toEqual('unko')
  })
})
