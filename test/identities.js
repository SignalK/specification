var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);
var _ = require('lodash')

describe('Identies in the full tree', function() {
  it("Different identities validate", function() {
    require('./data/identities.json').should.be.validSignalK;
  });
});


var validVessel ={
  "uuid": {
    "value" : "de305d54-75b4-431b-adb2-eb6b9e546014",
    "checksum": "74a93ec0"
  }
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
      "uuid": {
        "value" : "de305d54-75b4-431b-adb2-eb6b9e54601",
        "checksum": "17862a91"
      }
    };
    assertInvalidSignalKVessel(msg);
  });


  it('Invalid vessel.uuid checksum is flagged as error', function() {
    var msg ={
      "uuid": {
        "value" : "de305d54-75b4-431b-adb2-eb6b9e546014",
        "checksum": "74a93ec1"
      }
    };
    assertInvalidSignalKVessel(msg);
  });

  it('Missing vessel.uuid.checksum is flagged as error', function() {
    var msg ={
      "uuid": {
        "value" : "de305d54-75b4-431b-adb2-eb6b9e546014"
      }
    };
    assertInvalidSignalKVessel(msg);
  });

  it('Missing vessel.uuid.value is flagged as error', function() {
    var msg ={
      "uuid": {
        "checksum": "74a93ec1"
      }
    };
    assertInvalidSignalKVessel(msg);
  });

  it('Missing vessel.uuid properties is flagged as error', function() {
    var msg ={
      "uuid": {
      }
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
