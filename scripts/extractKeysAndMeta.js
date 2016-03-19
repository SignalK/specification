#!/usr/bin/env node

var _ = require('lodash');


var subSchemas = require('..').subSchemas;
subSchemas.definitions = require('../schemas/definitions.json');




var data = {};

_.forOwn(subSchemas, function(schema, schemaName) {
  //  if (schemaName === 'tanks') {
  extractUnits(data, schemaName, schema, schema);
  //  }
})

console.log(JSON.stringify(data, null, 2));

function extractUnits(result, pathPrefix, element, schema) {
  _.forOwn(element, function(value, key) {
//    console.log(pathPrefix + " " + key + " = " + value)
    if (key === '$ref') {
      value = getDefinition(value, schema);
    }
    if (value && value.units && key != 'definitions') {
      result[pathPrefix + '.' + key] = {
        description: value.description,
        units: value.units
      };
    } else if (typeof value === 'object') {
      if (key === 'definitions') {
        return
      } else if (key === '$ref') {
        extractUnits(result, pathPrefix, value, schema);
      } else if (key === 'patternProperties') {
        _.forOwn(value, function(value, key) {
          extractUnits(result, pathPrefix + ".*", value, schema);
        })
      } else if (key === 'properties') {
        extractUnits(result, pathPrefix, value, schema);
      } else {
        extractUnits(result, pathPrefix + '.' + key, value, schema);
      }
    }
  })
}

function getDefinition(reference, schema) {
  //#/definitions/
  //12345678901234
  //  console.log(reference.slice(0,14))
  //  console.log(reference.slice(14))
  //../definitions.json#/definitions/
  //123456789012345678901234567890123
  if (reference.startsWith('#/definitions/')) {
    try {
      return schema.definitions[reference.slice(14)];
    } catch (e) {
      console.error("No such definition:" + reference);
      return {};
    }
  } else if (reference.startsWith('../definitions.json#/definitions/')) {
    try {
      return subSchemas.definitions.definitions[reference.slice(33)]
    } catch (e) {
      console.error("No such definition:" + reference);
      return {};
    }
  } else {
    console.error("No such definition:" + reference);
    return {};
  }
}
