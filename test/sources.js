var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

describe('Sources in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/sources.json').should.be.validSignalK;
  });
});


var deltaWithMiscSources = {
  "context": "vessels.urn:mrn:imo:mmsi:000000000",
  "updates": [{
    "source": {
      "sentence": "HDT",
      "label": "0183-1",
      "talker": "II"
    },
    "timestamp": "2016-08-03T07:55:57.000Z",
    "values": [{
      "path": "navigation.headingTrue",
      "value": 0.2231
    }]
  }, {
    "source": {
      "src": "37",
      "pgn": 127251,
      "label": "N2000-01"
    },
    "timestamp": "2016-06-20T10:33:36Z",
    "values": [{
      "path": "navigation.rateOfTurn",
      "value": 0.108908
    }]
  }, {
    "$source": "1W.0316013faeff",
    "timestamp": "2016-07-28T18:18:46.074Z",
    "values": [{
      "path": "propulsion.engine1.temperature",
      "value": 301.837
    }]
  }, {
    "$source": "i2c-0.0x48.volts",
    "timestamp": "2016-07-28T18:18:46.074Z",
    "values": [{
      "path": "electrical.batteries.house.voltage",
      "value": 12.837
    }]
  }, {
    "$source": "i2c-0.0x48.amps",
    "timestamp": "2016-07-28T18:18:46.074Z",
    "values": [{
      "path": "electrical.batteries.house.current",
      "value": -0.837
    }]
  }]
}


describe('Sources in delta', function() {
  it("are valid", function() {
    deltaWithMiscSources.should.be.validSignalKDelta;
  });
});
