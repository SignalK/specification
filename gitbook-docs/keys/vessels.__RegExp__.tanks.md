## /vessels/<RegExp>/tanks

A tank, named by a unique identifier

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/tanks`
* Node: `tanks`

### Source:
```
{
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://signalk.github.io/specification/schemas/groups/tanks.json#",
  "description": "A tank, named by a unique identifier",
  "definitions": {
    "tankCollection": {
      "patternProperties": {
        ".*": {
          "name": "Tank",
          "properties": {
            "name": {
              "type": "string",
              "description": "The name of the tank. Useful if multiple tanks of a certain type are on board"
            },
            "type": {
              "type": "string",
              "description": "The type of tank",
              "enum": [
                "petrol",
                "fresh water",
                "greywater",
                "holding",
                "lpg",
                "diesel",
                "rum"
              ]
            },
            "capacity": {
              "description": "Total capacity",
              "type": "number",
              "units": "m3"
            },
            "currentLevel": {
              "description": "Level of fluid in tank 0-100%",
              "$ref": "../definitions.json#/definitions/numberValue",
              "units": "ratio"
            },
            "currentVolume": {
              "description": "Volume of fluid in tank",
              "units": "m3",
              "$ref": "../definitions.json#/definitions/numberValue"
            }
          }
        }
      }
    }
  },
  "properties": {
    "freshWater": {
      "$ref": "#/definitions/tankCollection"
    },
    "wasteWater": {
      "$ref": "#/definitions/tankCollection"
    },
    "blackWater": {
      "$ref": "#/definitions/tankCollection"
    },
    "fuelWater": {
      "$ref": "#/definitions/tankCollection"
    },
    "fuel": {
      "$ref": "#/definitions/tankCollection"
    },
    "lubrication": {
      "$ref": "#/definitions/tankCollection"
    },
    "liveWell": {
      "$ref": "#/definitions/tankCollection"
    }
  }
}
```

---
