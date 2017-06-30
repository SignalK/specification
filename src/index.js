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


function getTv4() {
  var tv4 = require('tv4');
  var vesselSchema = require('../schemas/vessel.json');
  tv4.addSchema('https://signalk.org/specification/0.9.0-SNAPSHOT/schemas/vessel.json', vesselSchema);
  var aircraftSchema = require('../schemas/aircraft.json');
  tv4.addSchema('https://signalk.org/specification/0.9.0-SNAPSHOT/schemas/aircraft.json', aircraftSchema);
  var atonSchema = require('../schemas/aton.json');
  tv4.addSchema('https://signalk.org/specification/0.9.0-SNAPSHOT/schemas/aton.json', atonSchema);
  var sarSchema = require('../schemas/sar.json');
  tv4.addSchema('https://signalk.org/specification/0.9.0-SNAPSHOT/schemas/sar.json', sarSchema);
  var definitions = require('../schemas/definitions.json');
  tv4.addSchema('https://signalk.org/specification/0.9.0-SNAPSHOT/schemas/definitions.json', definitions);

  for (var schema in subSchemas) {
    tv4.addSchema('https://signalk.org/specification/0.9.0-SNAPSHOT/schemas/groups/' + schema + '.json', subSchemas[schema]);
  }

  // HACK! two different IDs should not point to the same schema
  var externalGeometry = require('../schemas/external/geojson/geometry.json');
  tv4.addSchema('https://signalk.org/specification/0.9.0-SNAPSHOT/schemas/external/geojson/geometry.json', externalGeometry);
  tv4.addSchema('http://json-schema.org/geojson/geometry.json', externalGeometry);

  tv4.addFormat(require('tv4-formats'))

  return tv4;
}

function validateFull(tree) {
  var signalkSchema = require('../schemas/signalk.json');

  var tv4 = getTv4();
  var valid = getTv4().validateMultiple(tree, signalkSchema, true, true);
  var result = tv4.validateResult(tree, signalkSchema, true, true);
  //Hack: validateMultiple marks anyOf last match incorrectly as not valid with banUnknownProperties
  //https://github.com/geraintluff/tv4/issues/128
  valid.valid = result.valid;
  return valid;
}

function validateDelta(delta, ignoreContext) {
  var tv4 = require('tv4');
  var deltaSchema = require('../schemas/delta.json');
  var definitions = require('../schemas/definitions.json');
  tv4.addSchema('https://signalk.org/specification/0.9.0-SNAPSHOT/schemas/definitions.json', definitions);

  if (ignoreContext) {
    delta.context = 'ignored the context, so place a placeholder there';
  }
  var valid = tv4.validateMultiple(delta, deltaSchema, true, true);
  return valid;
}

function validateWithSchema(msg, schemaName) {
  var tv4 = require('tv4');
  var schema = require('../schemas/' + schemaName);
  var valid = tv4.validateResult(msg,schema, true, true);
  return valid;
}

function chaiAsPromised(chai, utils) {
  "use strict";

  var Assertion = chai.Assertion

  function checkValidFullSignalK () {
    var result = validateFull(this._obj);

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
  Assertion.addProperty('validSignalK', checkValidFullSignalK);
  Assertion.addProperty('validFullSignalK', checkValidFullSignalK);
  Assertion.addProperty('validSignalKVessel', function() {
    this._obj = {
      'vessels': {
        'urn:mrn:imo:mmsi:230099999': this._obj
      },
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
      version: "0.0.0"
    }
    checkValidFullSignalK.call(this);
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
  Assertion.addProperty('validSubscribeMessage', function () {
    var result = validateWithSchema(msg, 'messages/subscribe');
    var message = result.error ? result.error.message + ':' + result.error.dataPath : '';
    this.assert(
      result.valid
      , message
      , 'expected #{this} to not be valid SignalK subscribe message'
      );
  });
  Assertion.addProperty('validUnsubscribeMessage', function () {
    var result = validateWithSchema(msg, 'messages/unsubscribe');
    var message = result.error ? result.error.message + ':' + result.error.dataPath : '';
    this.assert(
      result.valid
      , message
      , 'expected #{this} to not be valid SignalK unsubscribe message'
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
  if (source.src || source.pgn) {
    return source.label +
      (source.src ? '.' + source.src : '') +
      (source.instance ? '.' + source.instance : '');
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
module.exports.i18n = require('./i18n/');
module.exports.getTv4 = getTv4;
module.exports.subSchemas = subSchemas;
module.exports.units = require('../schemas/definitions').definitions.units;
module.exports.metadata = require('./keyswithmetadata');
module.exports.FullSignalK = FullSignalK;
module.exports.fakeMmsiId = "urn:mrn:imo:mmsi:230099999";
module.exports.getSourceId = getSourceId;
module.exports.keyForSourceIdPath = keyForSourceIdPath;
