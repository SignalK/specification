var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);
var _ = require('lodash')

describe('Identies in the full tree', function() {
  it("Different identities are valid", function() {
    require('./data/identities.json').should.be.validSignalK;
  });
});

describe('Context in delta', function() {
  it("Different contexts in delta are valid", function() {
    require('./data/identities-delta.json').forEach(function(delta) {
      delta.should.be.validSignalKDelta
    });
  });
});

var validVessel ={
  "uuid": "urn:mrn:signalk:uuid:b7590868-1d62-47d9-989c-32321b349fb9"
};

describe('No id', function() {
  it('flagged as error', function() {
    var msg = {};
    assertInvalidSignalKVessel(msg);
  });
});

describe('MMSI id', function() {
  it('just mmsi validates', function() {
    var msg = {
      "mmsi": "230099999"
    }
    msg.should.be.validSignalKVessel;
  });

  it('validates with uuid', function() {
    var msg = _.clone(validVessel);
    msg.mmsi = "230099999";
    msg.should.be.validSignalKVessel;
  });
});

describe('UUID:', function() {
  it('Valid vessel.uuid validates', function() {
    validVessel.should.be.validSignalKVessel;
  });

  it('vessel.uuid that is not in uuid canonical format is flagged as error', function() {
    var msg ={
      "uuid": "urn:mrn:signalk:uuid:de305d54-75b4-531b-adb2-eb6b9e546014"
    };
    assertInvalidSignalKVessel(msg);
  });
});


function assertInvalidSignalKVessel(msg) {
  var result;
  try {
    msg.should.be.validSignalKVessel;
    result = new Error("Expected " + JSON.stringify(msg) + " to not be a valid Signal K vessel document")
  } catch (ex) {
  }
  if (result) throw result  
}
