#!/usr/bin/env node

import minimist from 'minimist'
import path from 'path'
import fs from 'fs-extra'
import { exec as _exec } from 'child_process'
import { promisify } from 'util'
import ora from 'ora'

const exec = promisify(_exec)
const { pathExistsSync, removeSync, outputJsonSync, readJsonSync } = fs

type RepoType = 'js' | 'ts' | 'vue'

const args = minimist(process.argv.slice(2))
const type: RepoType = args.t || args.type || 'js'

const cwd = process.cwd()
const gitPath = path.resolve(cwd, '.git')
const pkgJsonPath = path.resolve(cwd, 'package.json')

const spinner = ora()

const scripts = [
  `cd ${cwd}`,
  'npx mrm@3 lint-staged',
  'npx husky add .husky/commit-msg "node ./node_modules/@yangss/init-git-repo/dist/scripts/validate-commit-msg.js"'
]

async function run () {
  if(!pathExistsSync(gitPath)) {
    scripts.splice(1, 0, 'git init')
  }
  spinner.start('Initialize git Repo...')
  const { stdout } = await exec(scripts.join('&&'))
  removeSync(path.resolve(cwd, '6'))
  console.log()
  console.log(stdout)
  updatePkgJson()
  spinner.succeed('Completed!')
}

function updatePkgJson() {
  const pkgJson = readJsonSync(pkgJsonPath)
  const lintStaged: Record<string, string> = {}
  switch(type) {
    case 'ts':
      lintStaged['*.(js|ts|tsx)'] = 'eslint --fix'
      break
    case 'vue':
      lintStaged['*.(ts|tsx|vue)'] = 'eslint --fix'
      break
    default:
      lintStaged['*.(js|cjs|mjs|jsx)'] = 'eslint --fix'
  }
  pkgJson['lint-staged'] = lintStaged
  outputJsonSync(pkgJsonPath, pkgJson, { spaces: 2 })
}


run().catch(err => console.error(err))
