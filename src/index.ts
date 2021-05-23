#!/usr/bin/env node
import path from 'path'
import fs from 'fs'
import { exec as execCb } from 'child_process'
import { promisify } from 'util'
import ora from 'ora'

const spinner = ora()
const exec = promisify(execCb)
const cwd = process.cwd()
const gitPath = path.resolve(cwd, '.git')

const scripts = [
  `cd ${cwd}`,
  'npx mrm@2 lint-staged',
  'npx husky add .husky/commit-msg "node ./node_modules/@yangss/init-git-repo/scripts/validate-commit-msg.js"'
]

async function init () {
  try {
    fs.accessSync(gitPath, fs.constants.F_OK)
  } catch (error) {
    scripts.splice(1, 0, 'git init')
  }
  spinner.start('Initialize git Repo...')
  const output = await exec(scripts.join('&&'))
  spinner.succeed('Initialize git Repo completed')
  console.log(output.stdout)
  fs.rmSync(path.resolve(cwd, '6'))
}

init().catch(e => {
  console.error(e)
})
