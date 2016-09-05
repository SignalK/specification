#!/usr/bin/env node

var _ = require('lodash');
var fs = require('fs')


var subSchemas = require('..').subSchemas;
subSchemas.definitions = require('../schemas/definitions.json');




var data = {};

_.forOwn(subSchemas, function(schema, schemaName) {
  extractUnits(data, schemaName, schema, schema);
})

fs.writeFileSync("keyswithmetadata.json", JSON.stringify(data, null, 2));


var prelude = '# Signal K Data Model Reference\n\n'
prelude += 'This document is meant as the human-oriented reference to accompany the actual JSON Schema specification and is produced from the schema files.\n'
prelude += 'Any changes to the reference material below should be made to the original schema files.\n\n\n'

fs.writeFileSync("doc.md", prelude);
fs.appendFileSync("doc.md", _.pairs(data)
  .sort((a, b) => a[0] > b[0] ? 1 : (a[0] < b[0] ? -1 : 0))
  .reduce(keyToMarkDown, ''))

function keyToMarkDown(acc, keyWithData) {
  var md = ''
  var key = keyWithData[0]
  var metadata = keyWithData[1]

  md += `## ${key}\n`
  if (metadata.description) {
    md += `${metadata.description}\n\n`
  }
  if (metadata.units) {
    md += `**Units:**${metadata.units}\n\n`
  }
  if (metadata.enum) {
    md += `${formatEnum(metadata.enum)}`
  }
  if (metadata.example) {
    md += `### Example:\n`
    md += `\`\`\`\n`
    md += `${metadata.example}\n`
    md += `\`\`\`\n`
  }
  md += '\n'

  return acc + md
}

function formatEnum(enumValues) {
  return `###Enum values:\n${enumValues.reduce((acc,value) => acc += `* ${value}\n`, '')}\n`
}

function extractUnits(result, pathPrefix, element, schema) {
  _.forOwn(element, function(value, key) {
    // console.log(pathPrefix + " " + key + " = " + value)
    if (value.enum) {
      result[pathPrefix + '.' + key] = {
        description: value.description,
        enum: value.enum
      };
    }
    if (value.properties && value.properties.value && value.properties.value.enum) {
      result[pathPrefix + '.' + key] = {
        description: value.description,
        enum: value.properties.value.enum
      };
      return;
    }
    if (key === '$ref') {
      value = getDefinition(value, schema);
    }
    if (value && value.units && key != 'definitions') {
      result[pathPrefix + '.' + key] = {
        description: value.description,
        units: value.units
      };
      if (value.example) {
        result[pathPrefix + '.' + key].example = value.example
      }
      extractUnits(result, pathPrefix + '.' + key, value, schema);
    } else if (typeof value === 'object') {
      if (key === 'definitions' || key === 'timestamp') {
        return
      } else if (key === 'allOf') {
        extractUnits(result, pathPrefix, allOf(value, schema), schema);
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

function allOf(allOfArray, schema) {
  var elements = allOfArray.map(function(element) {
    if (element['$ref']) {
      return getDefinition(element['$ref'], schema)
    }
    return element
  });
  var merged = elements.reduce(function(acc, element) {
    _.merge(acc, element);
    return acc;
  }, {});
  return merged;
}

function getDefinition(reference, schema) {
  if (reference.startsWith('#/definitions/')) {
    try {
      return schema.definitions[reference.slice(14)];
    } catch (e) {
      try {
        return subSchemas.definitions.definitions[reference.slice(14)];
      } catch (e) {
        console.error("Nooo such definition:" + reference);
        return {};
      }
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
