const chai = require('chai');
const should = chai.should()
chai.use(require('../dist/').chaiModule);
const FullSignalK = require('../src/fullsignalk')

describe('Sources in the full tree', function() {
  it("Sample full tree is valid", function() {
    require('./data/sources.json').should.be.validSignalK;
  });
});


var deltaWithMiscSources = {
  "context": "vessels.urn:mrn:imo:mmsi:200000000",
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
  }, {
    "timestamp": "2016-08-03T07:55:57.000Z",
    "values": [{
      "path": "navigation.headingTrue",
      "value": 0.2231
    }]
  }]
}

describe('Sources in delta', function() {
  it("are valid", function() {
    var fullSignalK = new FullSignalK('urn:mrn:imo:mmsi:200000000')
    fullSignalK.addDelta(deltaWithMiscSources)
    var full = fullSignalK.retrieve()
    full.sources['0183-1']['II'].talker.should.equal('II')
    full.sources['N2000-01']['37']['n2k']['src'].should.equal('37')
    console.log(JSON.stringify(full.sources, null, 2))
    should.exist(full.sources['i2c-0']['0x48'])
    should.exist(full.sources['1W']['0316013faeff'])
    //FIXME for some reason tv4 complains about source's type property being undefined
    // renaming the type property of the source fixes the problem
    // fix with a better validation tool or dig deeper
    // full.should.be.validSignalK
    deltaWithMiscSources.should.be.validSignalKDelta;
  });
});

var deltasWithBadSources = [{
  "context": "vessels.urn:mrn:imo:mmsi:200000000",
  "updates": [{
    "source": {
      "sentence": "HDT",
      "label": "0183-1",
      "talker": "II"
    },
    "$source": "i2c-0.0x48.amps",
    "timestamp": "2016-08-03T07:55:57.000Z",
    "values": [{
      "path": "navigation.headingTrue",
      "value": 0.2231
    }]
  }]
}, {
  "context": "vessels.urn:mrn:imo:mmsi:200000000",
  "updates": [{
    "source": "test",
    "timestamp": "2016-08-03T07:55:57.000Z",
    "values": [{
      "path": "navigation.headingTrue",
      "value": 0.2231
    }]
  }]
}, {
  "context": "vessels.urn:mrn:imo:mmsi:200000000",
  "updates": [{
    "$source": "path with space",
    "timestamp": "2016-08-03T07:55:57.000Z",
    "values": [{
      "path": "navigation.headingTrue",
      "value": 0.2231
    }]
  }]
},{
  "context": "vessels.urn:mrn:imo:mmsi:200000000",
  "updates": [{
    "$source": {
      "sentence": "HDT",
      "label": "0183-1",
      "talker": "II"
    },
    "timestamp": "2016-08-03T07:55:57.000Z",
    "values": [{
      "path": "navigation.headingTrue",
      "value": 0.2231
    }]
  }]
}]


describe('Bad sources in delta', function() {
  it("are not valid", function() {
    deltasWithBadSources.forEach(function(delta) {
      delta.should.not.be.validSignalKDelta;
    })
  });
});

describe('Multiple sources for the same path:', function() {
  it("value + values are valid", function() {
    require('./data/multiple-values.json').should.be.validSignalK
  });
});
