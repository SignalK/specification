Signal K Specification
======================
See the [latest published version](http://signalk.org/specification/).

This repository contains the (working) specification for Signal K, defined in
JSON Schema files, tests for the schema files and assorted JavaScript utilities
for working with Signal K delta and full JSON data as well as validation
utilities.

[![Build Status](https://travis-ci.org/SignalK/specification.svg?branch=master)](https://travis-ci.org/SignalK/specification) [![Slack Chat](https://img.shields.io/badge/Chat-Slack-ff69b4.svg "Join us and help develop Signal K. Anyone is welcome!")](http://slack-invite.signalk.org/)

Signal K
--------

The Free and Open Source universal marine data exchange

Signal K is about publishing a common modern and open data format for marine
use. A format for the modern boat, compatible with NMEA, friendly to WiFi,
cellphones, tablets, and the Internet. A format available to everyone, where
anyone can contribute.

Find out more at [signalk.org](http://signalk.org). Then join the mailinglist
by sending an email to signalk+subscribe@googlegroups.com or follow the
discussion via the Signal K Google Groups forum.


Usage
-----

The `master` branch contains the latest version of the Schema. When making
changes, please clone this repo to your local machine and set up a new branch
(`git checkout -b branch_name`). Send in a pull request for every change, put
it up for discussion in the mailing list and then (when a consensus has been
reached) merge it into `master`.

The `gh-pages` branch contains the currently published version of the schema
and specification. Documentation is generated with Gitbook and published at
http://signalk.org/specification/master/. Documentation is published on the web
with a single npm command:

```
$ npm run docs:publish
```

See below for details.

Gitbook Documentation
---------------------

The documentation .md sources are at
https://github.com/SignalK/specification/tree/master/gitbook-docs.

Requires separate installation of `ebook-convert`, see
https://toolchain.gitbook.com/ebook.html.

- `npm run docs:serve` for local preview
- `npm run docs:all` to generate locally
- `npm run docs:publish` to publish in gh-pages.

The changelog in the documentation is generated based on Github Pull Requests. For things to show up in the changelog you MUST USE PRs! Rewording is possible by rewriting PR titles.

Validation
----------

Validation against Signal K schema can be done
- with a command line validator accepting JSON from stdin
- by explicitly calling validate packaged as an npm module
- by using a Chai assertion, available in the npm module

```
cat test/data/full-invalid/vessel-mmsi_bad.json | bin/validate.js
{
  "errors": [
    {
      "message": "String does not match pattern: ^[2-7][0-9]{8}$",
      "params" .....etc
```

```javascript
var validate = require('signalk-schema').validate;
var result = validate(msg);
  result.errors.forEach(function(error) {
    console.error(error.message + ':' + error.dataPath);
  });
```

```javascript
chai.use(require('signalk-schema').chaiModule);
tree.should.be.validSignalK;
```
