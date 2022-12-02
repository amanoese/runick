#!/usr/bin/env node
import getStdin from 'get-stdin'
import runick from './index.js'
import fs from 'fs'
const { version } = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

import { Command } from 'commander/esm.mjs';
const program = new Command();

program
.name('runick')
.description('runick is convert text to magic spell.')
.version(version)
.argument('[text]','input text','')
.option('-d','decode flag')
.action(async (text,option)=>{
  let inputText = text || (await getStdin())
  if (inputText == '') {
    console.log(runick.generate())
  } else if (option.d){
    process.stdout.write(runick.decode(inputText))
  } else {
    console.log(runick.encode(inputText))
  }
})
.parse(process.argv);
