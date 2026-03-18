# Register API

Register a new user account.

## Endpoint
`POST http://localhost:4000/register`

## Request
### Headers
- `Content-Type: application/json`

### Body
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "yourpassword"
}
```

## Response
### Success (200 OK)
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1...",
  "message": "User registered successfully"
}
```

### Error (400 Bad Request)
```json
{
  "success": false,
  "message": "Email already exists"
}
```
