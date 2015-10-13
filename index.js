function chaiAsPromised(chai, utils) {
  "use strict";

  var Assertion = chai.Assertion

  function checkValidFullSignalK () { 
    var result = validateFull(this._obj);
    var message = result.errors.length === 0 ? '' : result.errors[0].message + ':' + result.errors[0].dataPath + 
      ' (' + (result.errors.length-1) + ' other errors not reported here)';
    this.assert(
      result.valid
      , message
      , 'expected #{this} to not be valid SignalK'
      );
  }
  Assertion.addProperty('validSignalK', checkValidFullSignalK);
  Assertion.addProperty('validFullSignalK', checkValidFullSignalK);
  Assertion.addProperty('validSignalKVessel', function() {
    var vessel = this._obj;
    this._obj = {
      'vessels': {
        'mmsi:230099999': this._obj
      }
    }
    checkValidFullSignalK.call(this);
    if (vessel.uuid) {
      var crc = crc32(vessel.uuid.value).toString(16);
      this.assert(
         crc === vessel.uuid.checksum,
         "Uuid checksum error: crc32(" + vessel.uuid.value + ") != " +  vessel.uuid.checksum,
         "Expected uuid checksum to fail"
      );
    }
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
}

function validateFull(tree) {
  var tv4 = require('tv4');
  var signalkSchema = require('./schemas/signalk.json');
  var vesselSchema = require('./schemas/vessel.json');
  tv4.addSchema('https://signalk.github.io/specification/schemas/vessel.json', vesselSchema);
  var definitions = require('./schemas/definitions.json');
  tv4.addSchema('https://signalk.github.io/specification/schemas/definitions.json', definitions);

  var subSchemas = {
    'navigation': require('./schemas/groups/navigation.json'),
    'environment': require('./schemas/groups/environment.json'),
    'propulsion': require('./schemas/groups/propulsion.json'),
    'resources': require('./schemas/groups/resources.json'),
    'sensors': require('./schemas/groups/sensors.json'),
    'steering': require('./schemas/groups/steering.json'),
    'tanks': require('./schemas/groups/tanks.json')
  };
  for (var schema in subSchemas) {
    tv4.addSchema('https://signalk.github.io/specification/schemas/groups/' + schema + '.json', subSchemas[schema]);
  }

  var valid = tv4.validateMultiple(tree, signalkSchema, true, true);
  var result = tv4.validateResult(tree, signalkSchema, true, true);
  //Hack: validateMultiple marks anyOf last match incorrectly as not valid with banUnknownProperties
  //https://github.com/geraintluff/tv4/issues/128
  valid.valid = result.valid;
  return valid;
}

function validateDelta(delta, ignoreContext) {
  var tv4 = require('tv4');
  var deltaSchema = require('./schemas/delta.json');
  var definitions = require('./schemas/definitions.json');
  tv4.addSchema('https://signalk.github.io/specification/schemas/definitions.json', definitions);

  if (ignoreContext) {
    delta.context = 'ignored the context, so place a placeholder there';
  }
  var valid = tv4.validateMultiple(delta, deltaSchema, true, true);
  return valid;
}

function validateWithSchema(msg, schemaName) { 
  var tv4 = require('tv4');
  var schema = require('./schemas/' + schemaName);
  var valid = tv4.validateResult(msg,schema, true, true);
  return valid;
}
var crcTable = function(){
    var c;
    var crcTable = [];
    for(var n =0; n < 256; n++){
        c = n;
        for(var k =0; k < 8; k++){
            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        crcTable[n] = c;
    }
    return crcTable;
}()

function crc32 (str){
    var crc = 0 ^ (-1);

    for (var i = 0; i < str.length; i++ ) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
    }

    return (crc ^ (-1)) >>> 0;
};


module.exports.validateFull = validateFull;
module.exports.validateVessel = function(vesselData) {
  return validateFull({
      'vessels': {
        'mmsi:230099999': vesselData
      }
    });
}
module.exports.validateDelta = validateDelta;
module.exports.chaiModule = chaiAsPromised;
module.exports.i18n = require('./i18n/');
