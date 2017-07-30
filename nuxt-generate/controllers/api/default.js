exports.install = function () {
  F.route('/api/hello_msg', hello_json)
}

function hello_json () {
  this.json({msg: 'Hello from API'})
}