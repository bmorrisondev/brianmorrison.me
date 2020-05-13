const fs = require('fs')

let config = {}


if(fs.existsSync('./app.config.json')) {
  config = require('./app.config.json')
}

if(fs.existsSync('./app.config.local.json')) {
  const localConfig = require('./app.config.local.json')
  if(config === {}) {
    config = localConfig
  } else {
    Object.keys(localConfig).forEach(k => {
      if(Array.isArray(localConfig[k])) {
        // 
      } else {
        config[k] = localConfig[k]
      }
    })
  }
}

module.exports = config
