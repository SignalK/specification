# Security

## Communications Security

For privacy and data integrity REST and WebSockets communications should be secured with Transport Layer Security
(TLS). All communications over unsecure protocols like HTTP and WebSockets without TLS must be considered insecure even
with authentication and access control mechanisms in place.

## Authentication

Authentication for Signal K REST and WebSockets connections is based on HTTP cookies or tokens carried in the HTTP
header.

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
the token type and the token value in the body of the response. The response `Content-Type` must be `application/json`.

```json
{
  "type": "JWT",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2UiOiIxMjM0LTQ1NjUz"
}
```

In response to invalid login information the server must return HTTP error code 401 (Unauthorized).

If the server does not implement this authentication mechanism it must return HTTP error code 501 (Not Implemented).

### Authentication via WebSockets and Similar Transports

The client should send a message like the following.

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

### Providing Authorization to the Server in Subsequent Requests

#### Web Based Clients

Web based clients should be sure to include the cookie set in the authentication response in all subsequent requests.

To logout, a web based client should send an HTTP PUT request to `/signalk/«version»/auth/logout`.

#### WebSockets Clients

Clients can include the authentication cookie with the initial request.

Clients can include the `Authorization` HTTP header with the initial connect request. The format of the header should
be `{type} {token}`, for example `Authorization: JWT eyJhbGciOiJIUzI1NiIsI...ibtv41fOnJObT4RdOyZ_UI9is8`

#### Other Clients

Clients using other kinds of protocols can include the `token` in the Signal K messages they send.

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

## Device Access

Devices which don’t have any user interaction such as sensors with no input mechanisms should acquire a token using
the [Access Requests](access_requests.md) mechanism.
