In this file the different schema's in `/schemas` are documented: their purpose, what they contain (and should not contain), etc. 

`/schemas`
----------

- `definitions.json`: a file containing several re-usable type definitions. See http://spacetelescope.github.io/understanding-json-schema/structuring.html for more information.

- `signalk.json`: the "root" schema, containing the vessels array and pointers to the referenced schemas. When reading or parsing the schema in to a doc reader, this is your starting point. 

- `vessel.json`: a schema describing an individual vessel in the vessels array (in `signalk.json`).

- `groups/communication.json`: a schema describing the communications sub-object. Present in each vessel (see `vessel.json`).

- `groups/environmental.json`: a schema describing the environmental sub-object. Present in each vessel (see `vessel.json`).

- `groups/navigation.json`: a schema describing the navigation sub-object. Present in each vessel (see `vessel.json`).

- `vessels.json`: current version, for reference. Will be removed once TODO is completed. 