# Request/Response

## WS and other non-http protocols

The exact format of the message for a specific request is definted elsewhere in the specification.

A request should include the `context` when appropriate and may include a client generated `correlationId`. The `correlationId` is a string and its contents are defined by the client. It will always be included in any response to the request by the server.


For example. a request to PUT a value:
```json
{
  "context": "vessels.self",
  "correlationId": "184743-434373-348483",
  "put": {
    "path": "electrical.switches.anchorLight.state",
    "value": 1
  }
}
```

The server will respond with a message which includes the `requestId`, `correlationId` if provided, and a `state`.

The `state` can be `PENDING` or `COMPLETED`

When the state is `COMPLETED`, the message will contain a `result` value. The `result` will be any standard HTTP code including the folowing.

- 200 - the request was succesfull
- 502 - something went wrong carrying out the request on the server side
- 400 - something is wrong with the clients request
- 504 - timeout on the server side trying to carry out the request
- 405 - the server does not support the request
- 403 - the client does not have permission to make the request

The message can optionally contain a `message`

The response object may contain other objects depending on the specific request being made. For example, a response to auth request could contain a `login` object.

```json
{
  "context": "vessels.self",
  "requestId": "123345-23232-232323",
  "correlationId": "184743-434373-348483",
  "state": "COMPLETED",
  "result": 200,
  "login": {
       "token": "....." 
   }
}
```

A server may respond to a request multiple times depending on how it processes the request.

When a server cannot process the request immediately, it will respond with the `state` PENDING:
```json
{
  "context": "vessels.self",
  "requestId": "123345-23232-232323",
  "correlationId": "184743-434373-348483",
  "state": "PENDING"
}
```

When processing is done, but it was not succesfull:
```json
{
  "context": "vessels.self",
  "requestId": "123345-23232-232323",
  "correlationId": "184743-434373-348483",
  "state": "COMPLETED",
  "result": 502,
  "message": "Unable to contact the light"
}
```

When processing completed successfully:
```json
{
  "context": "vessels.self",
  "requestId": "123345-23232-232323",
  "correlationId": "184743-434373-348483",
  "state": "COMPLETED",
  "result": 200
}
```

The state of a request can also be found by sending the following:

```json
{
  "context": "vessels.self",
  "requestId": "123345-23232-232323",
  "query": true
}
```

This will result in a reply like the examples above.

## HTTP

HTTP request use REST api semantics and the reponses are similar to the `response` object used above.

One difference is that the `result` value above is sent as the HTTP response codes:

The response when a server succcesfully processes a login request synchronously:

HTTP response code 200
```json
{
  "state": "COMPLETED",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2UiOiIxMjM0LTQ1NjUzLTM0MzQ1MyIsImlhdCI6MTUzNjg4NDY5MSwiZXhwIjoxNTY4NDQyMjkxfQ.5wypdKin5Q-gsi9aQ8sN1XBAP8bt3tNBT1WiIttm3qM"
}
```

When a request is PENDING, an HTTP 202 (Acepted) code will be returned and the body will include an `href` to use to check the status of the request:

HTTP response code 202
```json
{
  "href": "/signalk/v1/api/actions/12567"  
}
```

The contents of message when checking the status will include the values defined aboe for the `result` object. And may also include extra information related to the request.

For example, the result of a PUT request:
```json
{
   "path" : "steering.autopilot.target.headingTrue",
   "source": "actisense.204",
   "user": "john@smith.com",
   "requestedValue" : 1.57,
   "startTime" : "2018-02-27T20:59:21.868Z",
   "endTime" : "2018-02-27T20:59:41.871Z",
   "state": "COMPLETED",
   "result": 200
}
```
