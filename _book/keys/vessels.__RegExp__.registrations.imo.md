## /vessels/<RegExp>/registrations/imo

The IMO number of the vessel.

* Type: `string`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/registrations/imo`
* Node: `imo`

### Example:
```
IMO 9074729
```

### Source:
```
{
  "type": "string",
  "description": "The IMO number of the vessel.",
  "pattern": "^IMO [0-9]{7,7}$",
  "example": "IMO 9074729",
  "maxLength": 11,
  "minLength": 11
}
```

---
