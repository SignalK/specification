# Security

## Communications Security

For privacy and data integrity REST and WebSockets communications should be secured with Transport Layer Security (TLS). All communications over unsecure protocols like HTTP and WebSockets without TLS must be considered insecure even with authentication and access control mechanisms in place.

## Authentication

Authentication for Signal K REST and WebSockets connections is based on http cookies or tokens carried in the HTTP header.

### Logging into a server via HTTP

A device or a web client can login to a Signal K server using User Name and Password using a REST request.

The URL for the request is `/signalk/v1/auth/login` and should be a POST with either `Content-Type` of `application/json` with the properties `username` and `password` in the body OR
`Content-Type` of `application/x-www-form-urlencoded` for web based login forms.

```json
{
  "username": "me@somecompany.com",
  "password": "my password"
}
```

In response to a valid login, the server will set a HTTP cookie and include the token type and the token value in the body of a HTTP 200 response. The response `Content-Type` must be `application/json`.

```json
{
  "type": "JWT",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2UiOiIxMjM0LTQ1NjUz"
}
```

In response to invalid login information the server must return HTTP error code 401 (Unauthorized).

If the server does not implement this authentication mechanism it must return HTTP error code 501 (Not Implemented).

### Logging into a server via Web Sockets and similar transports

The client should send a message like the following. 

```json
{ 
  "requestId": "1234-45653-343454", 
  "login": { 
    "username":  "john_doe",
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNiZW5kZXIiLCJpYXQiOjE1MzgzMzgwNDU"
  }
}
```

If the login fails, the server will send a response like the following:

```json
{
  "requestId": "1234-45653-343454",
  "state": "COMPLETED",
  "result": 401,
}
```

### Providing authorization to the server in subsequent requests

#### Web based clients

Web based clients should be sure to include the cookie set in the authentication response in all subsequent requests.

To logout, a web based client should send an HTTP PUT request to `/signalk/v1/auth/logout`.

#### WebSockets Clients

Clients can include the authentication cookie with the initial request.

Clients can include the `Authorization` HTTP header with the initial connect request. The format of the header should be `{type} {token}`, for example `Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2UiOiIxMjM0LTQ1NjUzLTM0MzQ1MyIsImlhdCI6MTUzNzI3MzkzNiwiZXhwIjoxNTY4ODMxNTM2fQ.oeYVJZgztSF8YgbpJibtv41fOnJObT4RdOyZ_UI9is8`

#### Other clients

Clients using other kinds of protocols can include the `token` in the signal messages they send.

```json
{
  "context": "*",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2UiOiIxMjM0LTQ1NjUzLTM0MzQ1MyIsImlhdCI6MTUzNzI3MzkzNiwiZXhwIjoxNTY4ODMxNTM2fQ.oeYVJZgztSF8YgbpJibtv41fOnJObT4RdOyZ_UI9is8"
  "unsubscribe": [
    {"path": "*"}
  ]
}
```

## Device Access

Devices that don't have any user interaction, like sensors with no input mechanisms, should acquire a token using Access Requests: [Appendix E: Access Requests](access_requests.md)

