## /vessels/<RegExp>/environment/current/setTrue

The direction component of the water current vector referenced to true (geographic) north

* Type: `number`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/environment/current/setTrue`
* Node: `setTrue`

### Example:
```
123.45
```

### Source:
```
{
  "type": "number",
  "description": "The direction component of the water current vector referenced to true (geographic) north",
  "example": 123.45,
  "units": "rad"
}
```

---
