## /vessels/<RegExp>/steering/autopilot/state

Autopilot state

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/steering/autopilot/state`
* Node: `state`

### Source:
```
{
  "type": "object",
  "description": "Autopilot state",
  "properties": {
    "value": {
      "type": "string",
      "enum": [
        "on",
        "off",
        "alarm"
      ]
    },
    "source": {
      "description": "Source of this data",
      "$ref": "../definitions.json#/definitions/source"
    },
    "timestamp": {
      "description": "timestamp of the last update to this data",
      "$ref": "../definitions.json#/definitions/timestamp"
    }
  }
}
```

---
