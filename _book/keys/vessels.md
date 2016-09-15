## /vessels

A wrapper object for vessel objects, each describing vessels in range, including this vessel.

* Type: `object`
* Path: `/vessels`
* Node: `vessels`

### Source:
```
{
  "type": "object",
  "description": "A wrapper object for vessel objects, each describing vessels in range, including this vessel.",
  "patternProperties": {
    "(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\\+?)[0-9]{4,})$": {
      "description": "This regex pattern is used for validation of an MMSI or Signal K UUID identifier for the vessel. Examples: urn:mrn:imo:mmsi:230099999 urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d",
      "$ref": "vessel.json#"
    }
  }
}
```

---
