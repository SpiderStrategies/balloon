var mocha = require('mocha')
  , argv = require('optimist').demand(['from', 'to', 'key', 'secret']).argv
  , Balloon = require('../lib')
  , assert = require('assert')
  , path = require('path')

balloon = new Balloon({
  templateDirectory: path.join(__dirname, 'templates'),
  auth: {
    AWSAccessKeyID: argv.key,
    AWSSecretKey: argv.secret
  }
})

describe('balloon', function () {
  it('should send a templated email', function (done) {
    balloon.send('hello', {
      users: {
        Linus: { type: 'Boxer' }
      }
    }, {
      from: argv.from,
      to: argv.to,
      subject: 'Balloon templated test'
    }, function (err, result) {
      assert(!err)
      assert(result)
      console.log("Go check your email :)")
      done()
    })
  })
})
