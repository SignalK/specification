var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('mothershipMmsi in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/mothership.json').should.be.validSignalK;
  });
});

describe('mothershipMmsi with bad value in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/mothership-bad.json').should.not.be.validSignalK;
  });
});
