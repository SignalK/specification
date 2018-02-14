# Multiple Values for a Key

There are two use cases for multiple values for a single data point

* Multiple instances of a common device-e.g. two engines or multiple batteries.
* Multiple devices providing duplicate data-multiple values for the same Signal K key from different sensors. This is
  fairly common as most boats have multiple sensors capable of generating the same data (but not necessarily the same
  value). For example, course over ground (COG) may come from both a compass and GPS or a boat may be equipped with
  multiple depth sounders.

## Multiple Instances of a Common Device

Some parts of the Signal K schema are **device oriented**.

For example, many boats have multiple batteries. However each battery has multiple, common quantities like voltage,
current and temperature. In this case, it makes more sense for these values to be organized by instance. Therefore, in
the Signal K model, each battery bank is it’s own instance: for example `electrical.batteries.starter` and
`electrical.batteries.house`. Then beneath that prefix there are the various properties for each battery.

This organisation allows a user interface to organise the individual readings in meaningful groups and allows consumers
to query all the values related to that piece of equipment via the REST API. Furthermore, this structure maintains the
primary requirement that a given data value have a fixed and unique URI, but gives flexibility in the structure and
complexities of data.

The same device centric organisation is used within the `propulsion` subschema, to support the common use case of two
engines via `propulsion.port` and `propulsion.starboard`.

> The values `starter`, `house`, `port` and `starboard` are examples and not specified in the schema. You are free to
use application specific values within the regexp specified in the JSON schema.

## Multiple Devices Providing Duplicate Data

It is quite possible for a key value to come from more than one device. Many modern devices have a built in GPS
receiver and as a result on any given boat there may be several sources of position, speed over ground, and heading.
Multiple depth sounders are also common, often installed to port and starboard on monohull sailboats or in each hull of
a catamaran.

Given that the validity of these various sources of data may change in a context-specific way, Signal K provides a
mechanism for these values to be grouped together so that the consumer of the data may choose which value (or values)
to display[<sup>1</sup>](#fn_1).<a name="ln_1" id="ln_1"></a>

When dealing with multiple sources of data, it becomes important to know where the data is coming from. Signal K
provides a mechanism for that in the form of the `sources` top level object and references into that object via the
`$source` property. See [sources](sources.md) for detailed information on the structure of the `sources` object and how
it is referenced by the `$source` property.

The first source of a particular data point becomes the default source for that data and a normal Signal K object is
created.

[>]: # (mdpInsert ```json fsnip ../samples/full/docs-data_model_multiple_values.json --delKeys sources values)
```json
{
  "self": "urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d",
  "version": "0.9.0",
  "vessels": {
    "urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d": {
      "uuid": "urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d",
      "navigation": {
        "courseOverGroundTrue": {
          "value": 3.61562407843144,
          "$source": "ttyUSB0.GP",
          "timestamp": "2017-04-03T06:14:04.451Z"
        }
      }
    }
  }
}
```
[<]: #
It has come from device `sources.ttyUSB0.GP`, where further details can be found.

If another value with different source arrives, the Signal K server will add the `values` attribute with values from
both the first and second sources. The initial source‘s data will continue to populate the `value` property in the key.

[>]: # (mdpInsert ```json fsnip ../samples/full/docs-data_model_multiple_values.json)
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
          "$source": "ttyUSB0.GP",
          "timestamp": "2017-04-03T06:14:04.451Z",
          "values":{
            "ttyUSB0.GP.RMC":{
              "value": 3.615624078431440,
              "timestamp": "2017-04-03T06:14:04.451Z"
            },
            "n2k.ikommunicate.128267":{
              "value": 3.615624078431453,
              "timestamp": "2017-04-03T06:14:04.451Z"
            }
          }
        }
      }
    }
  },
  "sources":{
    "ttyUSB0": {
      "GP": {
        "sentences": {
          "RMC": "2017-04-03T06:14:04.451Z"
        }
      }
    },
    "ikommunicate": {
      "2": {
        "n2k": {
          "src": "2",
          "pgns": {
            "128267": "2017-04-03T06:14:05.221Z"
          }
        }
      }
    }
  }
}

```
[<]: #
### Multiple Values in Delta Messages

When a client subscribes to `navigation.courseOverGroundTrue`, they receive _all_ the values held. The update message
does not include the `values` path, the case above looks like:

[>]: # (mdpInsert ```json fsnip ../samples/delta/docs-data_model_multiple_values.json)
```json
{
  "context": "vessels.urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d",
  "updates": [
    {
      "source": {
        "label": "GPS-1",
        "type": "NMEA0183",
        "talker": "GP",
        "sentence": "RMC"
      },
      "timestamp": "2017-04-03T06:14:04.451Z",
      "values": [
        {
          "path": "navigation.courseOverGroundTrue",
          "value": 3.615624078431440
        }
      ]
    },
    {
      "source": {
        "label": "actisense",
        "type": "NMEA2000",
        "src": "115",
        "pgn": 128267
      },
      "timestamp": "2017-04-03T06:14:04.451Z",
      "values": [
        {
          "path": "navigation.courseOverGroundTrue",
          "value": 3.615624078431453
        }
      ]
    }
  ]
}
```
[<]: #
Individual updates can be distinguished by their source.

If a client wants only the values of a specific source it should subscribe to a path that includes the full path under
`values` including the source reference key of the source. The source reference should be enclosed in square brackets:
`navigation.courseOverGroundTrue.values[n2k./dev/ikommunicate.128267]`. The client can retrieve the relevant data via
REST API.

**Note:** The exact format of the update message is affected by the subscription policy. A policy of `instant` will
result in changes being sent immediately, so typically one item in `values` per update. A policy of `fixed` will result
in periodic updates which may contain many items in `values`.

The update allows grouping `values` by `source`.

------
<a id="fn_1" href="#ln_1">[1]</a> Specifying preferred sources is still an under-development enhancement to the Node
server.
