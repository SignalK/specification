## /vessels/<RegExp>/registrations/local

A local or state registration number of the vessel.

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/registrations/local`
* Node: `local`

### Source:
```
{
  "type": "object",
  "description": "A local or state registration number of the vessel.",
  "patternProperties": {
    "(^[A-Za-z0-9_-]+$)": {
      "description": "This regex pattern is used for validating the identifier for the registration",
      "properties": {
        "registration": {
          "type": "string",
          "description": "The registration code",
          "example": "NZCG-2345"
        },
        "description": {
          "type": "string",
          "description": "The registration description",
          "example": "Nelson Coast Guard Membership"
        }
      }
    }
  }
}
```

---
