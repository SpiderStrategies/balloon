var mocha = require('mocha')
  , argv = require('optimist').demand(['from', 'to', 'key', 'secret']).argv
  , Balloon = require('../lib')
  , assert = require('assert')
  , path = require('path')
  , fs = require('fs')

describe('balloon', function () {
  var balloon = undefined
  var model = { users: { Linus: { type: 'Boxer' }}}
  it('should send a templated email', function (done) {
    balloon.send('hello', model, {
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

  it('should cache templates in production', function (done) {
    process.NODE_ENV = 'production'
    balloon = new Balloon({
      templateDirectory: path.join(__dirname, 'templates')
    })

    balloon.renderFile('hello', { locals: model }, function (err, result) {
      assert(result)
      assert(balloon.cache)
      assert(balloon.cache[path.join(__dirname, 'templates', 'hello.jade')])

      // Make sure it doesn't read again
      var read = false
      var readFile = fs.readFile
      fs.readFile = function () {
        read = true
      }
      balloon.renderFile('hello', { locals: model }, function (err, second) {
        assert(!read)
        assert.equal(result, second)

        process.NODE_ENV = 'test'

        fs.readFile = readFile
        done()
      })
    })
  })

  it('should read a fresh template when not in production', function (done) {
    balloon.renderFile('hello', { locals: { users: { Linus: {type: 'Boxer' }}}}, function (err, result) {
      assert(result)
      assert(!balloon.cache)
      done()
    })
  })

  beforeEach(function () {
    balloon = new Balloon({
      templateDirectory: path.join(__dirname, 'templates'),
      auth: {
        AWSAccessKeyID: argv.key,
        AWSSecretKey: argv.secret
      }
    })
  })
})
