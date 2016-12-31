#Signal K Data Model

Signal K defines two data formats, full and delta, for representing and transmitting data.

In additiong the 'sparse'
format is the same as the full format, but doesn't contain a full tree, just parts of the full tree.

## Full format

The simplest format is the full format, which is the complete Signal K data model  as a JSON string. Abbreviated for
clarity it looks like this:

```json
{"vessels":{"9334562":{"navigation":{"courseOverGroundTrue":{"value":11.9600000381},"courseOverGroundMagnetic":{"value":93.0000000000},"more":"a lot more data here...","wind":{"angleApparent":{"value":0.0000000000},"directionTrue": {"value":0.0000000000},"speedApparent":{"value":0.0000000000},"speedTrue": {"value":0.0000000000}}}}}}
```

Formatted for ease of reading:

```json
{
  "vessels": {
    "9334562": {
      "version": "0.1",
      "name": "motu",
      "mmsi": "2345678",
      "source": "self",
      "timezone": "NZDT",
      "navigation": {
        "state": {
          "value": "sailing",
          "source": "self",
          "timestamp": "2014-03-24T00:15:41Z"
        },
        "headingTrue": {
          "value": 23,
          "source": {
            "pgn": "128275",
            "device": "/dev/actisense",
            "src": "115"
          },
          "timestamp": "2014-03-24T00:15:41Z"
        },
        "more": "a lot more data here...",
        "roll": {
          "value": 0,
          "source": "self",
          "timestamp": "2014-03-24T00:15:41Z"
        },
        "rateOfTurn": {
          "value": 0,
          "source": "self",
          "timestamp": "2014-03-24T00:15:41Z"
        }
      }
    }
  }
}
```

The message is UTF-8 ASCII text, and the top-level attribute(key) is always "vessels". Below this level is a list of
vessels, identified by their MMSI number or a generated unique id. There may be many vessels, if data has been received
from AIS or other sources. The format for each vessel's data uses the same standard Signal K structure, but may not have
the same content, i.e. you won't have as much data about other vessels as you have about your own.

The values are always SI units, and always the same units for the same key. I.e. `speedOverGround` is always meters per
second, never knots, km/hr, or miles/hr. This means you never have to send 'units' with data, the units are specific for
a key, and defined in the data schema.

The ordering of keys is also not important, they can occur in any order. In this area Signal K follows normal JSON
standards.

The full format is useful for backups, and for populating a secondary device, or just updating all data, a kind of 'this
is the current state' message.

However sending the full data model will be wasteful of bandwidth and CPU, when the majority of data does not change
often. So we want to be able to send parts of the model (i.e. parts of the hierarchical tree).

### Sparse format

The sparse format is the same as the full format but only contains a limited part of the tree. This can be one or more
data values.


```json
{
  "vessels": {
    "self": {
      "navigation": {
        "position": {
          "latitude": -41.2936935424,
          "longitude": 173.2470855712
        }
      }
    }
  }
}
```

Mix and match of misc values are also valid:

```json
{
  "vessels": {
    "self": {
      "navigation": {
        "courseOverGroundTrue": {
          "value": 11.9600000381
        },
        "position": {
          "latitude": -41.2936935424,
          "longitude": 173.2470855712,
          "altitude": 0
          }
        }
      }
    }
  }
}
```

This mix of any combination of values means we don't need to create multiple message types to send different
combinations of data. Just assemble whatever you want and send it. When parsing an incoming message a device should skip
values it has no interest in, or doesn't recognise. Hence we avoid the problem of multiple message definitions for the
same or similar data, and we avoid having to decode multiple messages with fixed formats.

## Delta format

While building the reference servers and clients it was apparent that a third type of message format was useful. This
format specifically sends changes to the full data model. This was useful for a number of technical reasons, especially
in clients or sensors that did not hold a copy of the data model.

The format looks like this (pretty printed):

```json
{
    "context": "vessels.urn:mrn:imo:mmsi:234567890",
    "updates": [{
        "source": {
            "type": "NMEA2000",
            "src": "017",
            "pgn": 127488,
            "label": "N2000-01.017"
        },
        "timestamp": "2010-01-07T07:18:44Z",
        "values": [{
            "path": "propulsion.0.revolutions",
            "value": 16.341667
        }, {
            "path": "propulsion.0.boostPressure",
            "value": 45500.0
        }, {
            "path": "propulsion.0.tiltTrim",
            "value": 48
        }]
    }]
}
```

In more detail we have the header section:

```json
{
  "context": {
    "scope": "vessel",
    "id":"vessels.urn:mrn:imo:mmsi:234567890"
  },
  "updates": [
    ...data goes here...
  ]
}
```

A delta message can be recognised from the other types by the topmost level having `updates` property (which is
required).

- TODO: Should we include a `version` property to allow delta messages to be improved?
- TODO: Should we include a `$schema` property? This would imply the version as well.  

The `context` property determines the default scope to which the `updates` should be applied. If not specified, it
defaults to the vessel for the server sending the delta message (as determined by its `self` attribute).
The `scope` property may be one of following values (as specified by the `contextScope` enum):

|Scope|Description|Id|
|vessel|A single vessel|The unique identifier for the vessel.|

For compatibility with early servers, the `context` property may also be supplied as a `string` in the format
`vessels.{vesselId}`. This feature is deprecated and may be removed in later versions of this specification.

The `updates` holds an array of update objects, each of which has a header and an array of `values`.

```json
{
  "source": {
    "device": "/dev/actisense",
    "src": "115",
    "pgn": "128267"
  },
  "timestamp": "2014-08-15-16:00:00.081",
  "values": [
    {
      "path": "navigation.courseOverGroundTrue",
      "value": 2.971
    },
    {
      "path": "navigation.speedOverGround",
      "value": 3.85
    }
  ]
}
```

The header is comprised of all properties except the `values` array and defines common properties across all values.
This may include the original `source` of the update or a common `timestamp`.
The header may also include a `context` object property, overriding the default context in the message header;
this allows updates to multiple contexts to be sent in a single message (for example, updates to a fleet of vessels).
 
The `values` array is comprised of objects with two properties. The `path` property specifies which value in the context
is being update and the `value` property contains a new value which replaces the existing value.
The type of the `value` property must match the type defined for the `path`'s value; it may be a simple scale or a
more complex object.
  
If `source`, `timestamp`, or other header information is omitted, the receiving application should generate appropriate
values for those meta-properties in its data model. For example, it may use the identity of the sending server and the
timestamp it received the message.

An `update` has a single `source` value and it applies to each of the `values` items.
In cases where you can get data from only a single source the source may be omitted and the receiver may fill it in when multiplexing data from several sources.

### Alternative
`values` could be an object property containing the new values, for example:
 ```json
 {
   "values": {
     "navigation.courseOverGroundTrue": 2.971,
     "navigation.speedOverGround": 3.85
   }  
 }
 ```
## Message Integrity

Many messaging systems specify checksums or other forms of message integrity checking. In Signal K we assume a reliable
transport will guarantee a valid message. This is true of TCP/IP and some other transports but not always the case. For
other transports (eg RS232 serial) a specific extended data format will apply, which is suited to that transport. Hence
at the message level no checksum or other tests need to be made.

## Encoding/Decoding

The JSON message format is supported across most programming environments and can be handled with any convenient library.

On micro-controllers with limited RAM it is wise to read and write using streaming rather than hold the whole message in precious RAM.
There is an implementation of Signal K JSON streaming on an Arduino Mega (4K RAM) in the related [Freeboard project](https://github.com/rob42/FreeboardPLC_v1_2).
