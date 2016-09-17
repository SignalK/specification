## /vessels/<RegExp>/electrical/ac

AC buses

* Type: `null`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/electrical/ac`
* Node: `ac`

### Source:
```
{
  "description": "AC buses",
  "patternProperties": {
    "(^[A-Za-z0-9]+$)": {
      "type": "object",
      "title": "AC bus",
      "properties": {
        "meta": {
          "$ref": "#/definitions/identity"
        },
        "phase": {
          "type": "object",
          "patternProperties": {
            "(single)|([A-C])": {
              "$ref": "#/definitions/acQuantities"
            }
          }
        }
      }
    }
  }
}
```

---
