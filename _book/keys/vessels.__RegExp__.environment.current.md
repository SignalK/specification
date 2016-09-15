## /vessels/<RegExp>/environment/current

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/environment/current`
* Node: `current`

### Source:
```
{
  "type": "object",
  "required": [
    "timestamp",
    "$source"
  ],
  "properties": {
    "timestamp": {
      "$ref": "#/definitions/timestamp"
    },
    "$source": {
      "$ref": "#/definitions/sourceRef"
    },
    "_attr": {
      "$ref": "#/definitions/_attr"
    },
    "meta": {
      "$ref": "#/definitions/meta"
    },
    "pgn": {
      "type": "number"
    },
    "sentence": {
      "type": "string"
    },
    "drift": {
      "type": "number",
      "description": "The speed component of the water current vector",
      "example": 3.12,
      "units": "m/s"
    },
    "setTrue": {
      "type": "number",
      "description": "The direction component of the water current vector referenced to true (geographic) north",
      "example": 123.45,
      "units": "rad"
    },
    "setMagnetic": {
      "type": "number",
      "description": "The direction component of the water current vector referenced to magnetic north",
      "example": 131.22,
      "units": "rad"
    }
  }
}
```

---
