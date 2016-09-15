## /vessels/<RegExp>/navigation/gnss/integrity

Integrity of the satellite fix

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/navigation/gnss/integrity`
* Node: `integrity`

### Source:
```
{
  "type": "object",
  "description": "Integrity of the satellite fix",
  "properties": {
    "value": {
      "type": "string",
      "enum": [
        "no Integrity checking",
        "Safe",
        "Caution",
        "Unsafe"
      ]
    }
  }
}
```

---
