## /vessels/<RegExp>/environment/depth

*undefined*
Depth related data

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/environment/depth`
* Node: `depth`

### Source:
```
{
  "title": "depth",
  "type": "object",
  "description": "Depth related data",
  "properties": {
    "belowKeel": {
      "description": "Depth below keel",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "m"
    },
    "belowTransducer": {
      "description": "Depth below Transducer",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "m"
    },
    "belowSurface": {
      "description": "Depth from surface",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "m"
    },
    "transducerToKeel": {
      "description": "Depth from the transducer to the bottom of the keel",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "m"
    },
    "surfaceToTransducer": {
      "description": "Depth transducer is below the water surface",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "m"
    }
  }
}
```

---
