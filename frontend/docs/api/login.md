# Login API

Authenticate a user and return a JWT token.

## Endpoint
`POST http://localhost:4000/login`

## Request
### Headers
- `Content-Type: application/json`

### Body
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

## Response
### Success (200 OK)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1..."
}
```

### Error (401 Unauthorized)
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```
