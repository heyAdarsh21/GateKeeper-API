# GateKeeper API: Product Catalog & Rate-Limited API
Simple backend service built with Node.js and Express.js.
Features:
- Sliding window rate limiter
- Product catalog APIs
- Product media management
- Pagination support
- Input validation
- In-memory storage

# Setup

## Install dependencies
```bash
npm install
```

## Run locally
Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

Server runs on:
```text
http://localhost:3000
```

Base API path:
```text
/api/v1
```

# Environment Variables
Example `.env`:
```env
PORT=3000
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=5
DEFAULT_PAGE_LIMIT=20
MAX_PAGE_LIMIT=100
MAX_URLS_PER_REQUEST=20
MAX_URL_LENGTH=2048
```

# API Endpoints
## Health Check
```http
GET /health
```

# Rate Limiter

## Submit Request
```http
POST /api/v1/request
```

Example body:
```json
{
  "user_id": "user_123",
  "payload": {
    "action": "test"
  }
}
```

Rate limit:
- max 5 requests
- rolling 60 second window

## Get Stats
```http
GET /api/v1/stats
```

Returns accepted/rejected request counts per user.

# Products

## Create Product
```http
POST /api/v1/products
```

Example:

```json
{
  "name": "Widget A",
  "sku": "SKU-001",
  "image_urls": [
    "https://cdn.example.com/img1.jpg"
  ],
  "video_urls": [
    "https://cdn.example.com/demo.mp4"
  ]
}
```

## List Products
```http
GET /api/v1/products?limit=20&offset=0
```

Returns lightweight product data with:
- image_count
- video_count
- thumbnail_url

Full media arrays are intentionally excluded from the list response.

## Get Product Detail
```http
GET /api/v1/products/:id
```

Returns full product including media URLs.

## Append Product Media
```http
POST /api/v1/products/:id/media
```

Example:
```json
{
  "image_urls": [
    "https://cdn.example.com/img2.jpg"
  ]
}
```

# Validation
- `name` and `sku` are required
- duplicate SKU is rejected
- only `http://` and `https://` URLs are allowed
- max 20 URLs per request
- malformed JSON returns 400

# Storage Design
Data is stored fully in memory using Maps.
Product metadata and media are stored separately so the product listing endpoint stays lightweight even with large media arrays.

# Notes
- no database used
- data resets on restart
- single-instance only
- no authentication

In production:
- PostgreSQL would replace in-memory storage
- Redis would handle distributed rate limiting
- S3/CDN would be used for media storage

# Example Requests

## Create Product
```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Widget A",
    "sku": "SKU-001"
  }'
```

## List Products

```bash
curl "http://localhost:3000/api/v1/products?limit=10&offset=0"
```

## Send Rate Limited Request
```bash
curl -X POST http://localhost:3000/api/v1/request \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user_123",
    "payload": {}
  }'
```
