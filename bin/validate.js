#!/usr/bin/env node

var JSONStream = require('JSONStream');
var Transform = require('stream').Transform;

var signalkSchema = require('../');

process.stdin.resume();
process.stdin.setEncoding('utf8');


function Validator(options) {
  Transform.call(this, {
    objectMode: true
  });
}

require('util').inherits(Validator, Transform);

Validator.prototype._transform = function(chunk, encoding, done) {
  var validationResult = signalkSchema.validateFull(chunk);
  if (!validationResult.valid) {
    console.error(JSON.stringify(validationResult, null, 2));
  }
  done();
}

process.stdin.pipe(JSONStream.parse()).pipe(new Validator());
