var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);
var _ = require('lodash')

describe('Environment.mode in the full tree', function() {
  it("should be valid", function() {
    require('./data/env_mode.json').should.be.validSignalK;
  });
});
