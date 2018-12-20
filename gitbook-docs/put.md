# PUT Requests

PUT requests are sent to a server to request a change to a value. For example, a client would use PUT to switch the
anchor light on or off, change the heading of the autopilot, or set position of the anchor.

See [Request/Response](request_response.md) for more details on request/response in Signal K.

## Making a Request to Change a Value

To change a value, a PUT request should be sent via HTTP or using a Signal K __put__ delta.

The `source` field is optional. If a request is sent without the source and there is more than one source for the
value, the server should respond with a 400 (Bad Request) HTTP status code.

### Via HTTP
```
PUT http://localhost:3000/signalk/v1/api/vessels/self/steering/autopilot/target/headingTrue
{
  "value": 1.52,
  "source": "actisense.204",
}
```

### Via a Delta
```json
{
  "context": "vessels.self",
  "requestId": "123345-23232-232323",
  "put": [
		  {
		    "path": "steering.autopilot.target.headingTrue",
		    "source": "actisense.204",
		    "value": 1.52
		  }
	  ]
}
```

####NOTE####
The above PUT request (v1) uses an array to allow multiple keys in a single PUT. This is deprecated and strongly discouraged as it causes complex problems 
with the request/response semantics in cases of partial failures.  An alternative format has been added to the v1 specification where the  PUT request is:

```json
{
  "context": "vessels.self",
  "requestId": "123345-23232-232323",
  "put": {
		    "path": "steering.autopilot.target.headingTrue",
		    "source": "actisense.204",
		    "value": 1.52
		  }
}
```
In the v2 API the array format will be removed. Implementors are recommended to support both in the interim.

### HTTP Error Response

HTTP response code 403 (Forbidden)

JSON response body:
```json
{
  "state": "COMPLETED",
  "statusCode": 403
}
```

### HTTP Success Response

HTTP response code 200 (OK), sent if _all_ keys in the PUT array are successfully completed.

JSON response body:
```json
{
  "state": "COMPLETED",
  "statusCode": 200
}
```

### HTTP Success Response Indicating a Long Running Task

The response in this case includes an optional `href` that can be used to check the status of the request.

HTTP response code 202 (Accepted)

JSON response body:
```json
{
  "state": "PENDING",
  "href": "/signalk/v1/actions/12567"
}
```

A client may periodically GET the URL provided above to check the status of the request.

#### Response Indicating Successful Completion

```json
{
   "context": "vessels.self",
   "state": "COMPLETED",
   "statusCode": 200,
}
```

#### Responses Indicating Failure

HTTP response code 422 (Unprocessable Entity), sent if _any_ keys in the PUT array failed

```json
{
   "context": "vessels.self",
   "state": "COMPLETED",
   "statusCode": 422,
   "message": "Unprocessable Entity",
}
```
HTTP response codes 5** (Server errors), sent if _any_ keys in the PUT array failed

```json
{
   "context": "vessels.self",
   "state": "COMPLETED",
   "statusCode": 5**,
   "message": "Server error",
}
```

#### Response Indicating Process is in Progress

_Note:_ `progress` is optional and is specified as a ratio (a number from zero to one)

```json
{
   "context": "vessels.self",
   "state": "PENDING",
   "progress": 0.45
}
```
