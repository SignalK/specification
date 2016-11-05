#### Streaming WebSocket API: /signalk/v1/stream

Initiates a WebSocket connection that will start streaming the server's updates as Signal K delta messages. You can specify the contents of the stream by using a specific URL:

- ws://hostname/signalk/v1/stream?subscribe=self
- ws://hostname/signalk/v1/stream?subscribe=all
- ws://hostname/signalk/v1/stream?subscribe=none

With no query parameter the default is `self`, which will stream the data related to the `self` object. `all` will stream all the updates the server sees and `none` will stream only the heartbeat, until the client issues subscribe messages in the WebSocket stream.

If a server does not support some streaming options listed in here it must respond with http status code `501 Not Implemented`.

See [Subscription Protocol](subscription_protocol.html) for more details.

##### Connection Hello

Upon connection a 'hello' message is sent as follows:

```json
{
  "version": "1.1.2",
  "timestamp": "2015-04-13T01:13:50.524Z",
  "self": "123456789"
}
```

#### Streaming: TCP sockets

A signalk server MAY stream signalk-delta over a TCP socket.

When signalk-delta is streamed over a TCP socket:

1. The first character of each signalk-delta message MUST be the openning curly bracket (char(123), '{').
2. Each signalk-delta message MUST be terminated by a carriage return and new line (char(10) + char(13), '\r\n') sent after the final closing curly bracket (char(125), '}').
3. The server SHOULD send signalk-delta in a compact manner with any unnessesary white space removed.
4. The server MAY also send sentences for other protocals (e.g. NMEA0183) interleaved with the signalk-delta messages provided that sentences of the other protocal:
  a) Can not start with a curly bracket first character and 
  b) Are terminated by a carriage retrun and new line (char(10) + char(13), '\r\n')
5. The client MUST not assume that only signalk-delta will be sent over the socket.
