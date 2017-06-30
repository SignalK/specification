var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Resources and position ref in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/resource-position.json').should.be.validSignalK;
  });
});
