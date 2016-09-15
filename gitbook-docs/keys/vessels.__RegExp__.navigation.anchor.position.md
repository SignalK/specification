## /vessels/<RegExp>/navigation/anchor/position

*undefined*
The position in 3 dimensions

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/navigation/anchor/position`
* Node: `position`

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
    "longitude": {
      "type": "number",
      "description": "Longitude",
      "units": "deg",
      "example": 4.98765245
    },
    "latitude": {
      "type": "number",
      "description": "Latitude",
      "units": "deg",
      "example": 52.0987654
    },
    "altitude": {
      "type": "number",
      "description": "Altitude",
      "units": "m"
    }
  },
  "title": "position",
  "description": "The position in 3 dimensions"
}
```

---
