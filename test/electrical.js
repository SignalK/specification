var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Electrical in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/electrical.json').should.be.validSignalK;
  });
});
