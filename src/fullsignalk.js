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
var signalkSchema = require('./');
var getId;
var debug = require('debug')('signalk:fullsignalk');


function FullSignalK(id, type, defaults) {
  //hack, apparently not available initially, so need to set lazily
  getId = signalkSchema.getSourceId;

  this.root = {
    vessels: {},
    self: id,
    version: "0.1.0" // Should we read this from the package.json file?
  };
  if(id) {
    this.root.vessels[id] = defaults && defaults.vessels && defaults.vessels.self ? defaults.vessels.self : {};
    this.self = this.root.vessels[id];
    signalkSchema.fillIdentity(this.root)
    this.root.self = 'vessels.' + id
  }
  this.sources = {};
  this.root.sources = this.sources;
  this.lastModifieds = {};
}

require("util").inherits(FullSignalK, require("events").EventEmitter);

FullSignalK.prototype.retrieve = function() {
  return this.root;
}

FullSignalK.prototype.addDelta = function(delta) {
  this.emit('delta', delta);
  var context = findContextAndUpdateIdentity(this.root, delta.context);
  this.addUpdates(context, delta.context, delta.updates);
  this.updateLastModified(delta.context);
};

FullSignalK.prototype.updateLastModified = function(contextKey) {
  this.lastModifieds[contextKey] = new Date().getTime();
}

FullSignalK.prototype.pruneContexts = function(seconds) {
  var threshold = new Date().getTime() - seconds * 1000;
  for (let contextKey in this.lastModifieds) {
    if (this.lastModifieds[contextKey] < threshold) {
      this.deleteContext(contextKey);
      delete this.lastModifieds[contextKey];
    }
  }
}

FullSignalK.prototype.deleteContext = function(contextKey) {
  debug("Deleting context " + contextKey);
  var pathParts = contextKey.split('.');
  if(pathParts.length === 2) {
    delete this.root[pathParts[0]][pathParts[1]];
  }
}

/**
 * Both returns the context for a contextPath and update the context with the
 * appropriate key.
 *
 * contextPath is something like vessels.urn:mrn:imo:mmsi:276810000 or
 * vessels.foo.  Signalk tracks multiple vessels, each with their own context.
 * This method returns the context for the vessel.  It additionally adds either
 * the mmsi or url to the context to allow for easier access.
 *
 * For example:
 * contextPath=vessels.urn:mrn:imo:mmsi:276810000
 * before context={}
 * after context={"mmsi":"276810000"}
 *
 * @param {Object} root the signalk store
 * @param {string} contextPath the path to the desired vessel
 * @return {Object} the context for the desired vessel from the signalk store
 */
function findContextAndUpdateIdentity(root, contextPath) {
  // get the context and create an empty context if it doesn't exist
  let context = _.get(root, contextPath);
  if(!context) {
    context = {};
    _.set(root, contextPath, context);
  }

  // contextPath is something like "vessels.foo" or "vessels.urn:mrn:..."
  // if we have a full context path, add its contents to the context, so that
  // we can more easily access the mmsi or url
  const identity = contextPath.split('.')[1];
  if(!identity) {
    return undefined;
  }
  signalkSchema.fillIdentityField(context, identity);

  return context;
}

FullSignalK.prototype.addUpdates = function(context, contextPath, updates) {
  let that = this;
  updates.forEach(function(update) {
    that.addUpdate(context, contextPath, update);
  });
}

FullSignalK.prototype.addUpdate = function(context, contextPath, update) {
  // first, update the sources in the full context
  if (typeof update.source != 'undefined') {
    this.updateSource(context, update.source, update.timestamp);
  } else if(typeof update['$source'] != 'undefined') {
    this.updateDollarSource(context, update['$source'], update.timestamp);
  } else {
    console.error("No source in delta update:" + JSON.stringify(update));
  }

  // second, update the values
  addValues(context, contextPath, update.source || update['$source'], update.timestamp, update.values);
}

/**
 * Update the $source in the context.
 *
 * $source is a pointer to the sources field in the context.  See doc/data_model.html
 *
 * @param {Object} context
 * @param {string} dollarSource a path directive pointing the real source
 * @param {string} timestamp
 */
FullSignalK.prototype.updateDollarSource = function(context, dollarSource, timestamp) {
  const parts = dollarSource.split('.')
  // descend into the sources element of the context, creating elements as needed
  parts.reduce((cursor, part) => {
    if(typeof cursor[part] === 'undefined') {
      return cursor[part] = {}
    }
    return cursor[part]
  }, this.sources)

  // Uh, shouldn't something be done with the result of the reduce?  What if
  // the pointed to value isn't found?
}

/**
 * Update the source in the context.
 *
 * This is the top level source element in the context, not a source embedded in the tree
 *
 * @param {Object} context
 * @param {string} dollarSource a path directive pointing the real source
 * @param {string} timestamp
 */
FullSignalK.prototype.updateSource = function(context, source, timestamp) {
  // create the source, if this is the first time we've seen it
  if(!this.sources[source.label]) {
    this.sources[source.label] = {};
    this.sources[source.label].label = source.label;
    this.sources[source.label].type = source.type;
  }

  // handle various different source types
  if(source.type === 'NMEA2000' || source.src) {
    handleNmea2000Source(this.sources[source.label], source, timestamp);
  } else if(source.type === 'NMEA0183' || source.sentence) {
    handleNmea0183Source(this.sources[source.label], source, timestamp);
    return
  } else {
    handleOtherSource(this.sources[source.label], source, timestamp);
  }
}

function handleNmea2000Source(labelSource, source, timestamp) {
  let existing = labelSource[source.src]

  if ( !existing ) {
    existing = labelSource[source.src] = {
      n2k: {
        pgns:{}
      }
    }
  }

  _.assign(existing.n2k, source)
  delete existing.n2k.pgn
  delete existing.n2k.label
  delete existing.n2k.instance
  delete existing.n2k.type
  
  if(source.instance && !labelSource[source.src][source.instance]) {
    labelSource[source.src][source.instance] = {}
  }
  labelSource[source.src].n2k.pgns[source.pgn] = timestamp
}

function handleNmea0183Source(labelSource, source, timestamp) {
  var talker = source.talker || 'II';
  if(!labelSource[talker]) {
    labelSource[talker] = {
      talker: talker,
      sentences: {}
    };
  }
  labelSource[talker].sentences[source.sentence] = timestamp
}

function handleOtherSource(sourceLeaf, source, timestamp) {
  sourceLeaf.timestamp = timestamp;
}

function addValues(context, contextPath, source, timestamp, pathValues) {
  pathValues.forEach(function(pathValue) {
    addValue(context, contextPath, source, timestamp, pathValue);
  });
}

/**
 * Adds a value to the context.
 *
 * @param {Object} context
 * @param {string} contextPath ex: vessels.urn:mrn:imo:mmsi:200000000
 * @param {Object} source description of where the data came from ex: {"label":"aLabel","type":"NMEA2000","pgn":130312,"src":"41","instance":"5"}
 * @param {string} timestamp time of the data point (in ISO format)
 * @param {Object} pathValue the path and value ex: {"path":"environment.inside.engineRoom.temperature","value":70}
 */
function addValue(context, contextPath, source, timestamp, pathValue) {
  // guardian for no path or value
  if (_.isUndefined(pathValue.path) || _.isUndefined(pathValue.value)) {
    console.error("Illegal value in delta:" + JSON.stringify(pathValue));
    return;
  }
  // if the added path is the root, just do a merge with the context and we're done
  if (pathValue.path.length === 0) {
    _.merge(context, pathValue.value)
    return
  }

  const splitPath = pathValue.path.split('.');
  // traverse down the context to find the object that this path references,
  // possibly creating elements as we go
  let valueLeaf = splitPath.reduce(function(previous, pathPart, i) {
    // if required, create a new nested object for this path component
    if (!previous[pathPart]) {
      previous[pathPart] = {};
    }

    // if we're at the last path component and we don't have a value yet, then
    // determine if we need to add the meta key to describe the data type for
    // this path
    if (i === splitPath.length-1 && typeof previous[pathPart].value === 'undefined') {
      let meta = signalkSchema.getMetadata(contextPath + '.' + pathValue.path)
      if (meta) {
        //ignore properties from keyswithmetadata.json
        meta = JSON.parse(JSON.stringify(meta))
        delete meta.properties

        _.assign(meta, previous[pathPart].meta)
        previous[pathPart].meta = meta
      }
    }

    // return the object as we traverse downwards
    return previous[pathPart];
  }, context);

  // if there are already multiple values, then add the new value as a nested
  // element indexed by the source (see doc/data_model_multiple_values.html)
  if (valueLeaf.values) {
    const sourceId = getId(source);

    // add the new child node, if this is the first time we've observed this
    // value from this source
    if (!valueLeaf.values[sourceId]) {
      valueLeaf.values[sourceId] = {};
    }

    // do the assignment
    assignValueToLeaf(pathValue.value, valueLeaf.values[sourceId]);
    valueLeaf.values[sourceId].timestamp = timestamp;
    setMessage(valueLeaf.values[sourceId], source);
  }
  // special case for when we've got an existing source and this is the first
  // time we've seen this path from a new source
  else if(typeof valueLeaf.value != "undefined" && valueLeaf['$source'] != getId(source)) {
    // first move the existing value to a nested element inside values
    let sourceId = valueLeaf['$source'];
    let tmp = {};
    copyLeafValueToLeaf(valueLeaf, tmp);
    valueLeaf.values = {};
    valueLeaf.values[sourceId] = tmp;
    valueLeaf.values[sourceId].timestamp = valueLeaf.timestamp;

    // second, add the new value
    sourceId = getId(source);
    valueLeaf.values[sourceId] = {};
    assignValueToLeaf(pathValue.value, valueLeaf.values[sourceId]);
    valueLeaf.values[sourceId].timestamp = timestamp;
    setMessage(valueLeaf.values[sourceId], source);
  }

  // do the final assignment into the context
  assignValueToLeaf(pathValue.value, valueLeaf);
  valueLeaf['$source'] = getId(source);
  valueLeaf.timestamp = timestamp;
  setMessage(valueLeaf, source);
}

function copyLeafValueToLeaf(fromLeaf, toLeaf) {
  _.assign(toLeaf, _.omit(fromLeaf, ['$source', 'timestamp', 'meta']));
}

function assignValueToLeaf(value, leaf) {
  leaf.value = value;
}

function setMessage(leaf, source) {
  if(!source) {
    return;
  }
  if(source.pgn) {
    leaf.pgn = source.pgn;
    delete leaf.sentence;
  }
  if(source.sentence) {
    leaf.sentence = source.sentence;
    delete leaf.pgn;
  }
}


module.exports = FullSignalK;
