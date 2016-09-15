## /resources/regions/<RegExp>/feature/geometry

* Type: `null`
* Path: `/resources/regions/^urn:mrn:signalk:uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/feature/geometry`
* Node: `geometry`

### Source:
```
{
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
}
```

---
