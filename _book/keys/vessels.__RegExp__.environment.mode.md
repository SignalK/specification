## /vessels/<RegExp>/environment/mode

Mode of the vessel based on the current conditions. Can be combined with navigation.state to control vessel signals eg switch to night mode for instrumentation and lights, or make sound signals for fog.

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/environment/mode`
* Node: `mode`

### Source:
```
{
  "type": "object",
  "description": "Mode of the vessel based on the current conditions. Can be combined with navigation.state to control vessel signals eg switch to night mode for instrumentation and lights, or make sound signals for fog.",
  "properties": {
    "value": {
      "enum": [
        "day",
        "night",
        "restricted visibility"
      ]
    },
    "timestamp": {
      "$ref": "../definitions.json#/definitions/timestamp"
    },
    "source": {
      "$ref": "../definitions.json#/definitions/source"
    }
  }
}
```

---
