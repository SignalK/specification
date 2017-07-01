# Subscription Protocol

### Introduction

By default a Signal K server will provide a new WebSocket client with a delta stream of the `vessels.self` record, as updates are received from sources. E.g.
`/signalk/v1/stream` will provide the following delta stream, every time the log value changes .

```javascript
{
  "context": "vessels",
   "updates": [{
      "source": {
        "pgn": "128275",
        "device": "/dev/actisense",
        "timestamp": "2014-08-15-16:00:05.538",
        "src": "115"
      },
      "values": [
        {
          "path": "navigation.logTrip",
          "value": 43374
        },
        {
          "path": "navigation.log",
          "value": 17404540
        }]
     }
     ]
}
```
> Below we refer to WebSockets, but the same process works in the same way over any transport. E.g. for a raw TCP
> connection the connection causes the above message to be sent, and sending the subscribe messages will have the same
> effect as described here.

This can be a lot of messages, many you may not need, especially if `vessel.self` has many sensors, or other data sources. Generally you will want to subscribe to a much smaller range of data.

First you will want to unsubscribe from the current default (or you may have already connected with `ws://hostname/signalk/v1/stream?subscribe=none`). To unsubscribe all create an `unsubscribe` message with wildcards and send the message over the websocket connection:

```json
{
  "context": "*",
  "unsubscribe": [
    {
      "path": "*"
    }
  ]
}
```
To subscribe to the required criteria send a suitable subscribe message:

```json
{
  "context": "vessels.self",
  "subscribe": [
    {
      "path": "navigation.speedThroughWater",
      "period": 1000,
      "format": "delta",
      "policy": "ideal",
      "minPeriod": 200
    },
    {
      "path": "navigation.logTrip",
      "period": 10000
    }
  ]
}
```

* `path=[path.to.key]` is appended to the context to specify subsets of the context.
The path value can use the wildcard `*`. A wildcard in the middle of a path (`propulsion/*/oilTemperature`) allows any value for that part and a wildcard at the end (`propulsion/port/*`) matches all paths beginning with the specified prefix.

The following are optional, included above only for example as it uses defaults anyway:

* `period=[millisecs]` becomes the transmission rate, e.g. every `period/1000` seconds. Default=1000
* `format=[delta|full]` specifies delta or full format. Default: delta
* `policy=[instant|ideal|fixed]`. Default: ideal
 * `instant` means send all changes as fast as they are received, but no faster than `minPeriod`. With this policy the client has an immediate copy of the current state of the server.
 * `ideal` means use `instant` policy, but if no changes are received before `period`, then resend the last known
   values.eg send changes asap, but send the value every `period` millisecs anyway, whether changed or not.
 * `fixed` means simply send the last known values every `period`.
* `minPeriod=[millisecs]` becomes the fastest message transmission rate allowed, e.g. every `minPeriod/1000` seconds. This is only relevant for policy='instant' to avoid swamping the client or network.

You can subscribe to multiple data keys multiple times, from multiple apps or devices. Each app or device simply subscribes to the data it requires, and the server and/or client implementation may combine subscriptions to avoid duplication as it prefers on a per connection basis. At the same time it is good practice to open the minimum connections necessary, for instance one websocket connection shared bewteen an instrument panel with many gauges, rather then one websocket connection per gauge.

#### Multiple value handling in subscriptions

A subscription to a key is for all the updates to that key. If there are multiple sources generating data for that key the client will get all their updates.

If a client wants only the values of a single source it should subscribe to a path that includes the full path under `values` including the source reference key of the source. The source reference should be enclosed in square brackets:  `navigation.speedThroughWater.values[n2kFromFile.43]`. The client can retrieve the relevant data via REST API.

#### Single use, or intermittent data

When data is required once only, or upon request the `subscribe/unsubscribe` method should not be used. If the client is http capable the REST api is a good choice, or use `get/list/put` messages over websockets or tcp.

#### GET/PUT/LIST variants

The `get/list/put` messages work in the same way as their `GET/PUT` REST equivalents, returning a json result for the requested path, once only. They exist to allow REST like functionality for devices without HTTP capability.
```json
{
  "context": "vessels.self",
  "get": [
    {
      "path": "environment.depth.belowTransducer"
    }
  ]
}

```

```javascript
{
  "context": "vessels",
   "put": [{
      "source": {
        "pgn": "128275",
        "device": "/dev/actisense",
        "timestamp": "2014-08-15-16:00:05.538",
        "src": "115"
      },
      "values": [
        {
          "path": "navigation.logTrip",
          "value": 43374
        }]
     }
     ]
}
```


### Use Cases and Proposed Solutions

#### Local boat individual instruments

A gauge-type display for just one or a few data items for the 'self' vessel should be able to specify that it only wants
those items for the self vessel.

This can be achieved by a default WebSocket connection `/signalk/v1/stream?subcribe=none`, then sending a JSON message:

```json
{
  "context": "vessels.self",
  "subscribe": [
    {
      "path": "environment.depth.belowTransducer"
    },
    {
      "path": "navigation.speedThroughWater"
    }
  ]
}
```

The JSON format is also viable over a simple TCP or serial transport, and is therefore supported as the primary
subscription method.

#### Map display with all known vessel positions & directions, served over 3G cellular connection

```javascript
{
  "context": "vessels.*",
  "subscribe": [
    {
      "path": "navigation.position",
      "period": 120000,
      "policy": "fixed"
    },
    {
      "path": "navigation.courseOverGround",
      "period": 120000,
      "policy": "fixed"
    }
  ]
}
```

The result is a delta message of the Signal K data with just position and courseOverGround branches for all known vessels, sent every 2 minutes (120 seconds) even if no data has been updated.

#### Position of a certain vessel, immediately it changes, but once per minute at most

```javascript
{
  "context": "vessels.230029970",
  "subscribe": [
    {
      "path": "navigation.position",
      "minPeriod": 60000,
      "policy": "instant"
    }
  ]
}
```

The result will be delta position messages for vessel 230029970, broadcast whenever it changes, but with minimum
interval of 60 seconds. Messages are delayed to meet the minimum interval with newer messages overriding the previous
message in the buffer.
