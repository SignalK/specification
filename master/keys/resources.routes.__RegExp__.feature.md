## /resources/routes/<RegExp>/feature

*undefined*
A Geo JSON feature object which describes the route between the waypoints

* Type: `null`
* Path: `/resources/routes/^urn:mrn:signalk:uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/feature`
* Node: `feature`

### Source:
```
{
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
}
```

---
