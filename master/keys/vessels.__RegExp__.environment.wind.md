## /vessels/<RegExp>/environment/wind

*undefined*
Wind data.

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/environment/wind`
* Node: `wind`

### Source:
```
{
  "type": "object",
  "title": "wind",
  "description": "Wind data.",
  "properties": {
    "angleApparent": {
      "description": "Apparent wind angle, negative to port",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "rad"
    },
    "angleTrueGround": {
      "description": "True wind angle based on speed over ground, negative to port",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "rad"
    },
    "angleTrueWater": {
      "description": "True wind angle based on speed through water, negative to port",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "rad"
    },
    "directionChangeAlarm": {
      "description": "The angle the wind needs to shift to raise an alarm",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "rad"
    },
    "directionTrue": {
      "description": "The wind direction relative to true north",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "rad"
    },
    "directionMagnetic": {
      "description": "The wind direction relative to magnetic north",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "rad"
    },
    "speedTrue": {
      "description": "Wind speed over water (as calculated from speedApparent and vessel's speed through water)",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "m/s"
    },
    "speedOverGround": {
      "description": "Wind speed over ground (as calculated from speedApparent and vessel's speed over ground)",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "m/s"
    },
    "speedApparent": {
      "description": "Apparent wind speed",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "m/s"
    }
  }
}
```

---
