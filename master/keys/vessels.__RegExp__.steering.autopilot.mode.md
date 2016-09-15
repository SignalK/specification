## /vessels/<RegExp>/steering/autopilot/mode

Operational mode

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/steering/autopilot/mode`
* Node: `mode`

### Source:
```
{
  "type": "object",
  "description": "Operational mode",
  "properties": {
    "value": {
      "type": "string",
      "enum": [
        "powersave",
        "normal",
        "accurate"
      ]
    },
    "source": {
      "description": "Source of this data",
      "$ref": "../definitions.json#/definitions/source"
    },
    "timestamp": {
      "description": "Timestamp of the last update to this data",
      "$ref": "../definitions.json#/definitions/timestamp"
    }
  }
}
```

---
