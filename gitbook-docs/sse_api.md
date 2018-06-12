# SSE Protocol

### Introduction

[Server-sent events](https://html.spec.whatwg.org/multipage/server-sent-events.html) are a method for sending live updates from a server to a client. [JSON Merge Patches](https://tools.ietf.org/html/rfc7396) are a method of applying changes to a JSON object. Combined, these two technologies augment a REST JSON endpoint to behave in a realtime manner.

### Details

#### SSE API: /signalk/v1/api/

The SEE API operates on top of the [REST API](rest_api.md), but requires an `Accept: text/event-stream` header to be sent by the client.

Once a connection has been established, the API begins sending deltas as RFC7396 patch objects, in SSE format. Each successive update is then deeply merged with the pior state. The connection is kept open indefinitely (a "long poll").

"Keep-alive" messages are also sent perodically, to prevent connection timeouts. They may be ignored by clients.

### Example Implementation

This example will console.log a copy of the Signal K device state every time an update is received.

```js
import merge from 'lodash.merge';

const subscribe = (url, cb) => {
  let state = {};
  const stream = new EventSource(url);
  stream.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    state = merge(state, data);
    cb(state);
  });
  return stream;
};

subscribe(
  'https://demo.signalk.org/signalk/v1/api/',
  state => console.log('New state:', state)
);

```

### API Examples

#### Deep changes

The root sK object may be subscribed to (initial state truncated for clarity):

```
curl 'http://demo.signalk.org/signalk/v1/api/' -H 'Accept: text/event-stream' -H 'Connection: keep-alive'
```
```
# Initial data
data:{"vessels":{"urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d":{"electrical":{"batteries":{"1":{"voltage":{"meta":{"label":"Battery Voltage","units":"V","min":0,"max":15,"zones":[{"upper":10.5,"state":"alarm","message":"Fault: very low voltage"},{"lower":10.5,"upp ...

# Self update delta
data:{"vessels":{"urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d":{"electrical":{"batteries":{"1":{"voltage":{"value": 12.15,"timestamp": "2014-08-15T19:03:22.289"}}}}}}}

# Keep-alive event
event:keep-alive

# Other vessel update delta
data:{"vessels":{"urn:mrn:imo:mmsi:230325000":{"mmsi": "230325000","navigation": {"speedOverGround": {"value": 2.8}}}}}

# ...
# Connection stays open indefinitely
```

Compare this to a REST request for the same path:

```
curl 'http://demo.signalk.org/signalk/v1/api/'
```
```
{"vessels":{"urn:mrn:signalk:uuid:c0d79334-4e25-4245-8892-54e8ccc8021d":{"electrical":{"batteries":{"1":{"voltage":{"meta":{"label":"Battery Voltage","units":"V","min":0,"max":15,"zones":[{"upper":10.5,"state":"alarm","message":"Fault: very low voltage"},{"lower":10.5,"upp ...
```


#### Paths

Individual paths/contexts may be subscribed to:

```
curl 'http://demo.signalk.org/signalk/v1/api/vessels/123456789/navigation/speedThroughWater' -H 'Accept: text/event-stream' -H 'Connection: keep-alive'
```
```
data:{"value":2.55,"source":{"type":"NMEA0183","src":"VHW","label":"signalk-parser-nmea0183"},"timestamp":"2015-08-31T05:45:36.000Z"}

data:{"timestamp":"2015-08-31T05:45:37.000Z"}

event:keep-alive

data:{"value":2.21,"timestamp":"2015-08-31T05:45:38.000Z"}

data:{"source":{"label":"signalk-parser-nmea2000"}}

event:keep-alive
```

Compare this to a REST request for the same path:

```
curl 'http://demo.signalk.org/signalk/v1/api/vessels/123456789/navigation/speedThroughWater'
```
```
{"value":2.55,"source":{"type":"NMEA0183","src":"VHW","label":"signalk-parser-nmea0183"},"timestamp":"2015-08-31T05:45:36.000Z"}
```
