# PUT Requests

PUT requestes are sent to a server to request a change to a value. For example, a client would use PUT to switch the anchor light on or off, change the heading of the autopilot, or set position of the anchor.

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
  "put": {
    "path": "steering.autopilot.target.headingTrue",
    "source": "actisense.204",
    "value": 1.52
  }
}
```

## The response to a request to change a value

The possible responses the server can make to this request.
* Permission denied
* The request is not supported
* There was an error processing the request
* The request was processed and the value has been changed
* The request has been received and is being worked on asynchronously

I will cover these for HTTP methods since there is no defined way to do request/response over ws or other protocols.

### HTTP response for permission denied

HTTP response code 403 (Forbidden)

### HTTP response when the request is not supported

HTTP response code 405 (Method Not Allowed)

### HTTP response when there is an error processing the request

HTTP response codes:
 400 (something wrong with the client's request) 
 502 (something went wrong carrying out the request on the server side)
 504 (timeout on the server side trying to carry out the request

JSON response body:
```
{
  "state": "COMPLETED",
  "message": "Unable to reach device"
}
```

### HTTP Response to a successful PUT request

HTTP response code 200 (OK)
JSON response body:
```
{
  "state": "COMPLETED",
}
```

### HTTP Response to a request that is being worked on asynchronously

The response in this case includes an optional `href` that can be used to check the status of the request.

HTTP response code 202 (Accepted)
JSON response body:
```
{
  "state":"PENDING",
  "action": {
    "id":12567,
    "href": "/signalk/v1/api/actions/12567"
   }
}
```

#### Response to `/signalk/v1/api/actions/12567` when the request has completed successfully 

```
{
   "context" : "vessels.self",
   "path" : "steering.autopilot.target.headingTrue",
   "source": "actisense.204",
   "user": "john@smith.com",
   "requestedValue" : 1.57,
   "startTime" : "2018-02-27T20:59:21.868Z",
   "id" : 12567,
   "endTime" : "2018-02-27T20:59:41.871Z",
   "state": "COMPLETED"
   "result" : "SUCCESS"
}
```

#### Response to `/signalk/v1/api/actions/12567` when the request has failed

```
{
   "context" : "vessels.self",
   "path" : "steering.autopilot.target.headingTrue",
   "source": "actisense.204",
   "user": "john@smith.com",
   "requestedValue" : 1.57,
   "startTime" : "2018-02-27T20:59:21.868Z",
   "id" : 12567,
   "endTime" : "2018-02-27T20:59:41.871Z",
   "state": "COMPLETED"
   "result" : "FAILURE",
   "message": "Unable to reach device"
}
```

#### Response to `/signalk/v1/api/actions/12567` when the request is pending
(note that percentComplete is optional)
```
{
   "context" : "vessels.self",
   "path" : "steering.autopilot.target.headingTrue",
   "source": "actisense.204",
   "user": "john@smith.com",
   "requestedValue" : 1.57,
   "startTime" : "2018-02-27T20:59:21.868Z",
   "id" : 12567,
   "state": "PENDING",
   "percentComplete": 0.45
}
```

