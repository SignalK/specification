var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Lux in the full tree - N2K', function() {
  it("Sample full tree is valid", function() {
    require('./data/lux.json').should.be.validSignalK;
  });
});

describe('Lux in the full tree - i2c', function() {
  it("Sample full tree is valid", function() {
    require('./data/lux-i2c.json').should.be.validSignalK;
  });
});
