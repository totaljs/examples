const Nuxt = require('nuxt')
const options = require('../nuxt.config')
const nuxt = new Nuxt(options)

nuxt.build().then(function () {
  F.middleware('nuxt', nuxt.render)
})