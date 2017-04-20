var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('destination in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/nav-destination.json').should.be.validSignalK;
  });
});

describe('destination with bad value in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/nav-destination-bad.json').should.not.be.validSignalK;
  });
});
