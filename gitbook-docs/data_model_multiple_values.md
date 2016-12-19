# Multiple Values for a Key

There are two use cases for multiple data:
* Multiple instances of a common device - eg two engines or multiple batteries
* Multiple devices providing duplicate data - multiple values for the same Signal K key from different sensors, eg COG from both compass and gps or multiple depth sounders

## Multiple instances of a common device

Some parts of the Signal K schema are **device oriented**.

For example in electrical domain you have the concept of multiple batteries.
Each battery has multiple, common quantities like voltage, current and temperature.
Here we have chosen to organise the Signal K data model hierarchy by instance: multiple batteries are represented as for example `electrical.batteries.starter` and `electrical.batteries.house`. Then underneath that prefix you have the different properties and quantities.

This organisation allows a user interface to organise the individual readings in meaningul groups and you can query all the values related to that piece of equipment via REST API.
It maintains the primary requirement that a given data value have a fixed and unique uri, but gives flexibility in the structure and complexities of data.

The same device centric organisation is used in `propulsion` subschema, where the most common use case is having dual engine setup with `propulsion.port` and `propulsion.starboard`.

_The values `starter`, `house`, `port` and `starboard` are examples and not specified in the schema.
You are free to use application specific values within the regexp specified in the JSON schema._

###Multiple devices providing duplicate data

It is quite possible for a key value to come from more than one device. eg position (lat/lon) could come from several gps enabled devices, and multiple depth sounders are not uncommon. We need a consistent way to handle this.

All the incoming values may well be valid in their own context, and it is feasible that all of them may be wanted, for instance, displaying depth under each hull on a catamaran.

Hence discarding or averaging is not a solution, and since signalk is unable to derive the best way to handle multiple values it must always fall to a default action, with human over-ride when needed.


***
The solution presented below has flaws. See https://github.com/SignalK/specification/issues/48 for discussion.
***


In signal K we can leverage the above method and simply store all the devices in the tree under the main item, and have the main items `source` reference the options. Lets consider this for `courseOverGroundTrue`

If its the first value for the key, it becomes the default value and looks like this:

```json
{
  "vessels": {
    "self": {
      "navigation": {
        "courseOverGroundTrue": {
          "value": 102.29,
          "source": "vessels.self.sources.n2k.actisense-115-129026"
        }
      },
      "sources": {
        "n2k": {
          "actisense-115-129026": {
            "value": 102.29,
            "bus": "/dev/actisense",
            "timestamp": "2014-08-15-16: 00: 01.083",
            "src": "115",
            "pgn": "129026"
          }
        }
      }
    }
  }
}
```
It has come from device `vessels.self.sources.n2k.actisense-115-129026`, where further details can be found.

If another value with different source arrives, we add the source with a unique name, so both values are in there - if its our preferred source (from persistent config) we auto-switch to it, otherwise we just record it. It look like this:

```json
{
  "vessels": {
    "self": {
      "navigation": {
        "courseOverGroundTrue": {
          "timestamp": "2014-08-15-16: 00: 01.083",
          "value": 102.29,
          "source": "vessels.self.sources.n2k.actisense-115-129026"
        }
      },
      "sources": {
        "n2k": {
          "actisense-115-129026": {
            "value": 102.29,
            "bus": "/dev/actisense",
            "timestamp": "2014-08-15-16: 00: 01.083",
            "src": "115",
            "pgn": "129026"
          },
          "actisense-201-130577": {
            "value": 102.29,
            "bus": "/dev/actisense",
            "timestamp": "2014-08-15-16: 00: 00.085",
            "src": "201",
            "pgn": "130577"
          }
        }
      }
    }
  }
}
```

### Rules

Now simple rules can apply to obtain the default, or any specific value:

* The implementation must ensure that the `key.value` holds an appropriate value. This will be easy if there is only one, and will probably be user configured if more.
* If the `source` value is `string` then it is a reference key to the source object, and can be a relative or absolute signalk key.
* The `source` (as a reference string) also provides a mechanism to handle deprecated keys.
* If the `source` value is a `json object` then it holds meta data on the source of the value.
* Alternate sources must be discovered manually, or by implementation specific meta-data.

To see all the entries, use the REST api or subscribe to the parent object. A given device may choose to subscribe to a specific entry in the object, allowing multiple displays of the key, or users of the various values. The 'list' verb used in a query message can provide available keys.

###Unique names

The identifier for each device should be unique within the server, and possibly be constructed as follows:

    n2k: producerid-sourceid-pgn (producer id from server configuration, others from n2k data) - NOTE: will change, currently under discussion.
    nmea0183: producerid-talkerid-sentence (like n2k)
    signalk: any valid string matching regex [a-zA-Z0-9-]. eg alphabet, hyphens, and 0 to 9

(The nmea0183 talker id is not in the schema as I write this, it will be added shortly)
