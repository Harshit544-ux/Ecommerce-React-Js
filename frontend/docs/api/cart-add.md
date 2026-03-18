# Cart Add API

Add an item with a specific size to the user's cart.

## Endpoint
`POST http://localhost:4000/cart/add`

## Request
### Headers
- `Content-Type: application/json`
- `Authorization: Bearer <auth-token>`

### Body
```json
{
  "itemId": "productId123",
  "size": "M"
}
```

## Response
### Success (200 OK)
```json
{
  "success": true,
  "message": "Added to cart"
}
```

### Error (401 Unauthorized)
```json
{
  "success": false,
  "message": "Please login first"
}
```
