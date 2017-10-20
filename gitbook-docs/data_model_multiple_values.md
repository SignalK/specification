# Multiple Values for a Key

There are two use cases for multiple data:

* Multiple instances of a common device - eg two engines or multiple batteries
* Multiple devices providing duplicate data - multiple values for the same Signal K key from different sensors, eg COG from both compass and gps or multiple depth sounders

## Multiple instances of a common device

Some parts of the Signal K schema are **device oriented**.

For example in electrical domain you have the concept of multiple batteries. Each battery has multiple, common quantities like voltage, current and temperature. Here we have chosen to organise the Signal K data model hierarchy by instance: multiple batteries are represented as for example `electrical.batteries.starter` and `electrical.batteries.house`. Then underneath that prefix you have the different properties and quantities.

This organisation allows a user interface to organise the individual readings in meaningful groups and you can query all the values related to that piece of equipment via REST API.

It maintains the primary requirement that a given data value have a fixed and unique uri, but gives flexibility in the structure and complexities of data.

The same device centric organisation is used in `propulsion` subschema, where the most common use case is having dual engine setup with `propulsion.port` and `propulsion.starboard`.

_The values `starter`, `house`, `port` and `starboard` are examples and not specified in the schema.
You are free to use application specific values within the regexp specified in the JSON schema._

###Multiple devices providing duplicate data

It is quite possible for a key value to come from more than one device. eg position (lat/lon) could come from several gps enabled devices, and multiple depth sounders are not uncommon. We need a consistent way to handle this.

All the incoming values may well be valid in their own context, and it is feasible that all of them may be wanted, for instance, displaying depth under each hull on a catamaran.

Hence discarding or averaging values is not a solution, we must provide a way to store multiple values for a single measurement.

Lets consider this for `courseOverGroundTrue`

If its the first value for the key, it becomes the default value and looks like this:

```json
{
  "self": "urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d",
  "version": "0.9.0",
  "vessels": {
    "urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d": {
      "uuid": "urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d",
      "navigation": {
        "courseOverGroundTrue": {
          "value": 3.615624078431453,
          "$source": "0183./dev/ttyUSB0.GP.RMC",
          "timestamp": "2017-04-03T06:14:04.451Z"
        }
      }
    }
  },
  "sources":{
    "0183": {
      "/dev/ttyUSB0": {
        "GP": {
          "RMC": {
            "label": "GPS-1",
            "type": "NMEA0183",
            "talker": "GP",
            "sentence": "$GPRMC,061404.000,A,4117.6201,S,17314.8224,E,0.38,354.82,030417,,*11",
            "timestamp": "2017-04-03T06:14:04.451Z"
          }
        }
      }
    }
  }
}
```
It has come from device `sources.0183./dev/ttyUSB0.GP`, where further details can be found.

If another value with different source arrives, we add the `values` attribute with and values are in there - if its our preferred source (from persistent config) we auto-switch to it, otherwise we just record it. It look like this:

```json
{
  "self": "urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d",
  "version": "0.9.0",
  "vessels": {
    "urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d": {
      "uuid": "urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d",
      "navigation": {
        "courseOverGroundTrue": {
          "value": 3.615624078431440,
          "$source": "0183./dev/ttyUSB0.GP.RMC",
          "timestamp": "2017-04-03T06:14:04.451Z"
        },
        "values":{
          "0183./dev/ttyUSB0.GP.RMC":{
            "value": 3.615624078431440,
            "$source": "0183./dev/ttyUSB0.GP.RMC",
            "timestamp": "2017-04-03T06:14:04.451Z"
          },
          "n2k./dev/ikommunicate.128267":{
            "value": 3.615624078431453,
            "$source": "n2k./dev/ikommunicate.128267",
            "timestamp": "2017-04-03T06:14:04.451Z"
          }
        }
      }
    }
  },
  "sources":{
    "0183": {
      "/dev/ttyUSB0": {
        "GP": {
          "RMC": {
            "label": "GPS-1",
            "type": "NMEA0183",
            "talker": "GP",
            "sentence": "$GPRMC,061404.000,A,4117.6201,S,17314.8224,E,0.38,354.82,030417,,*11",
            "timestamp": "2017-04-03T06:14:04.451Z"
          }
        }
      }
    },
    "n2k": {
      "/dev/ikommunicate": {
        "128267": {
          "label": "/dev/ikommunicate-128267",
          "type": "NMEA2000",
          "device": "/dev/actisense",
          "src": "115",
          "pgn": "128267"
          "timestamp": "2017-04-03T06:14:04.451Z"
        }
      }
    }
  }
}
```

### Update messages

When a client subscribes to `navigation.courseOverGroundTrue`, they recieve _all_ the values held. The update message does not include the `values` path, the case above looks like:


```json
{
  "context": "vessels.urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d",
  "updates": [{
    "source": {
      "label": "GPS-1",
      "type": "NMEA0183",
      "talker": "GP",
      "sentence": "$GPRMC,061404.000,A,4117.6201,S,17314.8224,E,0.38,354.82,030417,,*11",
      "timestamp": "2017-04-03T06:14:04.451Z"
    },
    "timestamp": "2017-04-03T06:14:04.451Z",
    "values": [{
      "path": "navigation.courseOverGroundTrue",
      "value": 3.615624078431440
    }]
  }, {
    "source": {
      "label": "/dev/ikommunicate-128267",
      "type": "NMEA2000",
      "device": "/dev/actisense",
      "src": "115",
      "pgn": "128267"
      "timestamp": "2017-04-03T06:14:04.451Z"
    },
    "timestamp": "2017-04-03T06:14:04.451Z",
    "values": [{
      "path": "navigation.courseOverGroundTrue",
      "value": 3.615624078431453
    }]
  }]
}
```

Individual updates can be distinguished by their source. 

If a client wants only the values of a specific source it should subscribe to a path that includes the full path under `values` including the source reference key of the source. The source reference should be enclosed in square brackets:  `navigation.courseOverGroundTrue.values[n2k./dev/ikommunicate.128267]`. The client can retrieve the relevant data via REST API.

**Note:** The exact format of the update message is affected by the subscription policy. A policy of `instant` will result in changes being sent immediately, so typically one item in `values` per update. A policy of `fixed` will result in periodic updates which may contain many items in `values`.

The update allows grouping `values` by `source`.

