var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Datetime in the full tree', function() {
  it("should be valid", function() {
    require('./data/datetime.json').should.be.validSignalK;
  });
});
