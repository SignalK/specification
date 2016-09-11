
There are two use cases for multiple data:
* Multiple versions of a common device - eg two engines
* Multiple devices providing duplicate data - multiple values for the same signalk key from different sensors, eg COG from both compass and gps 

###Multiple versions of a common device
Consider the data point `temperature`. There are many versions of temperature: air, water, engineRoom, fridge, freezer, main cabin, etc. Some are well-known, and in common usage, some will be very vessel specific.

So we need a structure that provides a flexible way to hold lots of sub-items. The simple solution is an array of `temperature` objects however https://github.com/SignalK/specification/wiki/Arrays-are-Evil.

So instead we simply put the individual temperature objects in as children of `temperature`

```json
{
    "temperature": {
        "air": {
            "value": 26.7,
            "source": "vessels.self.sources.n2k.n2k1-12-0"
        },
        "water": {
            "value": 18.2,
            "source": "vessels.self.sources.n2k.n2k1-12-1"
        }
    }
}
```
And in `vessels.self.sources`
```json
{
   "n2k":{
        "n2k1-12-0": {
            "timestamp": "2014-08-15-16: 00: 00.081",
            "source": {
                "label": "Outside Ambient Masthead",
                "bus": "/dev/ttyUSB1"
            },
            "value":"dump the raw n2k data here"
        },
        "n2k1-12-1": {
            "timestamp": "2014-08-15-16: 00: 00.081",
            "value": 18.2,
            "source": {
                "label": "Water Temperature",
                "bus": "/dev/ttyUSB1"
            }
        },
        "n2k2-201-0": {
            "timestamp": "2014-08-15-16: 00: 00.081",
            "value": 66.7,
            "source": {
                "label": "Engine Room",
                "bus": "/dev/ttyUSB2"
            }
        }
    
}
```

This scheme allows for both well-known keys `temperature.air` and vessel specific `temperature.aftFreezer`. It is also valid in the following form, but makes it more difficult to refer to the source if it maps to multiple signalk keys (eg NMEA 0183 RMC sentence https://github.com/SignalK/specification/wiki/Samples---NMEA-0183-RMC):

```json
{
    "temperature": {
        "air": {
            "value": 26.7,
            "source": "n2k1-12-0",
            "n2k1-12-0": {
                "timestamp": "2014-08-15-16: 00: 00.081",
                "value": 26.7,
                "source": {
                    "label": "Outside Ambient Masthead",
                    "bus": "/dev/ttyUSB1"
                }
            }
        },
        "water": {
            "value": 18.2,
            "source": "n2k1-12-1",
            "n2k1-12-1": {
                "timestamp": "2014-08-15-16: 00: 00.081",
                "value": 18.2,
                "source": {
                    "label": "Water Temperature",
                    "bus": "/dev/ttyUSB1"
                }
            }
        }
    }
}
```
It maintains the primary requirement that a given data value have a fixed and unique uri, but gives flexibility in the structure and complexities of data. It also fulfils the requirement for discovery of data keys, vessel specific sources, and provides the ability to navigate the structure in a consistent progamatical way.

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