## /resources/notes/<RegExp>/position

* Type: `object`
* Path: `/resources/notes/^urn:mrn:signalk:uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}$/position`
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
  }
}
```

---
