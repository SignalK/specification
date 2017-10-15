var chai = require('chai')
chai.Should()
const expect = chai.expect
const signalkSchema = require('../dist/')

describe('metadata:getUnits', function () {
  it('Valid simple getUnits works', function () {
    signalkSchema.getUnits('vessels.foo.navigation.speedOverGround').should.equal('m/s')
  })

  it('Valid complex path getUnits works', function () {
    signalkSchema.getUnits('vessels.foo.propulsion.0.oilTemperature').should.equal('K')
  })

  it('Invalid getUnits returns undefined', function () {
    expect(signalkSchema.getUnits('vessels.foo.bar.0.oilTemperature')).to.be.undefined
  })
})

describe('metadata:getMetadata', function () {
  it('Valid simple getMetadata works', function () {
    signalkSchema.getMetadata('vessels.foo.navigation.speedOverGround').should.deep.equal({
      units: 'm/s',
      description: "Vessel speed over ground. If converting from AIS 'HIGH' value, set to 102.2 (Ais max value) and add warning in notifications"
    })
  })

  it('Valid complex path getMetadata works', function () {
    signalkSchema.getMetadata('vessels.foo.propulsion.0.oilTemperature').should.deep.equal({
      units: 'K',
      description: 'Oil temperature'
    })
  })

  it('Invalid getMetadata returns undefined', function () {
    expect(signalkSchema.getMetadata('vessels.foo.0.oilTemperature')).to.be.undefined
  })

  it('getMetadata for path with enum works', function () {
    expect(
      signalkSchema.getMetadata('vessels.foo.navigation.datetime.gnssTimeSource')
    ).to.deep.equal({
      description: 'Source of GNSS Date and Time',
      enum: [
        'GPS',
        'GLONASS',
        'Galileo',
        'Beidou',
        'IRNSS',
        'Radio Signal',
        'Internet',
        'Local clock'
      ]
    })
  })
})

describe('getAISShipTypeName works', function() {
  it("ship type 20 is 'Wing In Ground'", function() {
    expect(
      signalkSchema.getAISShipTypeName(20)
    ).to.deep.equal('Wing In Ground')
  });
});


describe('getAtonTypeName works', function() {
  it("ship type 11 is 'Beacon, Cardinal S'", function() {
    expect(
      signalkSchema.getAtonTypeName(11)
    ).to.deep.equal('Beacon, Cardinal S')
  });
});
