## /vessels/<RegExp>/registrations/other

Other registration or permits for the vessel.

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/registrations/other`
* Node: `other`

### Source:
```
{
  "type": "object",
  "description": "Other registration or permits for the vessel.",
  "patternProperties": {
    "(^[A-Za-z0-9_-]+$)": {
      "description": "This regex pattern is used for validating the identifier for the registration",
      "properties": {
        "registration": {
          "type": "string",
          "description": "The registration code",
          "example": "DOC-2345"
        },
        "description": {
          "type": "string",
          "description": "The registration description",
          "example": "Tasmanian National Parks Access Permit 2015"
        }
      }
    }
  }
}
```

---
