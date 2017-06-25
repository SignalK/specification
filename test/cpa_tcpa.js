var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Valid cpa and tcpa values in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/ais-cpa-tcpa.json').should.be.validSignalK;
  });
});
