## /vessels/<RegExp>/communication/crewNames

Array with the names of the crew

* Type: `array`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/communication/crewNames`
* Node: `crewNames`

### Source:
```
{
  "type": "array",
  "description": "Array with the names of the crew",
  "items": [
    {
      "type": "string",
      "description": "Name of a crew member of the vessel.",
      "example": "Catherine"
    }
  ]
}
```

---
