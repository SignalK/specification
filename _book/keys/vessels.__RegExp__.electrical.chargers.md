## /vessels/<RegExp>/electrical/chargers

* Type: `null`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/electrical/chargers`
* Node: `chargers`

### Source:
```
{
  "patternProperties": {
    "(^[A-Za-z0-9]+$)": {
      "type": "object",
      "title": "Charger",
      "description": "Battery charger",
      "allOf": [
        {
          "$ref": "#/definitions/dcQuantities"
        },
        {
          "properties": {
            "meta": {
              "allOf": [
                {
                  "$ref": "#/definitions/identity"
                },
                {
                  "properties": {
                    "chargingAlgorithm": {
                      "enum": [
                        "trickle",
                        "two stage",
                        "three stage",
                        "constant current",
                        "constant voltage",
                        "custom profile"
                      ]
                    },
                    "chargerMode": {
                      "enum": [
                        "standalone",
                        "master",
                        "slave",
                        "standby"
                      ]
                    }
                  }
                }
              ]
            },
            "mode": {
              "type": "object",
              "properties": {
                "value": {
                  "enum": [
                    "charging bulk",
                    "charging acceptance",
                    "charging overcharge",
                    "charging float",
                    "charging equalize",
                    "unknown",
                    "other"
                  ]
                },
                "timestamp": {
                  "$ref": "../definitions.json#/definitions/timestamp"
                },
                "source": {
                  "$ref": "../definitions.json#/definitions/source"
                }
              }
            }
          }
        }
      ]
    }
  }
}
```

---
