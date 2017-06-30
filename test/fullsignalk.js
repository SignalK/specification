var chai = require('chai');
chai.Should();
chai.use(require('../dist/').chaiModule);

var FullSignalK = require('../src/fullsignalk');



describe('FullSignalK', function() {
  it('Delta with object value should produce full tree leaf without the .value', function() {
    var delta = {
      "updates": [{
        "source": {
          "label": "n2kFromFile",
          "type": "NMEA2000",
          "pgn": 129038,
          "src": "43"
        },
        "timestamp": "2014-08-15T19:03:21.532Z",
        "values": [{
          "path": "navigation.speedOverGround",
          "value": 7.09
        }, {
          "path": "navigation.courseOverGroundTrue",
          "value": 4.8171
        }, {
          "path": "navigation.position",
          "value": {
            "longitude": 25.4398883,
            "latitude": 59.969895
          }
        }]
      }],
      "context": "vessels.foo"
    };
    var fullSignalK = new FullSignalK();
    fullSignalK.addDelta(delta);
    fullSignalK.retrieve().vessels.foo.navigation.position.should.have.property('longitude');
    fullSignalK.retrieve().vessels.foo.navigation.position.should.have.property('$source');
  })

  it('Two deltas from different sources results in values structure', function() {
    var delta = {
      "updates": [{
        "source": {
          "label": "n2kFromFile",
          "type": "NMEA2000",
          "pgn": 129038,
          "src": "43"
        },
        "timestamp": "2014-08-15T19:03:21.532Z",
        "values": [{
          "path": "navigation.speedOverGround",
          "value": 7.09
        }]
      }],
      "context": "vessels.foo"
    };
    var fullSignalK = new FullSignalK();
    fullSignalK.addDelta(delta);
    delta.updates[0].source.src = 48;
    delta.updates[0].values[0].value = 8;
    fullSignalK.addDelta(delta);
    fullSignalK.retrieve().vessels.foo.navigation.speedOverGround.should.have.property('value', 8);
    fullSignalK.retrieve().vessels.foo.navigation.speedOverGround.should.have.property('$source');
    fullSignalK.retrieve().vessels.foo.navigation.speedOverGround.values['n2kFromFile.43'].should.have.property('value', 7.09);
    fullSignalK.retrieve().vessels.foo.navigation.speedOverGround.values['n2kFromFile.48'].should.have.property('value', 8);
  })

  it('AIS delta produces valid Signal K', function() {
    var aisDelta = {
      "updates": [{
        "source": {
          "label": "",
          "type": "NMEA2000",
          "pgn": 129038,
          "src": "43"
        },
        "timestamp": "2014-08-15T19:00:15.402Z",
        "values": [{
          "path": "navigation.speedOverGround",
          "value": 14.81
        }, {
          "path": "navigation.courseOverGroundTrue",
          "value": 3.4889
        }, {
          "path": "navigation.position",
          "value": {
            "longitude": 24.8142433,
            "latitude": 59.865655
          }
        }]
      }],
      "context": "vessels.urn:mrn:imo:mmsi:276780000"
    };
    var fullSignalK = new FullSignalK("urn:mrn:imo:mmsi:276799999", "mmsi");
    console.log(JSON.stringify(fullSignalK, null, 2))
    fullSignalK.addDelta(aisDelta);
    fullSignalK.retrieve().should.be.validSignalK;

  })

  it('Delta with empty path sets content under root', function() {
    var msg = {
      "updates": [{
        "source": {
          "label": "n2kFromFile",
          "type": "NMEA2000",
          "pgn": 129794,
          "src": "43"
        },
        "timestamp": "2014-08-15T19:02:31.507Z",
        "values": [{
          "path": "",
          "value": {
            "name": "WRANGO"
          }
        }]
      }],
      "context": "vessels.urn:mrn:imo:mmsi:276810000"
    }
    var fullSignalK = new FullSignalK();
    fullSignalK.addDelta(msg);
    var vessel = fullSignalK.retrieve().vessels['urn:mrn:imo:mmsi:276810000'];
    vessel.should.have.property('name', "WRANGO");
    vessel.should.not.have.property('$source');
    vessel.should.not.have.property('timestamp');
    vessel.should.not.have.property('pgn');
  })

  it('Delta with instance produces proper sources hierarchy', function() {

    var msg = {
      "updates": [{
        "source": {
          "label": "N2K",
          "type": "NMEA2000",
          "pgn": 130312,
          "src": "36",
          "instance": "0"
        },
        "timestamp": "2015-01-15T16:15:19.628Z",
        "values": [{
          "path": "environment.water.temperature",
          "value": 15.2
        }]
      }],
      "context": "vessels.urn:mrn:imo:mmsi:276810000"
    }
    var fullSignalK = new FullSignalK();
    fullSignalK.addDelta(msg);
    var full = fullSignalK.retrieve();
    var vessel = full.vessels['urn:mrn:imo:mmsi:276810000'];
    vessel.environment.water.temperature.should.have.property('value', 15.2);
    full.sources.should.have.property('N2K');
    full.sources['N2K'].should.have.property('36');
    full.sources['N2K']['36'].should.have.property('0');
  })

  it('Delta with $source produces sources hierarchy and correct $source reference', function() {

    var msg =   {
      "context": "vessels.urn:mrn:imo:mmsi:276810000",
      "updates": [{
        "$source": "1W.0316013faeff",
        "values": [{
          "path": "propulsion.engine1.temperature",
          "value": 301.837
        }]
      }]
    }

    var fullSignalK = new FullSignalK();
    fullSignalK.addDelta(msg);
    var full = fullSignalK.retrieve();
    full.sources.should.have.property('1W');
    full.sources['1W'].should.have.property('0316013faeff');
    var vessel = full.vessels['urn:mrn:imo:mmsi:276810000'];
    vessel.propulsion.engine1.temperature.should.have.property('$source', '1W.0316013faeff')
  })

})
