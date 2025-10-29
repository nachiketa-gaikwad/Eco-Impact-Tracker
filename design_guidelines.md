# GreenPoints Design Guidelines

## Design Approach

**Hybrid System-Based with Eco-Conscious Identity**

Drawing from Material Design's clarity and modern fintech apps' data visualization excellence (Mint, Wise), combined with sustainability-focused visual language. This approach balances utility (OCR review, data tables) with emotional engagement (rewards, eco-impact visualization).

**Core Principles:**
- Trust through transparency: Clear feedback at every processing stage
- Eco-consciousness: Subtle environmental storytelling without being preachy
- Efficient gamification: Rewards feel meaningful, not gimmicky
- Data clarity: Complex information presented simply

---

## Typography

**Font Families:**
- Primary: Inter (via Google Fonts CDN) - clean, highly legible for data and UI
- Accent: Poppins Medium/Semibold for headlines and point values

**Hierarchy:**
- Hero Headlines: text-4xl to text-6xl, font-semibold
- Section Headers: text-2xl to text-3xl, font-semibold
- Card Titles: text-lg to text-xl, font-medium
- Body Text: text-base, font-normal
- Data/Numbers (points, prices): text-xl to text-3xl, font-bold (Poppins for impact)
- Captions/Meta: text-sm, font-normal

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, and 16
- Micro spacing: p-2, gap-2 (tight element grouping)
- Standard spacing: p-4, gap-4, m-4 (component padding)
- Section spacing: p-6, py-8, gap-6 (card internals)
- Major spacing: p-8, py-12, gap-8 (between sections)
- Hero/Feature spacing: py-16 (large section breathing room)

**Grid & Containers:**
- Max-width container: max-w-7xl mx-auto for main content
- Card grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Dashboard layout: 2-column split (md:grid-cols-[2fr_1fr]) for main content + sidebar
- Responsive breakpoints: sm, md, lg, xl

---

## Component Library

### Navigation
**Main Navigation:**
- Fixed top navbar with logo (leaf icon + "GreenPoints"), primary nav links, user avatar/points badge
- Mobile: Hamburger menu with slide-in drawer
- Height: h-16
- Include points badge in header showing current balance with subtle pulse animation on point awards

**Admin Navigation:**
- Sidebar layout for admin panel (w-64) with collapsible sections
- Dashboard, Products, Users, Bills sections with icon + label

### Core UI Elements

**Buttons:**
- Primary (CTA): Rounded (rounded-lg), medium padding (px-6 py-3), bold text
- Secondary: Outlined variant with transparent background
- Icon buttons: Square (w-10 h-10) with centered icon
- Upload button: Large dashed border area for drag-and-drop with camera icon
- Sizes: Small (px-4 py-2 text-sm), Medium (px-6 py-3), Large (px-8 py-4 text-lg)

**Cards:**
- Standard elevation with rounded-xl corners
- Padding: p-6
- Bill card: Includes thumbnail, date, status badge, points earned
- Product card: Image, name, sustainability score badge, points value
- Points transaction: Icon, description, timestamp, +/- points with appropriate indicator

**Forms:**
- Input fields: rounded-lg, p-3, focus ring
- Labels: text-sm font-medium mb-2
- File upload: Large dashed border drop zone (min-h-64) with icon and "Drop bill image or click to upload"
- Admin forms: Standard vertical form layout with clear sections

### Bill Scanning Flow Components

**Upload Interface:**
- Hero-style upload zone with large drop area
- Camera capture button (mobile-first icon)
- Sample bill thumbnails showing "supported formats"
- Progress indicator for upload

**OCR Processing:**
- Loading state: Animated scanner overlay on bill preview
- Progress bar with stages: "Scanning → Extracting → Matching → Calculating"
- Estimated time remaining

**Line-Item Review:**
- Editable table with columns: Item Name | Quantity | Price | Sustainability Score | Points
- Each row editable with inline inputs
- Matched items: Green checkmark icon
- Unmatched items: Yellow warning icon with "Add to database" link
- Product autocomplete dropdown for manual matching

**Points Award:**
- Large celebration card with confetti-style accent
- Total points prominently displayed (text-5xl font-bold)
- Breakdown table showing per-item points
- Eco-impact statement: "Equivalent to X kg CO2 saved" with tree/leaf icon
- CTA: "View Dashboard" and "Scan Another Bill"

### Data Displays

**Dashboard Widgets:**
- Points balance card: Large number with trend indicator (up/down)
- Recent scans: List with thumbnails, dates, points
- Leaderboard: Top sustainable shoppers (if social feature)
- Impact metrics: Total CO2 saved, equivalent trees planted (visual icons)

**Tables:**
- Striped rows for readability
- Sortable headers (with arrow icons)
- Hover state: subtle background change
- Pagination controls at bottom
- Mobile: Convert to stacked cards

**Admin Product Database:**
- Search/filter bar at top
- Table with: Product Name | Brand | Category | Sustainability Score (1-100) | Points Value | Actions
- Inline edit or modal edit options
- Bulk import CSV functionality

### Sustainability Score Indicators

**Score Badges:**
- Circular or pill-shaped badges
- Score ranges: 80-100 (Excellent/dark green), 60-79 (Good/medium green), 40-59 (Fair/yellow), 0-39 (Poor/orange)
- Include icon (leaf with rating) + number
- Size variations for different contexts

**Visual Metaphors:**
- Progress rings for scores
- Leaf icons with fill levels
- Tree/plant growth illustrations for cumulative impact

---

## Page-Specific Layouts

### Landing Page (Marketing)
- Hero: Large background image of fresh produce/sustainable shopping scene with blurred glass-morphism overlay
- Heading: "Turn Every Purchase Into Environmental Action"
- Subheading: "Scan receipts, discover eco-friendly choices, earn rewards"
- CTA buttons: "Start Scanning" (primary) and "Learn How It Works" (secondary) with backdrop-blur
- Features section: 3-column grid with icons
  - Fast OCR Scanning
  - Smart Sustainability Matching  
  - Reward Your Impact
- How It Works: 4-step visual flow with numbered icons
- Sample Bill Preview: Actual bill image with highlighted line items and points overlay
- Impact Stats: Large numbers showing community impact (bills scanned, CO2 saved)
- Testimonials: 2-column grid with user photos and quotes
- Footer: Links, social, newsletter signup

### User Dashboard
- Top stats row: 3-card grid (Total Points, Bills Scanned This Month, CO2 Saved)
- Main content area: Recent bills list (left 2/3) + Quick actions sidebar (right 1/3)
- Charts: Simple bar chart showing points earned over time
- Quick scan button: Floating action button (bottom-right on mobile)

### Bill Scan Flow (Multi-Step)
1. Upload: Full-screen drop zone with camera option
2. Processing: Bill preview with animated scanning overlay
3. Review: Split view (bill image left, editable line-items table right)
4. Award: Centered celebration card with confetti accent and impact metrics

### Admin Panel
- Sidebar navigation (left)
- Main content area (right) with breadcrumbs
- Product database: Filterable table with inline actions
- Dashboard: Analytics widgets showing scan volume, top products, user activity

---

## Images

**Hero Section:**
- Large, vibrant lifestyle image showing sustainable shopping (farmer's market, reusable bags, fresh produce)
- Dimensions: Full viewport width, 60-70vh height
- Treatment: Slight overlay gradient for text readability
- Buttons: Use backdrop-blur-md on button backgrounds

**Product Placeholders:**
- Use product category icons (leaf, recycling symbol, organic badge) when no image available
- Admin panel: 64x64px thumbnails for product listings

**Bill Previews:**
- Thumbnail size: 120x160px in lists
- Full preview: Max 800px width in review interface
- Scanner overlay animation during OCR processing

**Impact Illustrations:**
- Subtle leaf/tree iconography for eco-metrics
- Simple line drawings, not photos
- Used in dashboard widgets and celebration screens

---

## Animations

**Minimal, Purposeful Motion:**
- Points award: Brief scale-up + subtle confetti particle effect (1.5s)
- OCR scanning: Animated line moving across bill preview
- Button interactions: Standard hover scale (1.02) and active press (0.98)
- Page transitions: Simple fade (200ms)
- Loading states: Spinner or skeleton screens, no elaborate animations

**No Hover Effects:**
- For buttons on images with blurred backgrounds
- Buttons maintain their standard interaction states regardless of placement context

---

## Accessibility

- All form inputs include visible labels
- Error states: Red border + error message below field
- Focus indicators: Consistent ring on all interactive elements
- Icon buttons: Include aria-labels
- Alt text for all images
- Keyboard navigation support throughout
- Color contrast ratios meet WCAG AA standards

---

This design creates a trustworthy, efficient sustainability platform that feels modern and rewarding without sacrificing data clarity. The eco-conscious visual language is woven throughout via green accent tones, leaf iconography, and impact storytelling—making users feel good about their sustainable choices while maintaining a professional, utility-first foundation.