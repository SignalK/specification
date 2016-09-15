## /vessels/<RegExp>/environment/outside

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/environment/outside`
* Node: `outside`

### Source:
```
{
  "type": "object",
  "properties": {
    "temperature": {
      "description": "Current outside air temperature",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "K"
    },
    "dewPointTemperature": {
      "description": "Current outside dew point temperature",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "K"
    },
    "apparentWindChillTemperature": {
      "description": "Current outside apparent wind chill temperature",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "K"
    },
    "theoreticalWindChillTemperature": {
      "description": "Current outside theoretical wind chill temperature",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "K"
    },
    "heatIndexTemperature": {
      "description": "Current outside heat index temperature",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "K"
    },
    "pressure": {
      "description": "Current outside air ambient pressure",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "Pa"
    },
    "humidity": {
      "description": "Current outside air relative humidity",
      "$ref": "../definitions.json#/definitions/numberValue",
      "units": "ratio"
    }
  }
}
```

---
