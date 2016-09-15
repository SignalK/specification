## /vessels/<RegExp>/registrations/national/<RegExp>

This regex pattern is used for validating the identifier for the registration

* Type: `null`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/registrations/national/(^[A-Za-z0-9_-]+$)`
* Node: `(^[A-Za-z0-9_-]+$)`

### Source:
```
{
  "description": "This regex pattern is used for validating the identifier for the registration",
  "properties": {
    "country": {
      "type": "string",
      "description": "The ISO 3166-2 country code.",
      "example": "NZ",
      "maxLength": 2,
      "minLength": 2
    },
    "registration": {
      "type": "string",
      "description": "The registration code",
      "example": "NZ654"
    },
    "description": {
      "type": "string",
      "description": "The registration description",
      "example": "New Zealand Part B recreational vessel"
    }
  }
}
```

---
