Signal K Specification
======================

This repository contains the (working) specification for Signal K, defined in
JSON Schema files.


Usage
-----

The `master` branch contains the latest version of the Schema. When making
changes, please clone this repo to your local machine and set up a new branch
(`git checkout -b branch_name`). Send in a pull request for every change, put
it up for discussion in the mailing list and then (when a consensus has been
reached) merge it into `master`.

The `gh-pages` branch contains the currently published version of the Schema.
Once changes have been aproved and merged into `master` and we are ready to
publish an update, checkout the `gh-pages` branch and rebase it on top of
`master`: 
```shell
$ git checkout gh-pages
$ git rebase master
```
It will be published at http://signalk.github.io/specification automatically. 


Docson
------

You can browse the Schema using the supplied docson viewer. Just open
index.html from a local webserver (otherwise the XHR requests won't work) in
your preferred browser to get started. 


Signal K
--------

The Free and Open Source universal marine data exchange

SignalK is about publishing a common modern and open data format for marine
use. A format for the modern boat, compatible with NMEA, friendly to WiFi,
cellphones, tablets, and the Internet. A format available to everyone, where
anyone can contribute.

To get started, see the summary page and have a look through Navgauge Issue #4
to get a feel for where we started. Then join the mailinglist by sending an
email to signalk+subscribe@googlegroups.com or follow the discussion via the
Signal K Google Groups forum.
