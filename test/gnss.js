var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('gnss in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/gnss.json').should.be.validSignalK;
  });
});

describe('gnss with bad type in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/gnss-bad-type.json').should.not.be.validSignalK;
  });
});

describe('gnss with bad methodQuality in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/gnss-bad-methodQuality.json').should.not.be.validSignalK;
  });
});
