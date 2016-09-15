## /vessels/<RegExp>/sails/inventory/<RegExp>/name

An unique identifier by which the crew identifies a sail

* Type: `string`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/sails/inventory/(^[a-zA-Z0-9]+$)/name`
* Node: `name`

### Example:
```
J1
```

### Source:
```
{
  "type": "string",
  "description": "An unique identifier by which the crew identifies a sail",
  "example": "J1"
}
```

---
