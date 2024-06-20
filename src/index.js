/*
 * Copyright 2016, Teppo Kurki
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var _ = require('lodash');
var FullSignalK = require('./fullsignalk');

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

const Ajv = require('ajv-draft-04')
const addAjvFormats = require('ajv-formats')
const tv4Formats = require('tv4-formats');
const fs = require('fs')
const path = require('path')

var vesselSchema = require('../schemas/vessel.json');
var aircraftSchema = require('../schemas/aircraft.json');
var atonSchema = require('../schemas/aton.json');
var sarSchema = require('../schemas/sar.json');
var definitions = require('../schemas/definitions.json');
var externalGeometry = require('../schemas/external/geojson/geometry.json');

function getAjv() {
	var ajv = new Ajv({strict: false})
	ajv.addSchema(vesselSchema, 'https://signalk.org/specification/1.5.1/schemas/vessel.json');
	ajv.addSchema(aircraftSchema, 'https://signalk.org/specification/1.5.1/schemas/aircraft.json')
	ajv.addSchema(atonSchema, 'https://signalk.org/specification/1.5.1/schemas/aton.json');
	ajv.addSchema(sarSchema, 'https://signalk.org/specification/1.5.1/schemas/sar.json');
	ajv.addSchema(definitions, 'https://signalk.org/specification/1.5.1/schemas/definitions.json');
	for (var schema in subSchemas) {
    if(schema == 'sources') {
    }
	  ajv.addSchema(subSchemas[schema], 'https://signalk.org/specification/1.5.1/schemas/groups/' + schema + '.json')
	}
	ajv.addSchema(externalGeometry, 'https://signalk.org/specification/1.5.1/schemas/external/geojson/geometry.json');
  addAjvFormats(ajv)


  console.log("################")
  console.log(Object.keys(ajv.schemas))
  console.log("################")


	return ajv;
}

function getTv4() {
  var tv4 = require('tv4');
  var vesselSchema = require('../schemas/vessel.json');
  tv4.addSchema('https://signalk.org/specification/1.5.1/schemas/vessel.json', vesselSchema);
  tv4.addSchema('https://signalk.org/specification/1.5.1/schemas/aircraft.json', aircraftSchema);
  tv4.addSchema('https://signalk.org/specification/1.5.1/schemas/aton.json', atonSchema);
  tv4.addSchema('https://signalk.org/specification/1.5.1/schemas/sar.json', sarSchema);
  tv4.addSchema('https://signalk.org/specification/1.5.1/schemas/definitions.json', definitions);

  for (var schema in subSchemas) {
    tv4.addSchema('https://signalk.org/specification/1.5.1/schemas/groups/' + schema + '.json', subSchemas[schema]);
  }

  // HACK! two different IDs should not point to the same schema
  var externalGeometry = require('../schemas/external/geojson/geometry.json');
  tv4.addSchema('https://signalk.org/specification/1.5.1/schemas/external/geojson/geometry.json', externalGeometry);
  tv4.addSchema('http://json-schema.org/geojson/geometry.json', externalGeometry);

  tv4.addFormat(tv4Formats)

  return tv4;
}

/*
  USE_AJV
  */
function validateFull(tree) {
  var signalkSchema = require('../schemas/signalk.json');

  if(process.env.USE_AJV) {
    var ajv = getAjv();
    const validate = ajv.compile(signalkSchema)
    const valid = validate(tree)
    return {
      valid: valid,
      errors: validate.errors
    };

  } else {
    var tv4 = getTv4();
    var valid = getTv4().validateMultiple(tree, signalkSchema, true, true);
    var result = tv4.validateResult(tree, signalkSchema, true, true);
    //Hack: validateMultiple marks anyOf last match incorrectly as not valid with banUnknownProperties
    //https://github.com/geraintluff/tv4/issues/128
    valid.valid = result.valid;
    return valid;
  }
}

/*
  USE_AJV
*/
function validateDelta(delta, ignoreContext) {
  var tv4 = require('tv4');
  var deltaSchema = require('../schemas/delta.json');
  var definitions = require('../schemas/definitions.json');
  tv4.addSchema('https://signalk.org/specification/1.5.1/schemas/definitions.json', definitions);

  if (ignoreContext) {
    delta.context = 'ignored the context, so place a placeholder there';
  }
  var valid = tv4.validateMultiple(delta, deltaSchema, true, true);
  return valid;
}

/*
  USE_AJV
*/
function validateWithSchema(msg, schemaName) {
  var tv4 = require('tv4');
  var schema = require('../schemas/' + schemaName);
  var valid = tv4.validateResult(msg,schema, true, true);
  return valid;
}

function chaiAsPromised(chai, utils) {
  "use strict";

  var Assertion = chai.Assertion

  /*
    Wrangle AJV errors to same format?
  */
  function checkValidFullSignalK () {
    var result = validateFull(this._obj);
    if(process.env.USE_AJV) {
      var message = "googoogaagaa"; 
      if(result.valid === false) {
        console.log('heres the problem')
        console.log(JSON.stringify(this._obj, null, '  '));
      }
      message = JSON.stringify(result.errors, null, 2);
      this.assert(result.valid, message, 'expected #{this} to not be valid SignalK')
    } else {
      var message = result.errors.reduce(function(msgBuilder, error) {
        msgBuilder += error.dataPath + ":" + error.message + "\n";
        return msgBuilder;
      }, {});
      this.assert(
        result.valid
        , message
        , 'expected #{this} to not be valid SignalK'
        );
    }
  }
  Assertion.addProperty('validSignalK', checkValidFullSignalK);
  Assertion.addProperty('validFullSignalK', checkValidFullSignalK);
  Assertion.addProperty('validSignalKIgnoringSelf', function() {
    this._obj.self = 'urn:mrn:imo:mmsi:230099999';
    checkValidFullSignalK.call(this);
  });  
  Assertion.addProperty('validSignalKVessel', function() {
    this._obj = {
      'vessels': {
        'urn:mrn:imo:mmsi:230099999': this._obj
      },
      self: 'urn:mrn:imo:mmsi:230099999',
      'version': '1.0.0'
    }
    checkValidFullSignalK.call(this);
  });
  Assertion.addProperty('validSignalKVesselIgnoringIdentity', function() {
    this._obj.mmsi = '230099999';
    this._obj = {
      'vessels': {
        'urn:mrn:imo:mmsi:230099999': this._obj
      },
      self: 'urn:mrn:imo:mmsi:230099999',
      version: "0.0.0"
    }
    checkValidFullSignalK.call(this);
  });
  Assertion.addProperty('validSignalKHello', function () {
    var result = validateWithSchema(this._obj, 'hello.json');
    var message = result.error ? result.error.message + ':' + result.error.dataPath : '';
    this.assert(
      result.valid
      , message
      , 'expected #{this} to be valid SignalK hello message'
      );
  });
  Assertion.addProperty('validSignalKDelta', function () {
    var result = validateDelta(this._obj);
    var message = result.errors.length === 0 ? '' : result.errors[0].message + ':' + result.errors[0].dataPath +
      ' (' + (result.errors.length-1) + ' other errors not reported here)';
    this.assert(
      result.valid
      , message
      , 'expected #{this} to not be valid SignalK delta'
      );
  });
  Assertion.addProperty('validSignalKPut', function () {
    var result = validateWithSchema(this._obj, 'messages/put.json');
    var message = result.error ? result.error.message : ''
    if (result.errors) {
      message = result.errors.length === 0 ? '' : result.errors[0].message + ':' + result.errors[0].dataPath +
      ' (' + (result.errors.length-1) + ' other errors not reported here)';
    }
    this.assert(
      result.valid
      , message
      , 'expected #{this} to not be valid SignalK put'
      );
  });
  Assertion.addProperty('validSignalKGet', function () {
	    var result = validateWithSchema(this._obj, 'messages/get.json');
	    var message = result.error ? result.error.message : ''
	    if (result.errors) {
	      message = result.errors.length === 0 ? '' : result.errors[0].message + ':' + result.errors[0].dataPath +
	      ' (' + (result.errors.length-1) + ' other errors not reported here)';
	    }
	    this.assert(
	      result.valid
	      , message
	      , 'expected #{this} to not be valid SignalK get'
	      );
	  });
  Assertion.addProperty('validSubscribeMessage', function () {
    var result = validateWithSchema(this._obj, 'messages/subscribe.json');
    var message = result.error ? result.error.message + ':' + result.error.dataPath : '';
    this.assert(
      result.valid
      , message
      , 'expected #{this} to not be valid SignalK subscribe message'
      );
  });
  Assertion.addProperty('validUnsubscribeMessage', function () {
    var result = validateWithSchema(this._obj, 'messages/unsubscribe.json');
    var message = result.error ? result.error.message + ':' + result.error.dataPath : '';
    this.assert(
      result.valid
      , message
      , 'expected #{this} to not be valid SignalK unsubscribe message'
      );
  });
  Assertion.addProperty('validAuthMessage', function () {
    var result = validateWithSchema(this._obj, 'messages/auth.json');
    var message = result.error ? result.error.message + ':' + result.error.dataPath : '';
    this.assert(
      result.valid
      , message
      , 'expected #{this} to not be valid SignalK auth message'
      );
  });
  Assertion.addProperty('validDiscovery', function () {
    var result = validateWithSchema(this._obj, 'discovery');
    var message = result.error ? result.error.message + ':' + result.error.dataPath : '';
    this.assert(
      result.valid
      , message
      , 'expected #{this} to not be valid SignalK discovery document'
      );
  });
}


//FIXME does not account for multiple sources for a single path in a single delta
module.exports.deltaToFullVessel = function(delta) {
  var result = {};
  if (delta.updates) {
    delta.updates.forEach(function(update) {
      if (update.values) {
        update.values.forEach(function(pathValue) {
          if (typeof pathValue.value === 'object') {
            _.set(result, pathValue.path, pathValue.value);
          } else {
            _.set(result, pathValue.path + '.value', pathValue.value);
          }
          _.set(result, pathValue.path + '.timestamp', update.timestamp);
          if (update.source) {
            if (update.source.pgn) {
              _.set(result, pathValue.path + '.pgn', update.source.pgn);
            }
            if (!_.isUndefined(update.source.label) && update.source.src) {
              _.set(result, pathValue.path + "['$source']", update.source.label + '.' + update.source.src);
            }
          }
          _.set(result, pathValue.path + '.timestamp', update.timestamp);
        })
      }
    })
  }
  return result;
}

module.exports.deltaToFull = function(delta) {
  var fullSignalK = new FullSignalK();
  fullSignalK.addDelta(delta);
  var result = fullSignalK.retrieve();
  fillIdentity(result);
  return result;
}

function fillIdentity(full) {
  let identity
  for (identity in full.vessels) {
    fillIdentityField(full.vessels[identity], identity);
    //fill arbitrarily the last id as self, used in tests
    full.self = identity
  }
}

var mmsiPrefixLenght = 'urn:mrn:imo:mmsi:'.length;
function fillIdentityField(vesselData, identity) {
  if (identity.indexOf('urn:mrn:imo') === 0) {
    vesselData.mmsi = identity.substring(mmsiPrefixLenght, identity.length)
  } else if (identity.indexOf('urn:mrn:signalk') === 0) {
    vesselData.uuid = identity
  } else {
    vesselData.url = identity;
  }
}

function getSourceId(source) {
  if (!source) {
    return 'no_source';
  }
  if (source.canName ) {
    return `${source.label}.${source.canName}`
  } else if ( source.src ) {
    return `${source.label}.${source.src}`
  }
  if (typeof source === 'object') {
    return source.label + (source.talker ? '.' + source.talker : '.XX');
  }
  //source data is actually from $source, not source: {...}
  return source
}

function keyForSourceIdPath(sourceId, path) {
  return sourceId + "." + path;
}

module.exports.fillIdentityField = fillIdentityField;

module.exports.validateFull = validateFull;
module.exports.validateVessel = function(vesselData) {
  return validateFull({
      'vessels': {
        'urn:mrn:imo:mmsi:230099999': vesselData
      }
    });
}
module.exports.fillIdentity = fillIdentity;
module.exports.validateDelta = validateDelta;
module.exports.chaiModule = chaiAsPromised;
module.exports.getTv4 = getTv4;
module.exports.getAjv = getAjv;
module.exports.subSchemas = subSchemas;
module.exports.units = require('../schemas/definitions').definitions.units;
module.exports.metadata = require('./keyswithmetadata.json');
module.exports.FullSignalK = FullSignalK;
module.exports.fakeMmsiId = "urn:mrn:imo:mmsi:230099999";
module.exports.getSourceId = getSourceId;
module.exports.keyForSourceIdPath = keyForSourceIdPath;


var metadataByRegex = []
_.forIn(module.exports.metadata, (value, key) => {
  const regexpKey =
    '^' + key.replace(/\*/g, '.*').replace(/RegExp/g, '.*') + '$'
  if (!regexpKey.endsWith('.*$')) {
    metadataByRegex.push({
      regexp: new RegExp(regexpKey),
      metadata: value
    })
  }
})

module.exports.getUnits = function (path) {
  const meta = module.exports.getMetadata(path)
  return meta ? meta.units : undefined
}

module.exports.getMetadata = function (path) {
  const result = metadataByRegex.find(entry =>
    entry.regexp.test('/' + path.replace(/\./g, '/'))
  )

  return result && Object.keys(result.metadata).length > 0  ? result.metadata : undefined
}

module.exports.internalGetMetadata = function (path) {
  const result = metadataByRegex.find(entry =>
    entry.regexp.test('/' + path.replace(/\./g, '/'))
  )

  let meta = result ? result.metadata : undefined
  const parts = path.split('.')
  const key = `/${parts[0]}/*/` + parts.slice(2).join('/')
  if ( !module.exports.metadata[key] ) {
    meta = result ? JSON.parse(JSON.stringify(result.metadata)) : {}
    module.exports.metadata[key] = meta
    const regexpKey =
          '^' + key.replace(/\*/g, '.*').replace(/RegExp/g, '.*') + '$'
    metadataByRegex.unshift({
      regexp: new RegExp(regexpKey),
      metadata: meta
    })
  }
  
  return meta
}

module.exports.addMetaData = function(context, path, meta) {
  const root = context.split('.')[0]
  const key = `/${root}/*/${path.replace(/\./g, '/')}`
  let existing = module.exports.metadata[key]
  if ( existing ) {
    _.merge(existing, meta)
  } else {
    let regexMeta = module.exports.getMetadata(context + '.' + path)
    if ( regexMeta ) {
      let newMeta = JSON.parse(JSON.stringify(regexMeta))
      _.merge(newMeta, meta)
      meta = newMeta
    }
       
    module.exports.metadata[key] = meta
    
    const regexpKey =
          '^' + key.replace(/\*/g, '.*').replace(/RegExp/g, '.*') + '$'
    metadataByRegex.unshift({
      regexp: new RegExp(regexpKey),
      metadata: meta
    })
  }
}

module.exports.getAISShipTypeName = function(id) {
  const the_enum = subSchemas['design'].properties.aisShipType.allOf[1].properties.value.allOf[1].enum;
  //const the_enum = module.exports.getMetadata('vessels.foo.design.aisShipType').enum
  var res = the_enum.find(item => { return item.id  == id });
  return res ? res.name : undefined 
}


module.exports.getAtonTypeName = function(id) {
  const the_enum = require('../schemas/aton.json').properties.atonType.allOf[1].properties.value.allOf[1].enum;
  var res = the_enum.find(item => { return item.id  == id });
  return res ? res.name : undefined 
}
