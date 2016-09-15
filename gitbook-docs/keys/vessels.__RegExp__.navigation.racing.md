## /vessels/<RegExp>/navigation/racing

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/navigation/racing`
* Node: `racing`

### Source:
```
{
  "type": "object",
  "properties": {
    "startLineStb": {
      "waypoint": {
        "description": "UUID of waypoint for starboard start mark",
        "type": "string"
      }
    },
    "startLinePort": {
      "waypoint": {
        "description": "UUID of waypoint for port start mark",
        "type": "string"
      }
    },
    "distanceStartline": {
      "type": "number",
      "description": "The current distance to the start line",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "m"
    },
    "timeToStart": {
      "description": "Time left before start",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "s"
    },
    "timePortDown": {
      "description": "Time to arrive at the start line on port, turning downwind",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "s"
    },
    "timePortUp": {
      "description": "Time to arrive at the start line on port, turning upwind",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "s"
    },
    "timeStbdDown": {
      "description": "Time to arrive at the start line on starboard, turning downwind",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "s"
    },
    "timeStbdUp": {
      "description": "Time to arrive at the start line on starboard, turning upwind",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "s"
    },
    "distanceLayline": {
      "type": "number",
      "description": "The current distance to the layline",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "m"
    }
  }
}
```

---
