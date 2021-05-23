/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')

const msgPath = path.resolve(process.cwd(), '.git/COMMIT_EDITMSG')
const msg = fs.readFileSync(msgPath, 'utf-8').trim()

const releaseRegEx = /^v?(0|[1-9]\d*)(\.(0|[1-9]\d*))*$/
const msgRegEx =
  /^(revert: )?(feat|fix|docs|refactor|perf|test|workflow|build|ci|chore|types|wip|release|deps)(\(.+\))?: .{1,50}/

if (!releaseRegEx.test(msg) && !msgRegEx.test(msg)) {
  console.log()
  console.error(' Error: invalid commit message format.\n  See https://www.conventionalcommits.org for more details.\n'
  )
  process.exit(1)
}
