function chaiAsPromised(chai, utils) {
  "use strict";

  var Assertion = chai.Assertion

  Assertion.addProperty('validSignalK', function () {    
    var result = validate(this._obj);
    var message = result.errors.length === 0 ? '' : result.errors[0].message + ':' + result.errors[0].dataPath + 
      ' (' + (result.errors.length-1) + ' other errors not reported here)';
    this.assert(
      result.valid
      , message
      , 'expected #{this} to not be valid SignalK'
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
  Assertion.addProperty('validSubscriptionMessage', function () {
    var result = validateSubscriptionMessage(this._obj);
    var message = result.error ? result.error.message + ':' + result.error.dataPath : '';
    this.assert(
      result.valid
      , message
      , 'expected #{this} to not be valid SignalK delta'
      );
  });
}

function validate(tree) {
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

  var validTree = {
    vessels: {
      '230099999': tree
    }
  }
  var valid = tv4.validateMultiple(validTree, signalkSchema, true, true);
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

function validateSubscriptionMessage(msg) {
  var tv4 = require('tv4');
  var subscribeSchema = require('./schemas/messages/subscribe.json');
  var valid = tv4.validateResult(msg,subscribeSchema, true, true);
  return valid;
}

module.exports.validate = validate;
module.exports.validateDelta = validateDelta;
module.exports.chaiModule = chaiAsPromised;
