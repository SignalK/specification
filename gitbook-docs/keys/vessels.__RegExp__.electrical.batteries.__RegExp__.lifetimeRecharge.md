## /vessels/<RegExp>/electrical/batteries/<RegExp>/lifetimeRecharge

Cumulative charge recharged into battery over operational lifetime of battery

* Type: `number`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/electrical/batteries/(^[A-Za-z0-9]+$)/lifetimeRecharge`
* Node: `lifetimeRecharge`

### Source:
```
{
  "type": "number",
  "description": "Cumulative charge recharged into battery over operational lifetime of battery",
  "units": "C"
}
```

---
