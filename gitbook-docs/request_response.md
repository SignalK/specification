# Request/Response

## WebSockets and Other Full-duplex Protocols

The exact format of the message for a specific request is defined elsewhere in the specification.

A request should include the `context` when appropriate and must include a client generated `requestId`. The
`requestId` is a string and it must be a [version 4 UUID](https://tools.ietf.org/html/rfc4122.html#section-4.4). It
will always be included in any response to the request by the server.

For example, a request to PUT a value:

```json
{
  "context": "vessels.self",
  "requestId": "123345-23232-232323",
  "put": {
    "path": "electrical.switches.anchorLight.state",
    "value": 1
  }
}
```

The server will respond with a message which includes the `requestId`, `correlationId` if provided, and a `state`.

The `state` can be `PENDING` or `COMPLETED`.

When the state is `COMPLETED`, the message will contain a `statusCode` value. The `statusCode` will be any standard
HTTP code including the following.

- 200 - the request was successful
- 502 - something went wrong carrying out the request on the server side
- 400 - something is wrong with the client's request
- 504 - timeout on the server side trying to carry out the request
- 405 - the server does not support the request
- 401 - the request has not been applied because it lacks valid authentication credentials
- 403 - the client does not have permission to make the request

The message can optionally contain a `message`.

The response object may contain other objects depending on the specific request being made. For example, a response to
an authentication request could contain a `login` object.

```json
{
  "requestId": "123345-23232-232323",
  "state": "COMPLETED",
  "statusCode": 200,
  "login": {
    "token": "....."
  }
}
```

A server may respond to a request multiple times depending on how it processes the request.

When a server cannot process the request immediately, it will respond with the `state` PENDING:

```json
{
  "requestId": "123345-23232-232323",
  "state": "PENDING"
}
```

When processing is done, but it was not successful:

```json
{
  "requestId": "123345-23232-232323",
  "state": "COMPLETED",
  "statusCode": 502,
  "message": "Unable to contact the light"
}
```

When processing completed successfully:

```json
{
  "requestId": "123345-23232-232323",
  "state": "COMPLETED",
  "statusCode": 200
}
```

The state of a request can also be found by sending the following:

```json
{
  "requestId": "123345-23232-232323",
  "query": true
}
```

This will result in a reply like the examples above.

## HTTP

HTTP request use REST API semantics and the responses are similar to the `response` object used above.

One difference is that the `statusCode` value above is sent as the HTTP response code.

The response when a server successfully processes a login request synchronously:

HTTP response code 200
```json
{
  "state": "COMPLETED",
  "token": "eyJhbGciOiJIUzI1NiI...aQ8sN1XBAP8bt3tNBT1WiIttm3qM"
}
```

When a request is PENDING, an HTTP 202 (Accepted) code will be returned and the body will include an `href` to use to
check the status of the request:

HTTP response code 202

```json
{
  "state": "PENDING",
  "href": "/signalk/v1/api/actions/12567"
}
```

The contents of the response message when checking the status will include the values defined above for the `result`
object and may also include extra information related to the request.

For example, the result of a PUT request:

```json
{
   "state": "COMPLETED",
   "statusCode": 200
}
```
