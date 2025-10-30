# Eco Impact Tracker

## Overview

Eco Impact Tracker is a web application designed to help users monitor their carbon footprint and earn carbon credits by uploading bills (grocery, transport, etc.). The application provides a dashboard to track environmental impact, visualize carbon credit earnings, and educate users about carbon footprint reduction.

**Core Purpose:** Enable users to track their environmental impact through bill uploads and gamify sustainable behavior through a carbon credit reward system.

**Tech Stack:**
- Frontend: React with TypeScript, Vite
- UI Framework: shadcn/ui components with Radix UI primitives
- Styling: Tailwind CSS with custom design system
- Backend: Express.js with TypeScript
- Database: PostgreSQL with Drizzle ORM
- State Management: TanStack Query (React Query)
- Routing: Wouter

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Component-Based Design:**
The application follows a modular component architecture with reusable UI components. Key architectural decisions include:

- **Component Library:** Uses shadcn/ui (built on Radix UI) for accessible, customizable components. This provides production-ready UI primitives with full styling control.
- **Design System:** Implements a custom design system based on Material Design principles with eco-conscious visual identity (green color palette, Poppins/Roboto fonts).
- **Styling Strategy:** Tailwind CSS with CSS variables for theming, supporting both light and dark modes. Custom utility classes for elevation effects (hover-elevate, active-elevate-2).
- **Layout System:** Responsive-first design with mobile breakpoint at 768px, using consistent spacing primitives (2, 4, 6, 8, 12, 16, 20, 24).

**State Management:**
- TanStack Query for server state management and API caching
- Local React state for UI interactions
- LocalStorage for temporary user session persistence (current implementation)

**Routing:**
- Wouter for lightweight client-side routing
- Single-page application with route-based code splitting

### Backend Architecture

**Server Framework:**
Express.js server with TypeScript, following a RESTful API design pattern.

**API Structure:**
- `/api/signup` - User registration
- `/api/login` - User authentication
- `/api/users/:id` - User profile retrieval
- `/api/bills` - Bill upload and management

**Authentication:**
Currently implements basic credential validation without session management or JWT tokens. This is a simplified approach suitable for prototyping but should be enhanced for production with:
- Password hashing (currently stores plain text)
- Session management or JWT tokens
- Secure HTTP-only cookies

**Data Storage Strategy:**
The application uses an in-memory storage implementation (`MemStorage`) as the current storage layer, with an interface (`IStorage`) designed for easy swapping to persistent database storage. This architectural decision allows for:
- Rapid prototyping without database setup
- Clear separation of concerns
- Easy migration to PostgreSQL when ready

### Data Layer

**Database Schema (PostgreSQL with Drizzle ORM):**

**Users Table:**
- `id` (UUID, primary key, auto-generated)
- `name` (text, required)
- `email` (text, unique, required)
- `password` (text, required)
- `credits` (integer, default 0)

**Bills Table:**
- `id` (UUID, primary key, auto-generated)
- `userId` (UUID, foreign key to users)
- `fileName` (text, required)
- `credits` (integer, required)
- `uploadDate` (timestamp, default now)

**ORM Choice Rationale:**
Drizzle ORM was chosen for its:
- Type-safe query builder with full TypeScript support
- Lightweight runtime with no additional overhead
- SQL-like syntax for familiar database interactions
- Zod integration for schema validation

**Migration Strategy:**
Drizzle Kit manages database migrations with configuration in `drizzle.config.ts`, targeting PostgreSQL via Neon serverless connection.

### Key Architectural Patterns

**Separation of Concerns:**
- Client code in `client/` directory
- Server code in `server/` directory
- Shared types and schemas in `shared/` directory

**Type Safety:**
- End-to-end TypeScript for type safety
- Shared schema definitions using Drizzle and Zod
- Path aliases for clean imports (`@/`, `@shared/`, `@assets/`)

**Development Experience:**
- Vite for fast HMR and development server
- ESBuild for production builds
- TSX for running TypeScript server files

**Build Process:**
- Frontend: Vite builds React app to `dist/public`
- Backend: ESBuild bundles server to `dist/index.js`
- Production: Node.js serves bundled backend with static frontend

## External Dependencies

**UI Component Libraries:**
- Radix UI primitives (accordion, dialog, dropdown, popover, select, tabs, toast, tooltip, etc.)
- shadcn/ui component patterns
- Lucide React for icons
- class-variance-authority for component variants
- cmdk for command palette functionality
- embla-carousel-react for carousels
- vaul for drawer component

**Database & ORM:**
- PostgreSQL (via @neondatabase/serverless)
- Drizzle ORM for type-safe database queries
- Drizzle Kit for migrations
- Drizzle Zod for schema validation

**State Management & Data Fetching:**
- TanStack Query (React Query) for server state
- React Hook Form with Zod resolvers for form validation

**Styling:**
- Tailwind CSS for utility-first styling
- PostCSS with Autoprefixer
- Custom CSS variables for theming

**Development Tools:**
- Vite plugins for development experience (@replit/vite-plugin-runtime-error-modal, cartographer, dev-banner)
- TypeScript for type checking
- Wouter for routing

**Session Management:**
- connect-pg-simple for PostgreSQL session store (configured but not actively used in current implementation)

**Fonts:**
- Google Fonts: Poppins (headings), Roboto (body text), plus additional fonts (Architects Daughter, DM Sans, Fira Code, Geist Mono)

**Date Handling:**
- date-fns for date formatting and manipulation

**Build Tools:**
- esbuild for server bundling
- tsx for TypeScript execution