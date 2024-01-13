let chalk
// 如果 require 报错，使用动态 import() 加载
import('chalk')
  .then((module) => {
    chalk = module.default || module
    // 在此处可以继续使用 chalk 变量
    // 比如：console.log(chalk.green('Hello, world!'));
  })
  .catch((importErr) => {
    console.error('Failed to dynamically import chalk:', importErr)
  })
const consola = require('consola')
const { getArgv, targets: allTargets, binRun, getPkgRoot, step } = require('./utils')

const path = require('path')
const fs = require('fs')

let beReleasedPackages = []

run()
async function run() {
  const argv = getArgv()
  beReleasedPackages = argv._
  release()
}

async function release() {
  step('\ncollect be released packages...')
  if (beReleasedPackages.length === 0) {
    beReleasedPackages = allTargets
  }
  step(`\nbeReleasedPackages:\n ${beReleasedPackages.join('\n')}`)
  beReleasedPackages.forEach((target) => {
    publicPackage(target)
  })
}

async function publicPackage(pkgName) {
  const pkgRoot = getPkgRoot(pkgName)
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = require(pkgPath)
  const version = pkg.version
  if (pkg.private) return
  fs.access(`${pkgRoot}/dist`, fs.constants.F_OK, async (err) => {
    if (err) {
      consola.error(chalk.red(`${pkgName} don't have dist folder`))
      return
    }
    step(`Publishing ${pkgName}...`)
    try {
      await binRun('yarn', ['publish', '--new-version', version, '--access', 'public'], {
        cwd: pkgRoot,
        stdio: 'pipe'
      })
      consola.success(chalk.green(`Successfully published ${pkgName}@${version}`))
    } catch (error) {
      consola.error(`failed publish ${pkgName}@${version}`, error)
    }
  })
}
