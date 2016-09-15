## /vessels/<RegExp>/environment/inside

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/environment/inside`
* Node: `inside`

### Source:
```
{
  "type": "object",
  "properties": {
    "temperature": {
      "description": "Current inside air temperature",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "K"
    },
    "humidity": {
      "description": "Current inside air relative humidity",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "ratio"
    },
    "engineRoom": {
      "description": "Current engine room air temperature",
      "$ref": "#/definitions/objectWithTemperature"
    },
    "mainCabin": {
      "description": "Current main cabin air temperature",
      "$ref": "#/definitions/objectWithTemperature"
    },
    "refrigerator": {
      "description": "Current refrigerator temperature",
      "$ref": "#/definitions/objectWithTemperature"
    },
    "freezer": {
      "description": "Current freezer temperature",
      "$ref": "#/definitions/objectWithTemperature"
    },
    "heating": {
      "description": "Current heating temperature",
      "$ref": "#/definitions/objectWithTemperature"
    }
  }
}
```

---
