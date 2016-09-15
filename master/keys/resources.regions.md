## /resources/regions

*undefined*
A holder for regions, each named with UUID

* Type: `object`
* Path: `/resources/regions`
* Node: `regions`

### Source:
```
{
  "type": "object",
  "title": "region",
  "description": "A holder for regions, each named with UUID",
  "patternProperties": {
    "^urn:mrn:signalk:uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$": {
      "type": "object",
      "description": "A region of interest, each named with a UUID",
      "properties": {
        "geohash": {
          "description": "geohash of the approximate boundary of this region",
          "$ref:": "../definitions.json#/definitions/geohash"
        },
        "feature": {
          "title": "Feature",
          "description": "A Geo JSON feature object which describes the regions boundary",
          "required": [
            "geometry",
            "properties"
          ],
          "properties": {
            "type": {
              "enum": [
                "Feature"
              ]
            },
            "geometry": {
              "oneOf": [
                {
                  "title": "Polygon",
                  "properties": {
                    "type": {
                      "enum": [
                        "Polygon"
                      ]
                    },
                    "coordinates": {
                      "$ref": "#/definitions/polygon"
                    }
                  }
                },
                {
                  "title": "MultiPolygon",
                  "properties": {
                    "type": {
                      "enum": [
                        "MultiPolygon"
                      ]
                    },
                    "coordinates": {
                      "type": "array",
                      "items": {
                        "$ref": "#/definitions/polygon"
                      }
                    }
                  }
                }
              ]
            },
            "properties": {
              "type": [
                "object",
                "null"
              ],
              "description": "Additional data of any type",
              "additionalProperties": true
            },
            "id": {
              "FIXME": "may be there, type not known (string? number?)"
            }
          }
        },
        "timestamp": {
          "description": "Timestamp of the last update to this data",
          "$ref": "../definitions.json#/definitions/timestamp"
        },
        "source": {
          "description": "Source of this data",
          "$ref": "../definitions.json#/definitions/source"
        }
      }
    }
  }
}
```

---
