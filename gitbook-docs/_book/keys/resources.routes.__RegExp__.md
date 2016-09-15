## /resources/routes/<RegExp>

A route, named with a UUID

* Type: `object`
* Path: `/resources/routes/^urn:mrn:signalk:uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$`
* Node: `^urn:mrn:signalk:uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$`

### Source:
```
{
  "type": "object",
  "description": "A route, named with a UUID",
  "properties": {
    "name": {
      "type": "string",
      "description": "Route's common name",
      "example": "Nelson Harbour to Adele Is"
    },
    "description": {
      "type": "string",
      "description": "A description of the route"
    },
    "distance": {
      "description": "Total distance from start to end",
      "type": "number",
      "units": "m"
    },
    "start": {
      "type": "string",
      "description": "The waypoint UUID at the start of the route"
    },
    "end": {
      "type": "string",
      "description": "The waypoint UUID at the end of the route"
    },
    "feature": {
      "title": "Feature",
      "description": "A Geo JSON feature object which describes the route between the waypoints",
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
          "title": "LineString",
          "properties": {
            "type": {
              "enum": [
                "LineString"
              ]
            },
            "coordinates": {
              "$ref": "#/definitions/lineString"
            }
          }
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
```

---
