## /sources/<RegExp>/<RegExp>

* Type: `null`
* Path: `/sources/.*/.*`
* Node: `.*`

### Source:
```
{
  "anyOf": [
    {
      "properties": {
        "talker": {
          "description": "NMEA 0183 talker id, the GP in $GPRMC..",
          "type": "string"
        },
        "sentences": {
          "description": "NMEA 0183 sentences",
          "type": "object",
          "patternProperties": {
            "^[A-Z][A-Z][A-Z]$": {
              "$ref": "#/definitions/timestamp"
            }
          }
        },
        "n2k": {
          "type": "object",
          "properties": {
            "src": {
              "description": "NMEA 2000 bus",
              "type": "string"
            },
            "pgns": {
              "type": "object",
              "description": "NMEA 2000 pgn numbere",
              "patternProperties": {
                "[0-9]*": {
                  "$ref": "#/definitions/timestamp"
                }
              }
            },
            "uniqueId": {
              "type": "string",
              "description": "Unique id of the source device"
            },
            "deviceFunction": {
              "type": "number",
              "description": "NMEA 2000 Device Function code"
            },
            "deviceClass": {
              "type": "number",
              "description": "NMEA 2000 Device Class code"
            }
          }
        },
        "manufacturer": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "description": "Manufacturer numeric NMEA 2000 id"
            },
            "name": {
              "type": "string",
              "description": "Manufacturer name"
            },
            "productId": {
              "type": "string",
              "description": "Maunfacturer product Id"
            },
            "modelId": {
              "type": "string",
              "description": "Manufacturer model"
            },
            "softwareVersion": {
              "type": "string",
              "description": "Manufacturer software version"
            },
            "hardwareVersion": {
              "type": "string",
              "description": "Manufacturer hardware version"
            },
            "serialNumber": {
              "type": "string",
              "description": "Manufacturer serial number"
            }
          }
        }
      }
    },
    {
      "patternProperties": {
        ".*": {
          "properties": {}
        }
      }
    }
  ]
}
```

---
