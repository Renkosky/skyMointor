const fs = require('fs')
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
const execa = require('execa')
const path = require('path')
const consola = require('consola')

const targets = (exports.targets = fs.readdirSync('packages').filter((f) => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false
  }
  if (f === 'company') return false
  const pkg = require(`../packages/${f}/package.json`)
  if (pkg.private && !pkg.buildOptions) {
    return false
  }
  return true
}))

exports.fuzzyMatchTarget = (partialTargets, includeAllMatching) => {
  const matched = []
  partialTargets.forEach((partialTarget) => {
    for (const target of targets) {
      if (target.match(partialTarget)) {
        matched.push(target)
        if (!includeAllMatching) {
          break
        }
      }
    }
  })
  if (matched.length) {
    return matched
  } else {
    console.log()
    consola.error(`  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`Target ${chalk.underline(partialTargets)} not found!`)}`)
    console.log()

    process.exit(1)
  }
}

exports.getArgv = () => {
  var argv = require('minimist')(process.argv.slice(2))
  return argv
}

exports.binRun = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })

exports.getPkgRoot = (pkg) => path.resolve(__dirname, '../packages/' + pkg)

exports.step = (msg) => consola.info(chalk.cyan(msg))

exports.errLog = (msg) => consola.error(chalk.red(msg))
