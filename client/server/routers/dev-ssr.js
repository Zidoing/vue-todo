const Router = require('koa-router')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const path = require('path')
const serverConfig = require('../../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle

serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err
  }
  stats = stats.toJSON()
  stats.errors.forEach(err => {
    console.log(err)
  })

  stats.hasWarning.forEach(warn => {
    console.log(warn)
  })

  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))

})

const handleSSR = async (ctx) => {
  if (bundle) {
    const serverBundle = bundle

  } else {
    ctx.body = 'dengyihuier'
    return
  }
}
