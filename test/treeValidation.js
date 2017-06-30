var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

describe('Tree validation', function() {
  it('Depth with meta and attr validates', function() {
    var tree =  require('../samples/signalk-depth-meta-attr');
    tree.should.be.validSignalKVessel;
  });
});