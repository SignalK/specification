## /vessels/<RegExp>/electrical/inverters/<RegExp>/mode

Mode of inverter

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/electrical/inverters/(^[A-Za-z0-9]+$)/mode`
* Node: `mode`

### Source:
```
{
  "type": "object",
  "description": "Mode of inverter",
  "properties": {
    "value": {
      "type": "string",
      "enum": [
        "idle",
        "inverting",
        "disabled",
        "standby",
        "faulted",
        "unknown",
        "other"
      ]
    },
    "timestamp": {
      "$ref": "../definitions.json#/definitions/timestamp"
    },
    "$source": {
      "$ref": "../definitions.json#/definitions/$source"
    }
  }
}
```

---
