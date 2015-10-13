var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Tree validation', function() {
  it('Depth with meta and attr validates', function() {
    var tree =  require('../samples/signalk-depth-meta-attr');
    tree.should.be.validSignalKVessel;
  });

  it('mmsi: vessel property', function() {
    var msg = {
      vessels: {
        "mmsi:230099999": {
          "mmsi": "230099999"
        }
      }
    }
    msg.should.be.validSignalK;
  });

  it('signalk: vessel property', function() {
    var msg = {
      vessels: {
        "signalk:de305d54-75b4-431b-adb2-eb6b9e546014": {
          "uuid": {
            "value" : "de305d54-75b4-431b-adb2-eb6b9e546014",
            "checksum": "74a93ec0"
          }
        }
      }
    }
    msg.should.be.validSignalK;
    msg.vessels["signalk:de305d54-75b4-431b-adb2-eb6b9e546014"].mmsi = "230099999";
    msg.should.be.validSignalK;
  });

});