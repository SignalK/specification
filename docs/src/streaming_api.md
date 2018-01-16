# Streaming WebSocket API: /signalk/«version»/stream

Initiates a WebSocket connection that will start streaming the server’s updates as Signal K delta messages. You can
specify the contents of the strea by using the `subscribe` query parameter.

- ws://hostname/signalk/«version»/stream?subscribe=self
- ws://hostname/signalk/«version»/stream?subscribe=all
- ws://hostname/signalk/«version»/stream?subscribe=none

With no query parameter the default is `self`, which will stream the data related to the `self` object. `all` will
stream all the updates the server sees and `none` will stream only the heartbeat, until the client issues subscribe
messages in the WebSocket stream.

If a server does not support some streaming options listed in here it must respond with HTTP status code `501 Not
Implemented`.

See [Subscription Protocol](subscription_protocol.md) for more details.

## Connection Hello

Upon connection a 'hello' message is sent as follows:

```json
{
  "version": "1.1.2",
  "timestamp": "2015-04-13T01:13:50.524Z",
  "self": "123456789"
}
```
