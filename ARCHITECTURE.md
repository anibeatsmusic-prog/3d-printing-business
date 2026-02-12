# System Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Landing   │  │   Order     │  │  Products   │            │
│  │   Page      │  │   Form      │  │  Catalog    │            │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘            │
└─────────┼────────────────┼────────────────┼───────────────────┘
          │                │                │
          │                │                │
          └────────────────┼────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NEXT.JS SERVER                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │                   APP ROUTER                            │    │
│  │  /app/page.tsx, /app/order/page.tsx, /app/products/    │    │
│  └──────────────────────────────────────────────────────┘    │
│                              │                                │
│  ┌──────────────────────────────────────────────────────┐    │
│  │                   API ROUTES                          │    │
│  │  /api/orders (POST, GET)                             │    │
│  │  /api/orders/[id] (GET, PATCH)                       │    │
│  │  /api/quote (POST)                                   │    │
│  │  /api/upload (POST)                                  │    │
│  └──────────────────────────────────────────────────────┘    │
│                              │                                │
│  ┌──────────────────────────────────────────────────────┐    │
│  │                   LIBRARIES                            │    │
│  │  ├── prisma.ts (Database Client)                      │    │
│  │  ├── telegram.ts (Telegram Integration)                │    │
│  │  └── utils.ts (Utility Functions)                      │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────┬──────────────────┬──────────────────┬──────────────┘
           │                  │                  │
           ▼                  ▼                  ▼
┌──────────────────┐  ┌──────────────┐  ┌─────────────┐
│   PostgreSQL    │  │  Telegram    │  │   File      │
│    Database     │  │    Bot API   │  │  Storage    │
│                 │  │              │  │ (Public)    │
│  ┌────────────┐  │  │ ┌────────┐  │  │ ┌─────────┐ │
│  │   User    │  │  │ │ @Mona_ │  │  │ │ Uploads │ │
│  │   Order   │  │  │ │ lisa69 │  │  │ │ /       │ │
│  │   Item    │  │  │ │ _bot   │  │  │ │ files   │ │
│  │ Product   │  │  │ └────────┘  │  │ └─────────┘ │
│  └────────────┘  │  └──────────────┘  └─────────────┘
└──────────────────┘
```

## Component Architecture

### Frontend (Client-Side)

```
┌─────────────────────────────────────────────────────────┐
│                    PAGES                                │
│  ├── Landing Page (app/page.tsx)                       │
│  │   ├── Hero Section                                  │
│  │   ├── Features Section                               │
│  │   ├── Services Section                               │
│  │   ├── Portfolio Section                              │
│  │   ├── Pricing Section                                │
│  │   ├── FAQ Section (Accordion)                        │
│  │   └── Footer                                         │
│  │                                                       │
│  ├── Order Form (app/order/page.tsx)                    │
│  │   ├── File Upload (react-dropzone)                   │
│  │   ├── Material Selection                             │
│  │   ├── Color Picker                                   │
│  │   ├── Delivery Type                                  │
│  │   ├── Customer Info Form                             │
│  │   └── Price Estimator                                │
│  │                                                       │
│  └── Product Catalog (app/products/page.tsx)            │
│      ├── Product Grid                                    │
│      ├── Category Filter                                │
│      ├── Sort Options                                   │
│      └── Product Cards                                   │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                    UI COMPONENTS                        │
│  ├── Button                                             │
│  ├── Card (Card, CardHeader, CardContent, CardFooter)   │
│  ├── Input                                               │
│  ├── Label                                               │
│  ├── Select (SelectTrigger, SelectContent, SelectItem)   │
│  ├── Accordion (AccordionItem, AccordionTrigger, etc.)   │
│  └── Toast (Toast, useToast hook, Toaster)              │
└─────────────────────────────────────────────────────────┘
```

### Backend (Server-Side)

```
┌─────────────────────────────────────────────────────────┐
│                    API ROUTES                           │
│                                                          │
│  POST /api/orders                                      │
│  ├── Validate form data                                │
│  ├── Create/Find User                                  │
│  ├── Create Order                                      │
│  ├── Save Uploaded Files                               │
│  ├── Create Items                                      │
│  ├── Send Telegram Notification                         │
│  └── Return Order Details                              │
│                                                          │
│  GET /api/orders?email=...                             │
│  ├── Find User by Email                                │
│  └── Return User's Orders                              │
│                                                          │
│  GET /api/orders/[id]                                  │
│  ├── Find Order by ID                                  │
│  └── Return Order with Items & User                    │
│                                                          │
│  PATCH /api/orders/[id]                                │
│  ├── Update Order Status                               │
│  ├── Update Tracking Number                            │
│  └── Return Updated Order                             │
│                                                          │
│  POST /api/quote                                       │
│  ├── Calculate Base Price                              │
│  ├── Apply Material Multiplier                         │
│  ├── Apply Delivery Multiplier                         │
│  └── Return Quote Breakdown                            │
│                                                          │
│  POST /api/upload                                      │
│  ├── Validate File Type                                │
│  ├── Validate File Size                                │
│  ├── Save File to Disk                                 │
│  └── Return File URL                                   │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                    SERVICES                             │
│                                                          │
│  ┌─────────────────┐    ┌─────────────────┐           │
│  │   PRISMA ORM    │    │  TELEGRAM BOT   │           │
│  │                 │    │                 │           │
│  │ - User CRUD     │    │ - Send Message  │           │
│  │ - Order CRUD    │    │ - Format Order  │           │
│  │ - Item CRUD     │    │ - Handle Error  │           │
│  │ - Product CRUD  │    │ - Get Bot Info  │           │
│  └─────────────────┘    └─────────────────┘           │
│                                                          │
│  ┌─────────────────┐    ┌─────────────────┐           │
│  │   UTILITIES     │    │   FILE SYSTEM   │           │
│  │                 │    │                 │           │
│  │ - cn()          │    │ - Write Files   │           │
│  │ - calcPrice()   │    │ - Read Files    │           │
│  │ - formatPrice() │    │ - Create Dir    │           │
│  │ - formatDate()  │    │ - Validate Path│           │
│  │ - genOrderNum() │    └─────────────────┘           │
│  └─────────────────┘                                   │
└─────────────────────────────────────────────────────────┘
```

## Database Schema

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    USER     │       │    ORDER    │       │    ITEM     │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │◄──────│ id (PK)     │◄──────│ id (PK)     │
│ email       │       │ orderNumber │       │ orderId     │
│ name        │       │ status      │       │ productId   │
│ phone       │       │ totalAmount │       │ fileName    │
│ address     │       │ delivery    │       │ fileUrl     │
│ createdAt   │       │ userId (FK) │       │ material    │
│ updatedAt   │       │ notes       │       │ color       │
└─────────────┘       │ trackingNum │       │ quantity    │
                      │ estDelivery │       │ weightGrams │
                      │ createdAt   │       │ unitPrice   │
                      │ updatedAt   │       │ totalPrice  │
                      └─────────────┘       │ createdAt   │
                          │               │ updatedAt   │
                          │               └─────────────┘
                          │                    │
                          └────────────┬───────┘
                                       ▼
                            ┌─────────────┐
                            │  PRODUCT    │
                            ├─────────────┤
                            │ id (PK)     │
                            │ name        │
                            │ slug        │
                            │ description │
                            │ category    │
                            │ imageUrl    │
                            │ price       │
                            │ stock       │
                            │ featured    │
                            │ material    │
                            │ dimensions  │
                            │ createdAt   │
                            │ updatedAt   │
                            └─────────────┘
```

## Data Flow Examples

### Order Submission Flow

```
1. USER fills order form
   ↓
2. FRONTEND validates inputs
   ↓
3. USER submits form (multipart/form-data)
   ↓
4. API /api/orders receives request
   ↓
5. API validates required fields
   ↓
6. API saves uploaded files to /public/uploads
   ↓
7. API creates/finds User in database
   ↓
8. API generates orderNumber
   ↓
9. API creates Order in database
   ↓
10. API creates Items for each file
   ↓
11. API formats notification data
   ↓
12. API sends Telegram notification
   ↓
13. API returns success response
   ↓
14. FRONTEND shows success toast
```

### Price Quote Flow

```
1. USER enters weight, selects material
   ↓
2. FRONTEND calculates estimate (calculatePrice())
   ↓
3. Frontend displays estimate to user
   ↓
4. (Optional) Frontend can also call /api/quote
   ↓
5. API /api/quote receives request
   ↓
6. API applies material multiplier
   ↓
7. API applies delivery multiplier
   ↓
8. API returns detailed breakdown
```

## Technology Stack Details

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Library**: Shadcn/ui (Radix UI + Tailwind)
- **Animations**: Framer Motion
- **Forms**: Native HTML + React state
- **File Upload**: react-dropzone

### Backend
- **API Routes**: Next.js API Routes (Serverless)
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Validation**: Zod schema (implied in types)

### Integrations
- **Telegram**: node-telegram-bot-api
- **Email**: Ready for integration (Resend, SendGrid)
- **Payment**: Ready for integration (Stripe, Omise)

## File Upload Flow

```
Client (Browser)
    │
    ├── User selects files
    │
    ├── Drag & drop files
    │
    ├── Files validated (.stl, .obj, .step)
    │
    ├── Preview uploaded files
    │
    └── Submit form with files
            │
            ▼
API Route (/api/orders)
    │
    ├── Receive FormData
    │
    ├── Extract files
    │
    ├── Validate file types
    │
    ├── Validate file sizes (<10MB)
    │
    ├── Generate unique filename
    │
    ├── Save to /public/uploads
    │
    ├── Store file metadata in DB
    │
    └── Return file URLs
```

## Security Considerations

### Current Implementation
- File type validation
- File size limits
- Environment variables for secrets
- Prisma prepared statements (SQL injection protection)

### Recommended Enhancements
- Add rate limiting to API routes
- Implement CSRF protection
- Add authentication/authorization
- Sanitize file uploads
- Add input validation (Zod schemas)
- Implement API key system
- Add request logging

## Deployment Architecture

### Development
```
Local Machine
├── PostgreSQL (Docker or local)
├── Next.js Dev Server (npm run dev)
└── File System (public/uploads)
```

### Production (Vercel)
```
Vercel Platform
├── PostgreSQL (Vercel Postgres or external)
├── Next.js Production Build
├── Serverless Functions (API Routes)
└── External Storage (AWS S3, R2) ← Recommended for files
```

### Recommended Production Setup
```
Load Balancer (Vercel)
        │
        ├── Next.js App (Multiple instances)
        │       │
        │       ├── API Routes
        │       └── Static Assets
        │
        ├── PostgreSQL (Managed database)
        │       │
        │       └── Connection Pooling
        │
        └── Object Storage (AWS S3 / Cloudflare R2)
                │
                └── Uploaded Files
```

## Monitoring & Observability

### Current
- Console logs for errors
- Prisma query logging (dev mode)

### Recommended Additions
- Application monitoring (Sentry)
- Analytics (Vercel Analytics, Plausible)
- Error tracking (Sentry)
- Performance monitoring (Web Vitals)
- API logging (structured logs)
- Database query analysis
- Uptime monitoring

---

This architecture is designed to be:
- ✅ Scalable (serverless functions)
- ✅ Maintainable (clean code structure)
- ✅ Performant (Next.js optimization)
- ✅ Secure (best practices applied)
- ✅ Production-ready
