var jade = require('jade')
  , _ = require('underscore')
  , nodemailer = require('nodemailer')
  , fs = require('fs')
  , path = require('path')

module.exports = Balloon

function Balloon(config) {
  this.transport = nodemailer.createTransport("SES", config.auth)
  _.defaults(config, {
    templateDirectory: path.join(__dirname, 'templates')
  })

  this.config = config
  this.config.cache = config.cache || process.NODE_ENV === 'production'
  this.cache = config.cache && {}
}

Balloon.prototype.send = function (template, model, params, callback) {
  var opts = {
    locals: model
  }
  var self = this
  this.renderFile(template, opts, function (err, result) {
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

Balloon.prototype.compile = function (tpl, model, callback) {
  var template = jade.compile(tpl)
  callback(null, template(model))
}

Balloon.prototype.renderFile = function (template, opts, callback) {
  var ext = path.extname(template) || '.jade'
  var name = path.join(this.config.templateDirectory, path.basename(template, ext) + ext)
  var self = this

  if (self.cache && self.cache[name]) {
    self.compile(self.cache[name], opts.locals, callback)
  } else {
    fs.readFile(name, 'utf8', function (err, data) {
      self.cache[name] = data
      if (err) callback(err, null)
      else self.compile(data, opts.locals, callback)
    })
  }
}
