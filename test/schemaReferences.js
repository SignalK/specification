var assert = require('chai').assert

var signalk = require('@bkp7/schema-js-api');
var RefParser = require('json-schema-ref-parser');
var path = require('path');

describe('Schema integrity', function() {
  it('schemas loaded without errors', function() {
    assert(signalk.schemas.status === 'loaded');
  })

});
