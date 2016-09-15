## /vessels/<RegExp>/electrical/batteries/<RegExp>/capacity

*undefined*

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/electrical/batteries/(^[A-Za-z0-9]+$)/capacity`
* Node: `capacity`

### Source:
```
{
  "type": "object",
  "title": "capacity",
  "properties": {
    "nominal": {
      "type": "number",
      "description": "The capacity of battery as specified by the manufacturer",
      "units": "J"
    },
    "actual": {
      "type": "number",
      "description": "The measured capacity of battery. This may change over time and will likely deviate from the nominal capacity.",
      "units": "J"
    },
    "remaining": {
      "type": "number",
      "description": "Capacity remaining in battery",
      "units": "J"
    },
    "dischargeLimit": {
      "type": "number",
      "description": "Minimum capacity to be left in the battery while discharging",
      "units": "J"
    },
    "stateOfCharge": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "State of charge, 1 = 100%",
      "units": "ratio"
    },
    "stateOfHealth": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "State of Health, 1 = 100%",
      "units": "ratio"
    },
    "dischargeSinceFull": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "Cumulative discharge since battery was last full",
      "units": "C"
    },
    "timeRemaining": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "Time to discharge to discharge limit at current rate",
      "units": "s"
    }
  }
}
```

---
