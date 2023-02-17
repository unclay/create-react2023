#!/usr/bin/env node
import * as path from 'path'

import minimist from 'minimist'
import prompts from 'prompts'
import banners from './utils/banners'
import renderTemplate from './utils/render-template'

console.log(banners);
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
    },
    string: ['_'],
    // all arguments are treated as booleans
    boolean: true
  })
  let targetDir = argv._[0]

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

  const root = path.join(cwd, targetDir)

  // todo:
  // work around the esbuild issue that `import.meta.url` cannot be correctly transpiled
  // when bundling for node and the format is cjs
  // const templateRoot = new URL('./template', import.meta.url).pathname
  const templateRoot = path.resolve(__dirname, 'template')
  const render = function render(templateName) {
    const templateDir = path.resolve(templateRoot, templateName)
    renderTemplate(templateDir, root)
  }

  // Render base template
  render('base')
}

try {
  init()
} catch(err) {
  console.error(err)
}