Signal K Specification
======================

This is the currently published version of the Signal K schema.

Usage
-----

The `master` branch contains the latest version of the Schema. When making
changes, please clone this repo to your local machine and set up a new branch
(`git checkout -b branch_name`). Send in a pull request for every change, put
it up for discussion in the mailing list and then (when a consensus has been
reached) merge it into `master`.

The `gh-pages` branch contains the currently published version of the Schema.
Once changes have been approved and merged into `master` and we are ready to
publish, checkout the `gh-pages` branch and then checkout the schema directory
from `master` on top of it:
```shell
git checkout gh-pages
git checkout master -- schemas/
git commit -m 'Copy schema from master'
git push
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

Signal K is about publishing a common modern and open data format for marine
use. A format for the modern boat, compatible with NMEA, friendly to WiFi,
cellphones, tablets, and the Internet. A format available to everyone, where
anyone can contribute.
