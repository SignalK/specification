Signal K Specification
======================

[![Join the chat at https://gitter.im/SignalK/specification](https://badges.gitter.im/SignalK/specification.svg)](https://gitter.im/SignalK/specification?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This repository contains the (working) specification for Signal K, defined in
JSON Schema files.


Signal K
--------

The Free and Open Source universal marine data exchange

SignalK is about publishing a common modern and open data format for marine
use. A format for the modern boat, compatible with NMEA, friendly to WiFi,
cellphones, tablets, and the Internet. A format available to everyone, where
anyone can contribute.

Find out more at [signalk.org](http://signalk.org). Then join the mailinglist by sending an email
to signalk+subscribe@googlegroups.com or follow the discussion via the
Signal K Google Groups forum.


Usage
-----

The `master` branch contains the latest version of the Schema. When making
changes, please clone this repo to your local machine and set up a new branch
(`git checkout -b branch_name`). Send in a pull request for every change, put
it up for discussion in the mailing list and then (when a consensus has been
reached) merge it into `master`.

The `gh-pages` branch contains the currently published version of the Schema.
Once changes have been approved and merged into `master` and we are ready to
publish an update, checkout the `gh-pages` branch and then checkout the schema
directory from `master` on top of it:
```shell
git checkout gh-pages
git checkout master schemas/
git commit -m 'Copy schema from master'
git push
```
It will be published at http://signalk.github.io/specification automatically. 


Docson
------

You can browse the Schema using the supplied docson viewer. Just open
index.html from a local webserver (otherwise the XHR requests won't work) in
your preferred browser to get started. 


Validation
----------

Validation against SignalK schema can be done
- with a command line validator accepting JSON from stdin
- by explicitly calling validate packaged as an npm module
- by using a Chai assertion, available in the npm module

As you can see in the example below the current implementation assumes that the input is a subtree under vessels.mmsi path.

```
echo '{"navigation":{"courseOverGroundTru":{"value":70.1,"source":{"label":"","type":"NMEA2000","pgn":"130577","src":"160"},"timestamp":"2014-08-15-10:01:35.236"},"speedOverGround":{"value":0.01,"source":{"label":"","type":"NMEA2000","pgn":"130577","src":"160"},"timestamp":"2014-08-15-10:01:35.236"}}}' | bin/validate.js
Unknown property (not in schema):/vessels/230099999/navigation/courseOverGroundTru
```

```
var validate = require('signalk-schema').validate;
var result = validate(msg);
  result.errors.forEach(function(error) {
    console.error(error.message + ':' + error.dataPath);
  });
```

```
chai.use(require('signalk-schema).chaiModule);
tree.should.be.validSignalK;
```
