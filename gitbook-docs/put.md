# PUT Requests

PUT requestes are sent to a server to request a change to a value. For example, a client would use PUT to switch the anchor light on or off, change the heading of the autopilot, or set position of the anchor.

See [Request/Response](request_response.md) for more details on request/response in Signal K.

## Making a request to change a value
To change a value, a PUT request should be sent via HTTP or using a SignalK 'put' delta. 

The "source" field is optional. If a request is sent without the source and their is more than one source for the value, that will result in a  400 HTTP error response.

### via http
```
PUT http://localhost:3000/signalk/v1/api/vessels/self/steering/autopilot/target/headingTrue
{
  "value" = 1.52,
  "source": "actisense.204",
}
```

### via a delta
```
{
  "context": "vessels.self",
  "correlationId": "184743-434373-348483",
  "put": {
    "path": "steering.autopilot.target.headingTrue",
    "source": "actisense.204",
    "value": 1.52
  }
}
```
### HTTP Response when there's an error

HTTP response code 403:
JSON response body:
```
{
  "state": "COMPLETED",
  "result": 403
}
```

### HTTP Response to a successful PUT request

HTTP response code 200 (OK)
JSON response body:
```
{
  "state": "COMPLETED",
  "result": 202
}
```

### HTTP Response to a request that is being worked on asynchronously

The response in this case includes an optional `href` that can be used to check the status of the request.

HTTP response code 202 (Accepted)
JSON response body:
```
{
  "href": "/signalk/v1/actions/12567"
}
```

#### Response to `/signalk/v1/actions/12567` when the request has completed successfully 

```
{
   "context" : "vessels.self",
   "state": "COMPLETED"
   "result" : 200,
}
```

#### Response to `/signalk/v1/actions/12567` when the request has failed

```
{
   "context" : "vessels.self",
   "state": "COMPLETED"
   "result" : 502,
   "message": "Unable to reach device",
}
```

#### Response to `/signalk/v1/api/actions/12567` when the request is pending
(note that percentComplete is optional)
```
{
   "context" : "vessels.self",
   "state": "PENDING",
   "percentComplete": 0.45,
}
```

