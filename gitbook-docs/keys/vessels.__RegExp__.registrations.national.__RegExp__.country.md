## /vessels/<RegExp>/registrations/national/<RegExp>/country

The ISO 3166-2 country code.

* Type: `string`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/registrations/national/(^[A-Za-z0-9_-]+$)/country`
* Node: `country`

### Example:
```
NZ
```

### Source:
```
{
  "type": "string",
  "description": "The ISO 3166-2 country code.",
  "example": "NZ",
  "maxLength": 2,
  "minLength": 2
}
```

---
