## /vessels/<RegExp>/registrations/local/<RegExp>/description

The registration description

* Type: `string`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/registrations/local/(^[A-Za-z0-9_-]+$)/description`
* Node: `description`

### Example:
```
Nelson Coast Guard Membership
```

### Source:
```
{
  "type": "string",
  "description": "The registration description",
  "example": "Nelson Coast Guard Membership"
}
```

---
