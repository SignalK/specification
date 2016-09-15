## /vessels/<RegExp>/registrations

The various registrations of the vessel.

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/registrations`
* Node: `registrations`

### Example:
```
eg for a New Zealand Part B recreational vessel: 'NZ654'
```

### Source:
```
{
  "type": "object",
  "description": "The various registrations of the vessel.",
  "example": "eg for a New Zealand Part B recreational vessel: 'NZ654'",
  "properties": {
    "imo": {
      "type": "string",
      "description": "The IMO number of the vessel.",
      "pattern": "^IMO [0-9]{7,7}$",
      "example": "IMO 9074729",
      "maxLength": 11,
      "minLength": 11
    },
    "national": {
      "type": "object",
      "description": "The national registration number of the vessel.",
      "patternProperties": {
        "(^[A-Za-z0-9_-]+$)": {
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
      }
    },
    "local": {
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
    },
    "other": {
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
  }
}
```

---
