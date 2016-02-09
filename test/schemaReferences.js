var assert = require('chai').assert

var signalk = require('../');

describe('Schema references', function() {
  it('all references are valid', function() {
    var signalkSchema = require('../schemas/signalk.json');
    var tv4 = signalk.getTv4();

    tv4.validate({}, signalkSchema);
    assert.lengthOf(tv4.getMissingUris(), 0, 'There should be no missing schema uris, but found ' + tv4.getMissingUris());
  })
});
