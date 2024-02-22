const Ajv = require('ajv-draft-04')
const fs = require('fs')
const path = require('path')

var subSchemas = {
    'notifications': require('../schemas/groups/notifications.json'),
    'communication': require('../schemas/groups/communication.json'),
    'design': require('../schemas/groups/design.json'),
    'navigation': require('../schemas/groups/navigation.json'),
    'electrical': require('../schemas/groups/electrical.json'),
    'environment': require('../schemas/groups/environment.json'),
    'performance': require('../schemas/groups/performance.json'),
    'propulsion': require('../schemas/groups/propulsion.json'),
    'resources': require('../schemas/groups/resources.json'),
    'sails': require('../schemas/groups/sails.json'),
    'sensors': require('../schemas/groups/sensors.json'),
    'sources': require('../schemas/groups/sources.json'),
    'steering': require('../schemas/groups/steering.json'),
    'tanks': require('../schemas/groups/tanks.json')
  };

var vesselSchema = require('../schemas/vessel.json');
var aircraftSchema = require('../schemas/aircraft.json');
var sarSchema = require('../schemas/sar.json');
var definitions = require('../schemas/definitions.json');

function getAjv() {
	var ajv = new Ajv({strict: false})
	ajv.addSchema(vesselSchema, 'https://signalk.org/specification/1.5.1/schemas/vessel.json');
	ajv.addSchema(aircraftSchema, 'https://signalk.org/specification/1.5.1/schemas/aircraft.json')
	ajv.addSchema(sarSchema, 'https://signalk.org/specification/1.5.1/schemas/sar.json');
	ajv.addSchema(definitions, 'https://signalk.org/specification/1.5.1/schemas/definitions.json');
  
	for (var schema in subSchemas) {
	  ajv.addSchema(subSchemas[schema], 'https://signalk.org/specification/1.5.1/schemas/groups/' + schema + '.json')
	}
  
	// HACK no longer necessary?
	var externalGeometry = require('../schemas/external/geojson/geometry.json');
	ajv.addSchema(externalGeometry, 'https://signalk.org/specification/1.5.1/schemas/external/geojson/geometry.json');
  
	const tv4Formats = require('tv4-formats');
	for(format in tv4Formats) {
		ajv.addFormat(format, tv4Formats[format])
	}
  
	return ajv;
  }


describe('the ajv library', () => {

	it('can build a validator out of all the schema files', () => {
		const ajv = getAjv()
	})

	describe('validating samples', () => {
		it('does this', () => {
			const ajv = getAjv()

			const signalKSchema = require('../schemas/signalk.json')
			const sampleFull0183RMC = require('../samples/full/0183-RMC-full.json')
			ajv.validate(signalKSchema, sampleFull0183RMC)
		})
	})
})
