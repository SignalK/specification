# Security

Signal K security is based on JWT (JSON Web Token)

## Logging into a server via HTTP

A device or web site can login to a signalk server using  User Name a Password using a REST request.

The url for the request is `/signalk/v1/login` and should be a POST with a `Content-Type` of `application/json` with the User Name and Password in the body or it can have a `Content-Type` of `application/x-www-form-urlencoded` for web based login forms.

```json
{
  "username": "me@somecompany.com",
  "password": "my password"
}
```

In response to a valid login, the server will set the `JAUTHENTICATION` HTTP cookie and include the JWT token in the body of a HTTP 200 reponse.

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2UiOiIxMjM0LTQ1NjUzLTM0MzQ1MyIsImlhdCI6MTUzNzI3MzkzNiwiZXhwIjoxNTY4ODMxNTM2fQ.oeYVJZgztSF8YgbpJibtv41fOnJObT4RdOyZ_UI9is8"
}
```

In response to invalid login information, the server will return HTTP error code 401 (Unauthorized)


## Providing authorization to the server in subsquent requests

### We based clients

Web based clients should be sure to include the `JAUTHENTICATION` cookie in all requests

To logout, a web based client should send an HTTP PUT request to `/signalk/v1/logout`

### WS clients

Clients can include the `JAUTHENTICATION` cookie with the initial request.

Clients can include the `Authorization` HTTP header with the initial connect request. The format of the header should be `JWT {token}`, for example `Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2UiOiIxMjM0LTQ1NjUzLTM0MzQ1MyIsImlhdCI6MTUzNzI3MzkzNiwiZXhwIjoxNTY4ODMxNTM2fQ.oeYVJZgztSF8YgbpJibtv41fOnJObT4RdOyZ_UI9is8`

#Other clients

Clients using other kinds of protocals can include the `token` in the signal messages they send.

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

For access to a server from devices that don't have any user interaction, like sensors, they should aquire a token using Acesss Requests: [Appendix E: Access Rwquests](access_requests.md)

