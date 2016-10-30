var assert = require('chai').assert

var signalk = require('../');
var RefParser = require('json-schema-ref-parser');
var path = require('path');

describe('Schema references', function() {
  it('missing files are not referenced', function() {
    var signalkSchema = require('../schemas/signalk.json');
    var tv4 = signalk.getTv4();

    tv4.validate({}, signalkSchema);
    assert.lengthOf(tv4.getMissingUris(), 0, 'There should be no missing schema uris, but found ' + tv4.getMissingUris());
  })

  it('all references are valid', function(done) {
    RefParser.dereference(path.join(__dirname, '../schemas/signalk.json'), function(err, schema) {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  })
});
