## /vessels/<RegExp>/environment/current/setMagnetic

The direction component of the water current vector referenced to magnetic north

* Type: `number`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/environment/current/setMagnetic`
* Node: `setMagnetic`

### Example:
```
131.22
```

### Source:
```
{
  "type": "number",
  "description": "The direction component of the water current vector referenced to magnetic north",
  "example": 131.22,
  "units": "rad"
}
```

---
