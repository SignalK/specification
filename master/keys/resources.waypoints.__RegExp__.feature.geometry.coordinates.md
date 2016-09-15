## /resources/waypoints/<RegExp>/feature/geometry/coordinates

A single position, in x,y order (Lon, Lat)

* Type: `array`
* Path: `/resources/waypoints/^urn:mrn:signalk:uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/feature/geometry/coordinates`
* Node: `coordinates`

### Source:
```
{
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
```

---
