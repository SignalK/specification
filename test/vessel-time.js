var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Time in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('../samples/vessel-time.json').should.be.validSignalK;
  });
});
