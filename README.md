# GreenPoints - Sustainability Rewards Platform

A full-stack web application that scans bills using OCR, extracts line items, matches them against a sustainability database, and awards eco-points to users for making environmentally conscious purchasing decisions.

## 🌱 Features

### Core Functionality
- **Bill Scanning**: Upload or capture receipts with drag-and-drop interface
- **OCR Processing**: Tesseract.js powered text extraction with image preprocessing
- **Smart Product Matching**: Automatic matching against 20+ pre-seeded sustainable products
- **Points Calculation**: Award points based on sustainability scores (0-100 scale)
- **Duplicate Detection**: Hash-based bill verification to prevent double scanning
- **User Dashboard**: Track total points, bills scanned, CO₂ saved, and environmental impact
- **Admin Panel**: Full CRUD operations for managing product sustainability database

### Technical Highlights
- Real-time OCR processing with animated progress indicators
- Editable line-item review before awarding points
- Responsive design with dark mode support
- PostgreSQL database with Drizzle ORM
- Type-safe API with Zod validation
- Comprehensive error handling and loading states

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL database (automatically provisioned on Replit)

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   The following are automatically configured on Replit:
   - `DATABASE_URL` - PostgreSQL connection string
   - `SESSION_SECRET` - Session encryption key

3. **Initialize database**:
   ```bash
   npm run db:push
   ```
   This creates all tables and seeds 20 sample products.

4. **Start development server**:
   ```bash
   npm run dev
   ```
   The app runs on `http://localhost:5000`

## 📱 User Guide

### Scanning a Bill

1. **Navigate to Scan Page**: Click "Scan Bill" in the navigation
2. **Upload Receipt**: Drag & drop an image or click to browse
3. **Wait for Processing**: OCR extraction takes 10-15 seconds
4. **Review Line Items**: Verify extracted products, quantities, and prices
5. **Edit if Needed**: Click edit icon to modify any line item
6. **Award Points**: Submit to calculate and award sustainability points

### Dashboard

- **Total Points**: Lifetime eco-points earned
- **Bills This Month**: Number of receipts scanned this month
- **CO₂ Saved**: Environmental impact (1 point = 0.05kg CO₂)
- **Recent Scans**: History of processed bills with points breakdown

### Admin Panel

Manage the product sustainability database:
- **Add Products**: Name, brand, category, sustainability score (0-100), points value
- **Edit Products**: Update any product information
- **Delete Products**: Remove products from database
- **Search**: Filter products by name, brand, or category

## 🏗️ Architecture

### Tech Stack

**Frontend**:
- React 18 with TypeScript
- Wouter for routing
- TanStack Query for state management
- Shadcn UI components
- Tailwind CSS for styling
- Tesseract.js for client-side OCR

**Backend**:
- Node.js with Express
- PostgreSQL with Drizzle ORM
- Multer for file uploads
- Sharp for image preprocessing
- Zod for validation

### Database Schema

```sql
-- Users
users (id, username, email, totalPoints, createdAt)

-- Bills
bills (id, userId, billNumber, billHash, imageUrl, scanDate, totalPointsAwarded, status, ocrText)

-- Line Items (extracted from bills)
lineItems (id, billId, productName, quantity, price, matchedProductId, pointsAwarded, manuallyEdited)

-- Products (sustainability database)
products (id, name, brand, category, sustainabilityScore, carbonRating, pointsValue, notes, createdAt)

-- Points Ledger (transaction history)
pointsLedger (id, userId, billId, points, transactionType, description, createdAt)
```

### API Endpoints

#### User Routes
- `GET /api/users/current` - Get current user
- `GET /api/users/stats` - Get user statistics

#### Bill Routes
- `POST /api/bills/upload` - Upload bill image
- `GET /api/bills/:id` - Get bill details
- `GET /api/bills` - List all user bills
- `GET /api/bills/:id/line-items` - Get extracted line items
- `POST /api/bills/:id/award` - Award points for reviewed bill

#### Product Routes
- `GET /api/products` - List all products
- `GET /api/products?q=search` - Search products
- `POST /api/products` - Create product (admin)
- `PATCH /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

## 🔬 Technical Deep Dive

### OCR Pipeline

1. **Image Preprocessing** (Sharp):
   - Convert to grayscale
   - Normalize brightness/contrast
   - Sharpen edges
   - Reduce noise

2. **Text Extraction** (Tesseract.js):
   - OCR with English language model
   - Extract raw text from preprocessed image

3. **Line Item Parsing**:
   - Regex patterns for prices (`$X.XX`)
   - Quantity detection (`2x`, `3 x`)
   - Product name extraction
   - Filter out headers/footers (total, tax, etc.)

4. **Bill Number Extraction**:
   - Pattern matching for receipt/invoice/order numbers
   - Multiple regex patterns for different receipt formats

### Product Matching Algorithm

Simple but effective similarity scoring:

```typescript
function calculateSimilarity(productName: string, dbProduct: Product) {
  // Exact match: 1.0
  // Substring match: 0.8
  // Word-by-word matching: 0.0 - 1.0
  // Threshold: 0.5 (50% confidence required)
}
```

**Future Improvements**:
- Levenshtein distance for typo tolerance
- Machine learning model for better matching
- User feedback loop to improve accuracy

### Duplicate Detection

**Method**: SHA-256 hash of image file
**Storage**: `billHash` column in bills table
**Check**: Before processing, query existing bills by hash

**Trade-off**: Hash-based detection prevents identical image uploads but won't catch:
- Same bill photographed from different angles
- Same bill with different lighting/quality

**Alternative Approaches**:
- Perceptual hashing (pHash) - more robust to minor changes
- Bill number extraction + date matching
- Combination of multiple signals

## 🎨 Design System

### Color Palette

**Green-Focused Sustainability Theme**:
- Primary: `hsl(142 76% 36%)` - Eco green
- Accent: `hsl(142 15% 88%)` - Light green
- Muted: `hsl(142 8% 90%)` - Subtle green tint

### Sustainability Score Badges

- **80-100**: Excellent (Dark Green)
- **60-79**: Good (Medium Green)
- **40-59**: Fair (Yellow)
- **0-39**: Poor (Orange)

### Typography

- **Primary**: Inter - Clean, legible
- **Accent**: Poppins - Bold numbers and points display

## ⚖️ Trade-offs & Decisions

### Client-Side vs Server-Side OCR

**Chosen**: Server-side (Tesseract.js on backend)

**Pros**:
- More processing power available
- Better image preprocessing capabilities
- Centralized error handling
- Easier to upgrade OCR engine

**Cons**:
- Network latency for image upload
- Server resource usage
- Scaling challenges with concurrent requests

**Alternative**: Cloud OCR services (Google Vision, AWS Textract)
- Higher accuracy but ongoing costs
- Rate limits and API dependencies
- Privacy concerns with third-party processing

### Product Matching: Exact vs Fuzzy

**Chosen**: Simple similarity scoring with 50% threshold

**Pros**:
- Fast and deterministic
- No external dependencies
- Easy to understand and debug

**Cons**:
- Limited accuracy with typos
- Struggles with abbreviations
- No learning/improvement over time

**Future**: Machine learning model trained on user feedback

### Database Schema: Normalized vs Denormalized

**Chosen**: Fully normalized schema with separate tables

**Pros**:
- Data integrity and consistency
- Flexible querying capabilities
- Easy to update product information
- Clear separation of concerns

**Cons**:
- More complex queries (joins required)
- Slightly higher latency
- More tables to manage

**Trade-off Accepted**: Performance is acceptable for this use case, and data integrity is more valuable.

### Image Storage: Local vs Cloud

**Chosen**: Local filesystem (development)

**Production Recommendation**: Cloud storage (S3, Cloudinary, etc.)

**Current Approach**:
- Images saved to `/uploads` directory
- Served via Express static middleware
- Image paths stored in database

**For Production**:
- Upload to S3/Cloud Storage
- Store public URL in database
- Implement cleanup policies
- CDN for faster delivery

## 🧪 Testing

### Manual Testing Checklist

- [ ] Upload bill image successfully
- [ ] OCR processing completes without errors
- [ ] Line items extracted accurately
- [ ] Products matched to sustainability database
- [ ] Points calculated correctly
- [ ] Duplicate bill rejection works
- [ ] Admin can create/edit/delete products
- [ ] Dashboard shows accurate statistics
- [ ] Dark mode toggle works
- [ ] Responsive design on mobile

### Sample Test Data

20 pre-seeded products across categories:
- **Produce**: Organic bananas, spinach
- **Dairy**: Almond milk, eggs, yogurt
- **Grains**: Quinoa, rice, pasta
- **Snacks**: Dark chocolate, chips
- **Beverages**: Orange juice, soda

## 📦 Deployment (Replit)

### Automatic Deployment

1. **Database**: Automatically provisioned PostgreSQL
2. **Environment**: All secrets pre-configured
3. **Build**: Automatic on push to main
4. **Domain**: `.replit.app` subdomain provided

### Manual Steps

1. Ensure `Start application` workflow is running
2. Database migrations run automatically on startup
3. Sample products seeded on first run
4. Application available at provided Replit URL

### Environment Variables

All managed automatically by Replit:
- `DATABASE_URL` - PostgreSQL connection
- `PGHOST`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`, `PGPORT`
- `SESSION_SECRET` - Session encryption

### Scaling Considerations

**Current Setup**: Single-server deployment

**For High Traffic**:
- Separate OCR processing to background workers
- Queue system (Bull, BullMQ) for async processing
- Redis for caching product matches
- CDN for static assets
- Database read replicas
- Horizontal scaling with load balancer

## 🐛 Known Limitations

1. **OCR Accuracy**: Tesseract.js ~80-90% accurate, depends on image quality
2. **Product Matching**: Simple algorithm, may miss variations
3. **Single User**: Demo mode with one user (easily extended to multi-user)
4. **Image Storage**: Local filesystem (not suitable for production)
5. **No Barcode Scanning**: Would significantly improve product matching

## 🔮 Future Enhancements

### Phase 2 Features
- [ ] Barcode/QR code scanning for instant product lookup
- [ ] Machine learning model for improved OCR and matching
- [ ] User authentication and multi-user support
- [ ] Social features (leaderboards, challenges)
- [ ] Rewards catalog for point redemption
- [ ] Mobile app (React Native)
- [ ] Real-time sustainability API integration
- [ ] Carbon footprint calculator
- [ ] Personalized product recommendations
- [ ] Export data (CSV, PDF reports)

### Technical Improvements
- [ ] WebSocket for real-time OCR progress
- [ ] Service worker for offline support
- [ ] Image compression before upload
- [ ] Batch bill processing
- [ ] Advanced analytics dashboard
- [ ] Automated testing suite
- [ ] Performance monitoring
- [ ] Error tracking (Sentry)

## 📊 Sample Data

The application includes 20 pre-seeded products across various sustainability levels:

### Excellent (80-100 points)
- Organic Bananas, Almond Milk, Organic Spinach, Quinoa, Bamboo Toothbrush

### Good (60-79 points)
- Free-Range Eggs, Whole Wheat Bread, Greek Yogurt, Brown Rice, Dark Chocolate

### Fair (40-59 points)
- Orange Juice, Canned Tomatoes, Pasta, Peanut Butter, Cereal

### Poor (0-39 points)
- Soda, Chips, Frozen Pizza, Energy Drink, Instant Noodles

## 🧪 Testing the Application

### Quick Test Flow

1. **Navigate to Admin Panel** (`/admin`)
   - Verify 20 products are loaded
   - Create a new test product
   - Search for "banana"

2. **Scan a Bill** (`/scan`)
   - Upload a receipt image (JPG/PNG)
   - Watch OCR processing (10-15 seconds)
   - Review extracted line items

3. **Check Dashboard** (`/dashboard`)
   - View earned points
   - See CO₂ savings
   - Review bill history

### Sample Receipt for Testing

Create a text file and convert to image, or use a real receipt with these items:
```
GROCERY STORE RECEIPT
-------------------
Organic Bananas        $3.99
Almond Milk            $4.99
Greek Yogurt           $5.49
Brown Rice             $7.99
-------------------
TOTAL:                $22.46
```

## 📄 License

MIT License - Feel free to use this project as a learning resource or foundation for your own sustainability platform.

## 🤝 Contributing

This is a portfolio/demo project, but suggestions and feedback are welcome!

## 📚 Additional Documentation

- [API Specification](./API_SPEC.md) - Complete REST API reference
- [Deployment Guide](./DEPLOYMENT.md) - Platform-specific deployment instructions
- [Design Guidelines](./design_guidelines.md) - UI/UX design system

---

**Built with ❤️ and ♻️ for a more sustainable future.**
