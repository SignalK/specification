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