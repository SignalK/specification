# Signal K version 2: Food for thought

The goal of this document is to provide a list of enhancements/additions/issues to be resolved/improved/added in Signal K version 2.

Version 2 implies being not backwards compatible, so it is ok to fix this with breaking changes. 

Version 2 also implies "the next big thing", so it is ok to put stuff here that could be added on top of v1, but is big enough to merit the "next big thing" thinking.

There are now (2020-11-14) no real plans as to when and how the next version should happen.

# Stuff

#### Generic paths

There are some items in the v1 data model where the app / user needs the data without knowing the exact details. The most prominent example is courseGreatCircle/courseRhumbline where the app does not normally care which method the autopilot feature is using, just what the value is.

#### Tank type

Move the essentially arbitrary fluid type name out of the path and into meta information so that tank keys are just arbitrary ids and the type separately in the data model https://signalk.org/specification/1.5.0/doc/vesselsBranch.html#vesselsregexptankswastewaterregexptype


#### Document usage and interaction

Where keys/paths are intended for use by specific devices (e.g. autopilot -> steering.autopilot) the spec should provide clear guidance on how it is intended this path is used. Preferably with example use cases which include sequence diagrams.

#### Rethink Full data model and object valued paths

The origin of Full data model is that we wanted a "place for everything" and a "single structure to hold it all". Some paths, like attitude, hold values that are objects. Some paths, mostly static data, like mmsi, are treated differently so that there is no source and timestamp information.

This poses multiple problems
- "one path for everything": the proverbial example of this is the engine alternator, that is part of the engine/propulsion system and the electrical system. This has resulted in endless discussions on where something should be. The root cause for this dilemma is the "single hierarchical view of everything"
- multiple values are clunky: the way a value can be retrieved is different if there is one or many sources for the path
- including timestamp and source values always makes the structure unwieldy
- "what is a value" problem: it is hard to decipher what is a value when looking at the full representation, as a path can be a prefix to lower structures and a path to a value and a path holding an object valued path at the same time
- including meta always makes the structure needlessly verbose and there is no method to exclude meta when retrieving the latest values

One way forward could be to create specific APIs for the different use cases like
- what paths have values?
- latest, priorities value for a path
- all values for a path
- associate subsystems with pathvalues and retrieve all paths that have values for a subsystem, like "all electrical values"; retrieve the subsystems available
- retrieve values by instance: instead of encoding the instance in the path add a separate field for it and instance lists & retrieve values by instance APIs
