# Security

## Communications Security

For privacy and data integrity REST and WebSockets communications should be secured with Transport Layer Security
(TLS). All communications over unsecure protocols like HTTP and WebSockets without TLS must be considered insecure even
with authentication and access control mechanisms in place.

## Authentication

Authentication for Signal K connections is based on a token carried in the message, or in a cookie or tokens carried in the HTTP
`Authorization` header for a HTTP request. The tokens can be of any type.

__Note__: a Signal K server should never simply echo or redistribute a message received without removing or replacing the token. 
That would result in A's token being sent to B, which allows the B to impersonate A.  

There are 3  authentication actions:

* authenticate - login and obtain a token
* logout - invalidate a token
* validate - validate a token with auto-renewal if valid. 

All 3 actions can be done via HTTP requests or by sending Signal K messages for non HTTP clients

### Authentication via HTTP

A device or a web client can authenticate with a Signal K server by providing a username and password via a standard
HTTP POST request to `/signalk/«version»/auth/login`.

The `«version»` field is the endpoint version identifier chosen by the client from those offered by the server. See the
[REST API](rest_api.md) documentation for the structure of these identifiers.

The client may send the login request with a `Content-Type` of `application/json` with the properties `username` and
`password` in the body OR with a `Content-Type` of `application/x-www-form-urlencoded` with the `username` and
`password` fields.

```json
{
  "username": "me@somecompany.com",
  "password": "my password"
}
```

In response to a valid login, the server shall respond with a 200 (OK) status, set an HTTP session cookie and include
the token expiry in seconds and the token value in the body of the response. The response `Content-Type` must be `application/json`.

```json
{
  "timeToLive": 86400,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2UiOiIxMjM0LTQ1NjUz"
}
```

In response to invalid login information the server must return HTTP error code 401 (Unauthorized).

If the server does not implement this authentication mechanism it must return HTTP error code 501 (Not Implemented).

### Authentication via WebSockets, TCP, and Similar Transports

The client should send a the following message 

```json
{
  "requestId": "1234-45653-343454",
  "login": {
    "username": "john_doe",
    "password": "password"
  }
}
```

If the login is successful, the server will send a response like the following:

```json
{
  "requestId": "1234-45653-343454",
  "state": "COMPLETED",
  "result": 200,
  "login": {
  	"timeToLive": 86400,
    "token": "eyJhbGciOiJIUzI1NiIsI...ibtv41fOnJObT4RdOyZ_UI9is8"
  }
}
```

If the login fails, the server will send a response like the following:

```json
{
  "requestId": "1234-45653-343454",
  "state": "COMPLETED",
  "result": 401
}
```
The `result` codes are the same as normally used in HTTP.

### Providing Authorization to the Server in Subsequent Requests

#### Web Based Clients

Web based clients should be sure to include the cookie or `Authorization` HTTP header obtained from the authentication response in all subsequent requests.

#### WebSockets Clients

Clients can include the authentication cookie with the initial request.

Clients can include the `Authorization` HTTP header with the initial connect request. The format of the header should
be `Bearer {token}`, for example `Authorization: Bearer eyJhbGciOiJIUzI1NiIsI...ibtv41fOnJObT4RdOyZ_UI9is8`


#### Other Clients

Clients using other kinds of protocols must include the `token` in the Signal K messages they send.

```json
{
  "context": "*",
  "token": "eyJhbGciOiJIUzI1NiIsI...ibtv41fOnJObT4RdOyZ_UI9is8"
  "unsubscribe": [
    {
      "path": "*"
    }
  ]
}
```

### Token Validation

Tokens may have a short expiry time and need to be renewed periodically, or a token's current validity may be unknown. 

#### HTTP Clients

To validate a token, a web based client should send an HTTP POST request to `/signalk/«version»/auth/validate` with the token in the cookie, or in the header.
If the token is valid, a new token is created with new expiry time, and a new cookie or header set in the response. This effectively renews a token.

The reply message will be returned in any case.

#### Other Clients

Clients using other kinds of protocols can send the following message.

```json
{
  "requestId": "1234-45653-343454",
  "validate": {
    "token": "eyJhbGciOiJIUzI1NiIsI...ibtv41fOnJObT4RdOyZ_UI9is8"
  }
}
```
#### Reply Messages

Any validation request results in one of the following messages

On success:
```
{
  "requestId": "1234-45653-343454",
  "state": "COMPLETED",
  "result": 200,
  "validate": {
    "token": "eyJhbGciOiJIUzI1NiIsI...ibtv41fOnJObT4RdOyZ_UI9is8"
  }
}
```

 On error (`result` could be any HTTP code):
```
{
  "requestId": "1234-45653-343454",
  "state": "COMPLETED",
  "result": 401
}
```

### Logout

#### HTTP Clients
To logout, an http based client should send an HTTP PUT request to `/signalk/«version»/auth/logout` with the token in the cookie or in the HTTP header.

#### Other Clients

Clients using other kinds of protocols should send the following message.

```json
{
  "requestId": "1234-45653-343454",
  "logout": {
    "token": "eyJhbGciOiJIUzI1NiIsI...ibtv41fOnJObT4RdOyZ_UI9is8"
  }
}
```

#### Reply Messages

In both cases the reply will be

On success:
```
{
  "requestId": "1234-45653-343454",
  "state": "COMPLETED",
  "result": 200
}
```
On error (`result` could be any HTTP code):
```
{
  "requestId": "1234-45653-343454",
  "state": "COMPLETED",
  "result": 401
}
```

## Device Access

Devices which don’t have any user interaction such as sensors with no input mechanisms should acquire a token using
the [Access Requests](access_requests.md) mechanism.
