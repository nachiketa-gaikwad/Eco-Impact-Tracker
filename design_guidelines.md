# Eco Impact Tracker - Design Guidelines

## Design Approach

**Hybrid Approach: Material Design Foundation with Eco-Conscious Visual Identity**

This application balances utility (dashboard functionality, data tracking) with emotional engagement (environmental impact awareness). We'll use Material Design principles for component structure and interaction patterns, enhanced with nature-inspired visual elements that reinforce the eco-conscious mission.

**Key Design Principles:**
- **Natural Progression**: Guide users through their environmental journey with clear visual hierarchy
- **Transparency & Trust**: Clean, honest design that reflects environmental values
- **Growth & Achievement**: Celebrate positive impact through visual feedback and credit displays
- **Accessibility First**: Ensure all users can participate in environmental action

---

## Typography System

**Font Families:**
- Primary: 'Poppins' (headings, UI elements) - weights 400, 500, 600, 700
- Secondary: 'Roboto' (body text, data) - weights 300, 400, 500

**Typography Scale:**
- Hero Heading: text-5xl lg:text-6xl font-bold (Poppins)
- Section Headings: text-3xl lg:text-4xl font-semibold (Poppins)
- Subsection Headings: text-2xl font-semibold (Poppins)
- Card Titles: text-xl font-medium (Poppins)
- Body Text: text-base leading-relaxed (Roboto)
- Small Text/Labels: text-sm (Roboto)
- Micro Text: text-xs (Roboto)

**Hierarchy Rules:**
- All headings use Poppins for impact and personality
- Body content and dashboard data use Roboto for readability
- Button text: text-base font-medium
- Input labels: text-sm font-medium
- Dashboard stats: text-4xl font-bold for numbers, text-sm font-normal for labels

---

## Layout System

**Spacing Primitives:**
Core spacing units: 2, 4, 6, 8, 12, 16, 20, 24

**Common Patterns:**
- Component padding: p-6 (mobile), p-8 (desktop)
- Section spacing: py-16 lg:py-24
- Card gaps: gap-6 lg:gap-8
- Form element spacing: space-y-4
- Button padding: px-6 py-3
- Icon margins: mr-2 or ml-2

**Container Strategy:**
- Full-width sections: w-full with max-w-7xl mx-auto px-4 lg:px-8
- Dashboard content: max-w-6xl mx-auto
- Form containers: max-w-md mx-auto
- Info sections: max-w-4xl mx-auto for optimal reading

**Grid Systems:**
- Hero: Single column, centered content
- Dashboard Stats: grid-cols-1 md:grid-cols-3 gap-6
- Info Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Upload Section: Single column centered, max-w-2xl

---

## Component Library

### Navigation
**Header Navigation:**
- Sticky header with backdrop blur: sticky top-0 backdrop-blur-md
- Logo left (40px height), navigation links right
- Desktop: horizontal nav items with mx-6
- Mobile: hamburger menu transforming to full-screen overlay
- Active state: subtle underline with transition
- Shadow: shadow-sm when scrolled

### Authentication Components

**Login/Signup Modal:**
- Centered overlay with backdrop: fixed inset-0 with semi-transparent backdrop
- Card container: max-w-md with rounded-2xl and shadow-2xl
- Toggle tabs at top: "Login" | "Sign Up" with sliding indicator
- Form layout: space-y-6
- Input fields: Full-width with h-12, rounded-lg, focus ring
- Submit button: Full-width, rounded-lg, h-12
- Secondary links: text-sm, right-aligned

**Input Fields:**
- Height: h-12
- Rounded: rounded-lg
- Border: border-2 with focus state
- Padding: px-4
- Icon support: Inline left icon with pl-12 for input

### Dashboard Components

**Stats Cards:**
- Card container: rounded-2xl with shadow-lg and p-6 lg:p-8
- Icon container: w-16 h-16 rounded-full flex items-center justify-center
- Number display: text-4xl lg:text-5xl font-bold
- Label: text-sm lg:text-base
- Grid layout: 3 cards on desktop, stacked on mobile

**Upload Section:**
- Centered card: max-w-2xl
- Drag-and-drop zone: border-2 border-dashed, rounded-xl, p-12
- File upload icon: w-16 h-16 centered
- Upload button: Below drop zone, max-w-xs mx-auto
- Recent uploads list: space-y-3 with individual item cards

**Credit Display (Primary Feature):**
- Large circular progress indicator: w-48 h-48 mx-auto
- Central credit number: text-5xl font-bold
- Surrounding ring: SVG stroke animation
- Achievement badges: Below progress, flex justify-center gap-4

### Information Section

**Info Cards:**
- 3-column grid on desktop: grid-cols-1 lg:grid-cols-3
- Card structure: rounded-xl, p-8, min-h-64
- Icon at top: w-12 h-12
- Title: text-xl font-semibold mb-4
- Description: text-base leading-relaxed

**Expandable FAQ:**
- Accordion pattern with smooth transitions
- Question: p-4 rounded-lg, cursor-pointer
- Answer: Collapsible with max-height transition, p-4
- Icon: Chevron that rotates on expand

### Buttons

**Primary Action:**
- Padding: px-8 py-3
- Rounded: rounded-lg
- Font: text-base font-medium
- Shadow: shadow-md with hover:shadow-lg
- Transition: all 200ms

**Secondary Action:**
- Border: border-2
- Padding: px-6 py-2.5
- Rounded: rounded-lg
- Background: transparent with hover state

**Icon Buttons:**
- Size: w-10 h-10
- Rounded: rounded-full
- Centered icon: flex items-center justify-center

---

## Images & Visual Elements

**Hero Section Background:**
- Full-width hero image depicting lush greenery, forest canopy, or Earth from space
- Height: min-h-screen with flex items-center
- Overlay: Dark gradient overlay (bottom to top) for text readability
- Image placement: background-position: center, background-size: cover

**Dashboard Icons:**
- Use Heroicons for consistent iconography throughout
- Icon sizes: w-6 h-6 for inline, w-8 h-8 for cards, w-12 h-12 for section headers
- Required icons: leaf (eco), upload-cloud, chart-bar, user-circle, shield-check

**Decorative Elements:**
- Subtle leaf/plant illustrations as section dividers
- Abstract organic shapes as background accents (SVG patterns)
- Floating particles effect in hero (optional subtle animation)

**Logo:**
- Leaf or eco symbol with text
- Height: h-10 on desktop, h-8 on mobile
- Place in top-left corner of navigation

---

## Special Interactions

**Upload Animation:**
- File drop: Scale and highlight drop zone
- Processing: Circular spinner with organic motion
- Success: Green checkmark with slide-in animation
- Credit addition: Number count-up animation with particle burst

**Dashboard State Changes:**
- Credit updates: Smooth number transitions with easing
- New achievement: Slide-in notification from right
- Progress ring: Animated stroke-dashoffset on load

**Page Transitions:**
- Section switching: Fade out/in with 300ms duration
- Modal appearance: Scale from 0.95 to 1 with fade-in
- Card hover: Subtle lift (translateY(-4px)) with shadow increase

---

## Responsive Behavior

**Breakpoints:**
- Mobile: Base (< 768px)
- Tablet: md: (768px - 1024px)
- Desktop: lg: (> 1024px)

**Key Responsive Changes:**
- Navigation: Horizontal to hamburger menu
- Dashboard grid: 3 columns to stack
- Typography: Reduce heading sizes by 1 step
- Padding: Reduce section padding by 30-40%
- Upload zone: Reduce height on mobile
- Modal: Full-screen on mobile, centered card on desktop

---

This design creates a cohesive, nature-inspired experience that motivates users to track and reduce their carbon footprint while maintaining clarity and usability for dashboard functionality.