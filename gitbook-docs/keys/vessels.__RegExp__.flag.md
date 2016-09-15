## /vessels/<RegExp>/flag

The country of ship registration, or flag state of the vessel

* Type: `string`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/flag`
* Node: `flag`

### Example:
```
NZ
```

### Source:
```
{
  "type": "string",
  "description": "The country of ship registration, or flag state of the vessel",
  "example": "NZ"
}
```

---
