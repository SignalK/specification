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


Based on the above, the different schema's and their relationship to each other could be read like this:

```
definition.json
signalk.json
    |- vessel.json
        |- communication.json
        |- environmental.json
        |- navigation.json
	|- alarms.json
```

Basic principles
----------------

Signal K is a data model, and protocol for  data sharing. The internal implementation of Signal K in a device is the developers own choice, and need not follow the Signal K model structure, but the external messages must to ensure interoperability.

Adding to the Signal K schema
-----------------------------

* keys are globally unique.
* a key always has the same statically defined units. These are the appropriate SI units. 
* key names are camelCase, with lowercase first letter, java style.
* key names follow a 'more generic>>more specific' model. Hence a key name will be 'bearingActualTrue', rather than trueActualBearing. This allows bearing* or bearingActual*, and better sorting and IDE integration.
* if there are many bearing* variants, bearing* should become an object tree, eg bearing.actualTrue, for a cleaner model
* by default keys are optional. Very few keys are required, those are mainly in the topmost structures.
* adding your own custom keys is acceptable, but unless you publish them here, only you will be able to use them.
* favour the use of objects over arrays.

Using the Signal K model
------------------------

* all data is UTF-8
* the model is designed so that any incoming message can simply be merged into the currently held model since all keys are unique. 
* each message must start from the root element, but need only contain the keys of interest. eg a given message will be a filtered partial copy of the whole model. It may contain one key, or a whole branch of keys.
* if a device receives an unknown key it can be ignored by that device.
* each device may hold a full(eg server) or partial(eg autopilot) copy of the model, or may simply transmit its specific keys. eg(depth).
* any changes made locally (to a devices local model) need to be transmitted to other interested devices, so that their copies of the model remain synchronised.

Security
--------

Signal K does not define or apply security. Security is the responsibility of the implementation. Developers should be aware that a Signal K implementation may be accessible from the internet, and consider the effect sending misc messages into the system from an external source may have. At a minimum you should:

* not update your localBoat's critical navigational model with arbitrary data from outside of your vessel, eg on the internet. Trust your own instruments first!
* you should filter the information you allow onto the internet.
* you should consider if an external source is trustworthy before relying on their data (eg a waypoint list)


