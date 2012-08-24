var mocha = require('mocha')
  , utils = require('../lib/utils')
  , assert = require('assert')

describe('balloon utils', function () {

  it('sets defaults of an object', function () {
    var result,
        opts = {zero: 0, one: 1, empty: '', nan: NaN, string: "str"}

    utils.defaults(opts, {zero: 1, one: 2, two: 3})
    assert.equal(opts.zero, 0)
    assert.equal(opts.one, 1)
    assert.equal(opts.two, 3)
    assert.equal(opts.empty, '')
    assert.equal(opts.string, 'str')
  })

})
