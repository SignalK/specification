# URLs and Ports

While Signal K is a transport-agnostic protocol, there are certain conventions that have been established for use on
the Web and by clients and servers using HTTP and WebSockets.

## Ports

The Signal K HTTP and WebSocket services SHOULD be found on the usual HTTP/S ports (80 or 443). The services SHOULD be
found on the same port, but may be configured for independent ports and MAY be configured for ports other than HTTP/S.

A Signal K server MAY offer Signal K over TCP or UDP, these services SHOULD be on port 8375[<sup>1</sup>](#fn_1).<a
name="ln_1" id="ln_1"></a>

If an alternate port is needed it SHOULD be an arbitrary high port in the range 49152–65535[<sup>2</sup>](#fn_2).<a
name="ln_2" id="ln_2"></a>

## URL Prefix

The Signal K applications start from the `/signalk` root. This provides some protection against name collisions with
other applications on the same server. Therefore the Signal K entry point will always be found by loading
`http(s)://«host»:«port»/signalk`.

------
<a id="fn_1" href="#ln_1">[1]</a> This has not been registered with IANA yet. It is the ASCII decimal code for SK.
<br>
<a id="fn_2" href="#ln_2">[2]</a> This is the private use section of IP ports specified as reserved by IANA.
