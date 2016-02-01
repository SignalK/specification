var chai = require('chai');
chai.Should();
chai.use(require('../index.js').chaiModule);

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
        "timestamp": "2014-08-15-19:03:21.532",
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
        "timestamp": "2014-08-15-19:03:21.532",
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
        "timestamp": "2014-08-15-19:00:15.402",
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
    var fullSignalK = new FullSignalK();
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
        "timestamp": "2014-08-15-19:02:31.507",
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
  })
})
