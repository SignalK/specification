## /vessels/<RegExp>/sensors/<RegExp>

*undefined*
An object describing an individual sensor. It should be an object in vessel, named using a unique name or UUID

* Type: `object`
* Path: `/vessels/(^urn:mrn:(imo|signalk):(mmsi:[2-7][0-9]{8,8}|uuid:[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}))|^(http(s?):.*|mailto:.*|tel:(\+?)[0-9]{4,})$/sensors/(^[A-Za-z0-9]+$)`
* Node: `(^[A-Za-z0-9]+$)`

### Source:
```
{
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "https://signalk.github.io/specification/schemas/groups/sensors.json#",
  "description": "An object describing an individual sensor. It should be an object in vessel, named using a unique name or UUID",
  "title": "sensor",
  "properties": {
    "name": {
      "type": "string",
      "description": "The common name of the sensor"
    },
    "sensorType": {
      "type": "string",
      "description": "The datamodel definition of the sensor data. FIXME - need to create a definitions lib of sensor datamodel types"
    },
    "sensorData": {
      "type": "string",
      "description": "The data of the sensor data. FIXME - need to ref the definitions of sensor types"
    },
    "fromBow": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "The distance from the bow to the sensor location"
    },
    "fromCenter": {
      "$ref": "../definitions.json#/definitions/numberValue",
      "description": "The distance from the centerline to the sensor location, -ve to starboard, +ve to port"
    }
  }
}
```

---
