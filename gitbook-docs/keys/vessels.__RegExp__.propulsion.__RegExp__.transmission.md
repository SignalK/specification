## /vessels/<RegExp>/propulsion/<RegExp>/transmission

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/propulsion/(^[A-Za-z0-9]+$)/transmission`
* Node: `transmission`

### Source:
```
{
  "type": "object",
  "properties": {
    "gear": {
      "type": "object",
      "properties": {
        "value": {
          "enum": [
            "Forward",
            "Neutral",
            "Reverse",
            "Fault"
          ]
        }
      }
    },
    "gearRatio": {
      "description": "Gear ratio, engine rotations per propeller shaft rotation",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "ratio"
    },
    "oilTemperature": {
      "description": "Oil temperature",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "K"
    },
    "oilPressure": {
      "description": "Oil pressure",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "Pa"
    }
  }
}
```

---
