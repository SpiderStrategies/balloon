# Balloon

#### Send email using Amazon SES and jade templates.

Balloon is an incredibly simple node.js module for sending emails through Amazon SES using [Nodemailer](http://documentup.com/andris9/nodemailer/) and [Jade](https://github.com/visionmedia/jade) for templating.

## Installation

```bash
npm install balloon
```

## Basic usage

```javascript
var Balloon = require('balloon')

balloon = new Balloon({
  auth: {
    AWSAccessKeyID: <AWS Access Key ID>,
    AWSSecretKey: <AWS Secret Key>
  }
})

var model = {
   foo: 'bar'
}
var params = {
  from: 'president@gmail.com',
  to: ''
  subject: ''
}
balloon.send('templateFile', model, params, function (err, result) {
    // We did it!
});
```

## Templating

See jade documentation

## Testing

```bash
make test ARGS="--from <FROM> --to <TO> --key <AWS_KEY> --secret <AWS_SECRET>"
```
