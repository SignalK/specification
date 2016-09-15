## /vessels/<RegExp>/environment/water

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/environment/water`
* Node: `water`

### Source:
```
{
  "type": "object",
  "properties": {
    "temperature": {
      "description": "Current water temperature",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "K"
    },
    "salinity": {
      "description": "Water salinity",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "ratio"
    },
    "liveWell": {
      "description": "Current livewell temperature",
      "$ref": "#/definitions/objectWithTemperature"
    },
    "baitWell": {
      "description": "Current baitwell air temperature",
      "$ref": "#/definitions/objectWithTemperature"
    }
  }
}
```

---
