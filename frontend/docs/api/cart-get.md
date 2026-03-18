# Cart Get API

Retrieve the user's current shopping cart.

## Endpoint
`POST http://localhost:4000/cart/get`

## Request
### Headers
- `Authorization: Bearer <auth-token>`

## Response
### Success (200 OK)
```json
{
  "success": true,
  "cart": {
    "productId123": {
      "M": 1,
      "L": 2
    },
    "productId456": {
      "S": 1
    }
  }
}
```

### Error (401 Unauthorized)
```json
{
  "success": false,
  "message": "Session expired"
}
```
