var chai = require('chai');
chai.Should();

const signalkSchema = require("../")

describe('Metadata api', function() {
  it('returns metadata for normal keys', function() {
    const cogMeta = signalkSchema.getMetadata('navigation.courseOverGroundTrue')
    cogMeta.should.have.property("units")
    cogMeta.units.should.equal("rad")
    cogMeta.should.have.property("description")
  })
})
