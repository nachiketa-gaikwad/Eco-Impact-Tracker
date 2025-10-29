# GreenPoints API Specification

Complete REST API documentation for the GreenPoints sustainability rewards platform.

## Base URL

```
http://localhost:5000/api
```

## Authentication

**Current**: Demo mode - all requests use a single demo user

**Future**: JWT-based authentication with Bearer tokens

## Response Format

### Success Response
```json
{
  "data": { ... },
  "message": "Success message (optional)"
}
```

### Error Response
```json
{
  "error": "Error message describing what went wrong"
}
```

## Endpoints

### Users

#### Get Current User
```http
GET /api/users/current
```

**Response**: 200 OK
```json
{
  "id": "uuid",
  "username": "demo",
  "email": "demo@greenpoints.com",
  "totalPoints": 1250,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### Get User Statistics
```http
GET /api/users/stats
```

**Response**: 200 OK
```json
{
  "totalPoints": 1250,
  "billsThisMonth": 15,
  "co2Saved": 62.5,
  "treesEquivalent": 3
}
```

**Calculations**:
- `co2Saved = totalPoints * 0.05` (kg)
- `treesEquivalent = floor(co2Saved / 20)`

---

### Bills

#### Upload Bill Image
```http
POST /api/bills/upload
Content-Type: multipart/form-data
```

**Request Body**:
```
bill: File (image/*, max 10MB)
```

**Response**: 200 OK
```json
{
  "id": "bill-uuid",
  "userId": "user-uuid",
  "billHash": "sha256-hash",
  "imageUrl": "/uploads/filename.jpg",
  "status": "processing",
  "scanDate": "2024-01-15T10:30:00Z",
  "totalPointsAwarded": 0
}
```

**Status Values**:
- `processing` - OCR in progress
- `completed` - Ready for review
- `failed` - OCR failed

**Errors**:
- `400 Bad Request` - No file uploaded or invalid file type
- `400 Bad Request` - Duplicate bill (already scanned)
- `500 Internal Server Error` - Upload failed

#### Get Bill Details
```http
GET /api/bills/:id
```

**Response**: 200 OK
```json
{
  "id": "bill-uuid",
  "userId": "user-uuid",
  "billNumber": "12345",
  "billHash": "sha256-hash",
  "imageUrl": "/uploads/filename.jpg",
  "scanDate": "2024-01-15T10:30:00Z",
  "totalPointsAwarded": 150,
  "status": "completed",
  "ocrText": "RAW OCR TEXT..."
}
```

**Errors**:
- `404 Not Found` - Bill doesn't exist

#### List All User Bills
```http
GET /api/bills
```

**Response**: 200 OK
```json
[
  {
    "id": "bill-uuid",
    "userId": "user-uuid",
    "billNumber": "12345",
    "scanDate": "2024-01-15T10:30:00Z",
    "totalPointsAwarded": 150,
    "status": "completed"
  },
  ...
]
```

**Ordering**: Most recent first (descending by `scanDate`)

#### Get Line Items for Bill
```http
GET /api/bills/:id/line-items
```

**Response**: 200 OK
```json
[
  {
    "id": "item-uuid",
    "billId": "bill-uuid",
    "productName": "Organic Bananas",
    "quantity": "2",
    "price": "3.99",
    "matchedProductId": "product-uuid",
    "pointsAwarded": 50,
    "manuallyEdited": false
  },
  ...
]
```

**Fields**:
- `matchedProductId` - Null if no product match found
- `pointsAwarded` - 0 if no match
- `manuallyEdited` - True if user edited during review

#### Award Points for Bill
```http
POST /api/bills/:id/award
Content-Type: application/json
```

**Request Body** (Optional - for manual edits):
```json
{
  "item-uuid-1": {
    "productName": "Updated name",
    "quantity": "3",
    "price": "5.99"
  }
}
```

**Response**: 200 OK
```json
{
  "totalPoints": 150,
  "message": "Points awarded successfully"
}
```

**Side Effects**:
1. Updates bill `totalPointsAwarded`
2. Updates user `totalPoints`
3. Creates entry in `points_ledger`

**Errors**:
- `404 Not Found` - Bill doesn't exist

---

### Products

#### List All Products
```http
GET /api/products
```

**Response**: 200 OK
```json
[
  {
    "id": "product-uuid",
    "name": "Organic Bananas",
    "brand": "Wholesome Harvest",
    "category": "Produce",
    "sustainabilityScore": 95,
    "carbonRating": "Excellent",
    "pointsValue": 25,
    "notes": "Locally sourced, minimal packaging",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  ...
]
```

**Ordering**: Alphabetical by name

#### Search Products
```http
GET /api/products?q=banana
```

**Query Parameters**:
- `q` (required) - Search term

**Response**: 200 OK (same as List All Products)

**Search Behavior**:
- Searches `name` and `brand` fields
- Case-insensitive
- Partial matching (LIKE query)
- Limit: 10 results

#### Create Product
```http
POST /api/products
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "Almond Milk",
  "brand": "Nutty Delight",
  "category": "Dairy Alternatives",
  "sustainabilityScore": 88,
  "carbonRating": "Excellent",
  "pointsValue": 20,
  "notes": "Plant-based, recyclable packaging"
}
```

**Validation Rules**:
- `name` (required, string)
- `brand` (required, string)
- `category` (required, string)
- `sustainabilityScore` (required, number, 0-100)
- `carbonRating` (required, string)
- `pointsValue` (required, number, >= 0)
- `notes` (optional, string)

**Response**: 200 OK
```json
{
  "id": "new-product-uuid",
  "name": "Almond Milk",
  ...
}
```

**Errors**:
- `400 Bad Request` - Invalid data

#### Update Product
```http
PATCH /api/products/:id
Content-Type: application/json
```

**Request Body** (all fields optional):
```json
{
  "sustainabilityScore": 90,
  "pointsValue": 22
}
```

**Response**: 200 OK (full product object)

**Errors**:
- `400 Bad Request` - Invalid data
- `404 Not Found` - Product doesn't exist

#### Delete Product
```http
DELETE /api/products/:id
```

**Response**: 200 OK
```json
{
  "message": "Product deleted"
}
```

**Cascade**: Also deletes references in `line_items.matchedProductId`

**Errors**:
- `500 Internal Server Error` - Delete failed

---

## Data Models

### User
```typescript
interface User {
  id: string;                // UUID
  username: string;          // Unique
  email: string;             // Unique
  totalPoints: number;       // Lifetime points
  createdAt: Date;          // Registration date
}
```

### Bill
```typescript
interface Bill {
  id: string;                // UUID
  userId: string;            // FK to users
  billNumber?: string;       // Extracted from OCR
  billHash: string;          // SHA-256 for duplicate detection
  imageUrl: string;          // Path to uploaded image
  scanDate: Date;            // Upload timestamp
  totalPointsAwarded: number; // Sum of line item points
  status: "pending" | "processing" | "completed" | "failed";
  ocrText?: string;          // Raw OCR output
}
```

### LineItem
```typescript
interface LineItem {
  id: string;                // UUID
  billId: string;            // FK to bills
  productName: string;       // Extracted product name
  quantity: string;          // Decimal as string
  price: string;             // Decimal as string (currency)
  matchedProductId?: string; // FK to products (nullable)
  pointsAwarded: number;     // Calculated points
  manuallyEdited: boolean;   // User modified during review
}
```

### Product
```typescript
interface Product {
  id: string;                // UUID
  name: string;              // Product name
  brand: string;             // Manufacturer/brand
  category: string;          // Product category
  sustainabilityScore: number; // 0-100
  carbonRating: string;      // "Excellent", "Good", "Fair", "Poor"
  pointsValue: number;       // Points awarded per unit
  notes?: string;            // Additional sustainability info
  createdAt: Date;           // Creation timestamp
}
```

### PointsLedger
```typescript
interface PointsLedger {
  id: string;                // UUID
  userId: string;            // FK to users
  billId?: string;           // FK to bills (nullable)
  points: number;            // Positive or negative
  transactionType: "earned" | "redeemed" | "adjusted";
  description: string;       // Human-readable description
  createdAt: Date;           // Transaction timestamp
}
```

---

## Rate Limiting

**Current**: None

**Recommended for Production**:
- 100 requests per minute per IP
- 10 uploads per hour per user
- Exponential backoff for failed OCR processing

---

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input or duplicate bill |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Unexpected failure |

---

## Webhooks (Future)

Planned webhooks for external integrations:

```http
POST https://your-domain.com/webhook
Content-Type: application/json
```

**Event Types**:
- `bill.completed` - OCR processing finished
- `bill.failed` - OCR processing failed
- `points.awarded` - User earned points
- `product.created` - New product added

---

## SDKs (Future)

Planned client libraries:
- JavaScript/TypeScript
- Python
- Ruby
- Go

---

**API Version**: 1.0.0  
**Last Updated**: October 27, 2025
