var jade = require('jade')
  , _ = require('underscore')
  , nodemailer = require('nodemailer')
  , fs = require('fs')
  , path = require('path')

module.exports = Balloon

function Balloon(config) {
  var cache = {}
  this.transport = nodemailer.createTransport("SES", config.auth)
  _.defaults(config, {
    templateDirectory: path.join(__dirname, 'templates')
  })
  this.config = config
}

Balloon.prototype.send = function (template, model, params, callback) {
  var opts = {
    locals: model
  }
  var self = this
  this.compile(template, opts, function (err, result) {
    if (err) {
      // don't know yet
    } else {
      _.defaults(params, {
        html: result
      })
      self.transport.sendMail(params, function (err, responseStatus) {
        callback(err, responseStatus)
      })
    }
  })
}

Balloon.prototype.compile = function (template, opts, callback) {
  var ext = path.extname(template) || '.jade'
  var t = path.join(this.config.templateDirectory, path.basename(template, ext) + ext)
  fs.readFile(t, 'utf8', function (err, data) {
    // TODO: handle error
    var template = jade.compile(data)
    callback(err, template(opts.locals))
  })
}
