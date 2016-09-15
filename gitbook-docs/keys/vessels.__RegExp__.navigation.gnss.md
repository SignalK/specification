## /vessels/<RegExp>/navigation/gnss

*undefined*
Global satellite navigation meta information

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/navigation/gnss`
* Node: `gnss`

### Source:
```
{
  "type": "object",
  "title": "gnss",
  "description": "Global satellite navigation meta information",
  "properties": {
    "source": {
      "description": "Source of this data",
      "$ref": "../definitions.json#/definitions/source"
    },
    "timestamp": {
      "description": "timestamp of the last update to this data",
      "$ref": "../definitions.json#/definitions/timestamp"
    },
    "methodQuality": {
      "type": "object",
      "description": "Quality of the satellite fix",
      "properties": {
        "value": {
          "type": "string",
          "enum": [
            "no GPS",
            "GNSS Fix",
            "DGNSS fix",
            "Precise GNSS",
            "RTK fixed integer",
            "RTK float",
            "Estimated (DR) mode",
            "Manual input",
            "Simulator mode",
            "Error"
          ]
        }
      }
    },
    "integrity": {
      "type": "object",
      "description": "Integrity of the satellite fix",
      "properties": {
        "value": {
          "type": "string",
          "enum": [
            "no Integrity checking",
            "Safe",
            "Caution",
            "Unsafe"
          ]
        }
      }
    },
    "satellites": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "Number of satellites"
    },
    "antennaAltitude": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "Altitude of antenna",
      "units": "m"
    },
    "horizontalDilution": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "Horizontal Dilution of Precision"
    },
    "positionDilution": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "Positional Dilution of Precision"
    },
    "geoidalSeparation": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "Difference between WGS84 earth ellipsoid and mean sea level"
    },
    "differentialAge": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "Age of DGPS data",
      "units": "s"
    },
    "differentialReference": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "ID of DGPS base station"
    }
  }
}
```

---
