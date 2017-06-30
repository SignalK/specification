var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('manouver in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/manouver.json').should.be.validSignalK;
  });
});

describe('manouver with bad value in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/manouver-bad.json').should.not.be.validSignalK;
  });
});
