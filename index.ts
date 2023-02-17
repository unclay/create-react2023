#!/usr/bin/env node

import minimist from 'minimist'
import prompts from 'prompts'
import * as banners from './utils/banners'

let result = {
  name: 'react-project',
}
async function init() {
  console.log()
  console.log(
    process.stdout.isTTY && process.stdout.getColorDepth() > 8
      ? banners.gradientBanner
      : banners.defaultBanner
  )
  console.log()

  const cwd = process.cwd()
  // possible options:
  const argv = minimist(process.argv.slice(2), {
    alias: {
      typescript: ['ts'],
      'with-tests': ['tests'],
      router: ['vue-router']
    },
    string: ['_'],
    // all arguments are treated as booleans
    boolean: true
  })
  result = await prompts(
    [
      {
        type: 'text',
        name: 'name',
        message: 'Project name',
        initial: 'result.name',
      },
    ]
  )
}

try {
  init()
} catch(err) {
  console.error(err)
}