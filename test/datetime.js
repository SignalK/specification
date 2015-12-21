var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);
var _ = require('lodash')

describe('Datetime in the full tree', function() {
  it("should be valid", function() {
    require('./data/datetime.json').should.be.validSignalK;
  });
});
