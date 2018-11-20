'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  host: "13.209.93.63",
    disableHostCheck: true,
    port: 8080
})
