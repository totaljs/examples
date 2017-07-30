const path = require('path')
const fs = require('fs')
const publicDir = path.join( __dirname, '..' , CONFIG('directory-public'))
exports.install = function () {
  const reg = /^(?!\/api)[/A-Za-z0-9_.]*$/
  /*
  * Test url, if not start with '/api' then use nuxt middleware to handle the request
  * */
  F.route('/', index)
  F.file((url)=>{return reg.test(url.uri.path)}, nuxt)
}

function index () {
  const filePath = path.join( publicDir, 'index.html')
  this.res.file(filePath)
}

function nuxt (req, res) {
  const fileName = req.url
  const filePath = path.join(publicDir, fileName)
  const read = fs.createReadStream(filePath)
  read.pipe(res)
  //I don't know why there will be syntax error if I use res.file(filePath), but native node js is fine.
}