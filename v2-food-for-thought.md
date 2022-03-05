# Signal K version 2: Food for thought

The goal of this document is to provide a list of enhancements/additions/issues to be resolved/improved/added in Signal K version 2.

Version 2 implies being not backwards compatible, so it is ok to fix this with breaking changes. 

Version 2 also implies "the next big thing", so it is ok to put stuff here that could be added on top of v1, but is big enough to merit the "next big thing" thinking.

There are now (2020-11-14) no real plans as to when and how the next version should happen.

# Stuff

#### From a single data model to APIs with functionality

V1 was mostly about a single, hierarchical data model. In the end the hierarchy does not provide that much value, other than grouping the data for humans. The problem is that a single hierarchy is not expressive enough and we end up in endless discussions about should the engine alternator be part of the propulsion or the electrical system.

While the v1 data model is ok for the well known, generic marine data just a data model documented as JSON schema is not expressive enough to document well known operations. [OpenAPI](https://swagger.io/specification/) provides a system for describing http apis combining operation semantics with schemas for data. Work is under way embracing OpenAPI for describing v2 APIs. We are also moving from a single data & interaction model to a more modular APIs that allows more flexibility and fitting the API to the task.

#### Generic paths

There are some items in the v1 data model where the app / user needs the data without knowing the exact details. The most prominent example is courseGreatCircle/courseRhumbline where the app does not normally care which method the autopilot feature is using, just what the value is.

#### Tank type

Move the essentially arbitrary fluid type name out of the path and into meta information so that tank keys are just arbitrary ids and the type separately in the data model https://signalk.org/specification/1.5.0/doc/vesselsBranch.html#vesselsregexptankswastewaterregexptype


#### Document usage and interaction

Where keys/paths are intended for use by specific devices (e.g. autopilot -> steering.autopilot) the spec should provide clear guidance on how it is intended this path is used. Preferably with example use cases which include sequence diagrams.

#### Interdependent paths

The current SK data model is naive in assuming that all the different paths are independent. This is clearly not the case for GNSS data, where the fix quality, satellites in view and position and speed are all tied together. One might want to filter position data on fix quality for example. So we need a way to present several updates together. 

One way to do that would be to mandate that they are sent in one delta or that the latest data from related paths is always include. We should also make them accessible together via http, for example by allowing one to retrieve the complete logical update as delta.

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

#### Resources

Resources in the current version have basic information to define standard resource types but the specification is silent on how the `./resources` path can be used for non-standard resource types or even specifically collections of resources that would constitue a layer for visualisation on a map that would too dynamic to be considered a suitable map tiles source e.g. GRIB data, etc.

Create a ResourceCollection schema that would allow the definition of a collection of features and the style to apply to them for display.

e.g. In line with the current resource definitions align to GeoJSON...
```
{ 
  features: {
    type: "FeatureCollection",
    features: [ // array of GeoJSON features 
        { 
            type: "Point",
            geometry: { .. },
            properties: {
                style: {
                    fill: // CSS color definition,
                    stroke: // CSS color definition,
                    width: 5px,
                    icon: {
                        src: // path to icon,
                        size: [ x,y ],
                        anchor: [x,y ]
                    }
                }
            }
        },
        { 
            type: "LineString",
            geometry: { .. },
            properties: {
                styleref: "style1"
            }
        }        
    ]
  },
  styles: [
    { 
        id: "style1",
        style: {
            fill: // CSS color definition,
            stroke: // CSS color definition,
            width: 2px,
            dash: [2,4,2,4]
        }
    },
    {..}
  }]
} 
```
