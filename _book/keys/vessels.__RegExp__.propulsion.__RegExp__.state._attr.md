## /vessels/<RegExp>/propulsion/<RegExp>/state/_attr

*undefined*
Filesystem specific data, e.g. security, possibly more later.

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/propulsion/(^[A-Za-z0-9]+$)/state/_attr`
* Node: `_attr`

### Source:
```
{
  "type": "object",
  "title": "_attr schema.",
  "description": "Filesystem specific data, e.g. security, possibly more later.",
  "properties": {
    "_mode": {
      "type": "integer",
      "title": "_mode schema.",
      "description": "Unix style permissions, often written in `owner:group:other` form, `-rw-r--r--`",
      "default": 644
    },
    "_owner": {
      "type": "string",
      "title": "_owner schema.",
      "description": "The owner of this resource.",
      "default": "self"
    },
    "_group": {
      "type": "string",
      "title": "_group schema.",
      "description": "The group owning this resource.",
      "default": "self"
    }
  }
}
```

---
