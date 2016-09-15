## /vessels/<RegExp>/environment/depth/belowSurface/_attr/_mode

*undefined*
Unix style permissions, often written in `owner:group:other` form, `-rw-r--r--`

* Type: `integer`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/environment/depth/belowSurface/_attr/_mode`
* Node: `_mode`

### Source:
```
{
  "type": "integer",
  "title": "_mode schema.",
  "description": "Unix style permissions, often written in `owner:group:other` form, `-rw-r--r--`",
  "default": 644
}
```

---
