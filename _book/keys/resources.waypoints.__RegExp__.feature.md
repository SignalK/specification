## /resources/waypoints/<RegExp>/feature

*undefined*
A Geo JSON feature object

* Type: `null`
* Path: `/resources/waypoints/^urn:mrn:signalk:uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/feature`
* Node: `feature`

### Source:
```
{
  "title": "Feature",
  "description": "A Geo JSON feature object",
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
      "title": "Point",
      "properties": {
        "type": {
          "enum": [
            "Point"
          ]
        },
        "coordinates": {
          "description": "A single position, in x,y order (Lon, Lat)",
          "type": "array",
          "minItems": 2,
          "items": [
            {
              "type": "number"
            },
            {
              "type": "number"
            }
          ],
          "additionalItems": false
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
