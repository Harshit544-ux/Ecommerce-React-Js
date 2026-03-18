# Products API

Fetch all available products.

## Endpoint
`GET http://localhost:4000/products`

## Response
### Success (200 OK)
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "image": ["p_img1.png"],
    "category": "Men",
    "subCategory": "Topwear",
    "sizes": ["S", "M", "L"],
    "date": 1716634345483,
    "bestseller": true
  },
  ...
]
```
