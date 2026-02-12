# 3D Printing Business Website

A modern, professional website for a 3D printing business with custom order management, product catalog, and Telegram bot integration.

## Features

- 🎨 **Beautiful Landing Page** - Modern design with smooth animations
- 📦 **Product Catalog** - Browse ready-made 3D printed products
- 🛒 **Custom Order Form** - Upload 3D models (.stl, .obj, .step) and get instant quotes
- 💬 **Telegram Integration** - Automatic order notifications to bot @Mona_lisa69_bot
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⚡ **Fast & Efficient** - Built with Next.js 14 and optimized for performance

## Tech Stack

- **Frontend**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **File Upload**: Native Next.js handling
- **Animations**: Framer Motion

## Project Structure

```
3d-printing-site/
├── app/
│   ├── api/
│   │   ├── orders/
│   │   │   ├── route.ts          # POST (create order), GET (list orders)
│   │   │   └── [id]/route.ts     # GET (single order), PATCH (update)
│   │   ├── quote/
│   │   │   └── route.ts          # POST (get price estimate)
│   │   └── upload/
│   │       └── route.ts          # POST (file upload)
│   ├── globals.css               # Global styles and Tailwind directives
│   ├── layout.tsx                # Root layout with Toaster
│   ├── page.tsx                  # Landing page
│   ├── order/
│   │   └── page.tsx              # Custom order form
│   └── products/
│       └── page.tsx              # Product catalog
├── components/
│   └── ui/                       # Shadcn/ui components
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   ├── telegram.ts               # Telegram bot integration
│   └── utils.ts                  # Utility functions
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Database seeding
└── public/
    └── uploads/                  # Uploaded files storage
```

## Installation

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Telegram bot token (from @BotFather)

### Step 1: Clone and Install Dependencies

```bash
cd 3d-printing-site
npm install
```

### Step 2: Set Up Environment Variables

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/3dprinting?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
TELEGRAM_BOT_TOKEN="your-telegram-bot-token"
TELEGRAM_CHAT_ID="your-chat-id"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
MAX_FILE_SIZE=10485760
```

**Getting Telegram Bot Token:**
1. Message @BotFather on Telegram
2. Create a new bot: `/newbot`
3. Follow instructions to get your bot token
4. Note your bot token in `.env`

**Getting Chat ID:**
1. Start a chat with your bot
2. Send any message
3. Visit: `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
4. Find your `chat.id` in the response

### Step 3: Set Up Database

```bash
# Push database schema
npm run db:push

# Seed sample products (optional)
npm run db:seed

# Open Prisma Studio to view database (optional)
npm run db:studio
```

### Step 4: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Database Schema

### Models

**User**
- Customer information (email, name, phone, address)
- One-to-many relationship with Orders

**Order**
- Order details (status, pricing, delivery type)
- Links to User and Items
- Enums: OrderStatus, DeliveryType

**Item**
- Individual items in an order (custom or product)
- Material, color, quantity, weight, pricing
- Links to Order and Product (optional)

**Product**
- Ready-made products catalog
- Category, price, stock, dimensions
- Enums: ProductCategory, MaterialType

## API Endpoints

### Orders
- `POST /api/orders` - Submit new order
- `GET /api/orders?email=user@example.com` - Get user's orders
- `GET /api/orders/[id]` - Get specific order
- `PATCH /api/orders/[id]` - Update order status/tracking

### Quote
- `POST /api/quote` - Get price estimate
  ```json
  {
    "weight": 50,
    "material": "PLA",
    "quantity": 2,
    "deliveryType": "STANDARD"
  }
  ```

### Upload
- `POST /api/upload` - Upload 3D model file
- `GET /api/upload` - Upload endpoint info

## Pricing Logic

Base price is calculated as:
```
Price = Weight (g) × Base Price (฿2/g) × Material Multiplier × Delivery Multiplier
```

**Material Multipliers:**
- PLA: 1.0x
- PETG: 1.2x
- ABS: 1.3x
- TPU: 1.5x
- Wood: 1.4x
- Metal: 2.0x

**Delivery Types:**
- Standard: 5-7 days, 1.0x multiplier
- Express: 24-48 hours, 1.5x multiplier

## Building for Production

```bash
npm run build
npm start
```

## Deployment (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

**Note:** For file uploads in production, ensure Vercel's serverless functions have enough memory and the `public/uploads` directory is properly handled. Consider using external storage (AWS S3, Cloudflare R2) for production file storage.

## Known Limitations

1. **File Storage**: Files are stored locally in `public/uploads`. For production, use cloud storage (AWS S3, etc.)
2. **Authentication**: No user authentication implemented. Add NextAuth for secure user accounts.
3. **Payment Gateway**: No payment processing integrated. Add Stripe, Omise, or similar.
4. **Admin Panel**: No admin dashboard for managing orders.
5. **Email Notifications**: Telegram only. Add email notifications (Resend, SendGrid) for customer updates.
6. **Real-time Updates**: No WebSocket or real-time order status updates.

## Future Improvements

1. **User Authentication**
   - Add NextAuth with email/password and OAuth
   - User dashboard to view order history

2. **Payment Integration**
   - Stripe for international payments
   - Omise/Krungsray for Thai payments
   - PromptPay QR code support

3. **Admin Dashboard**
   - Order management interface
   - Product CRUD operations
   - Analytics and reports

4. **Enhanced Features**
   - Real-time order tracking
   - Customer reviews/ratings
   - Order comparison
   - Bulk ordering discounts
   - Loyalty program

5. **Performance**
   - Image optimization (already in Next.js)
   - CDN for static assets
   - Database query optimization
   - API response caching

6. **SEO**
   - Add meta tags for all pages
   - Generate sitemap
   - robots.txt
   - Schema markup

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env`
- Verify database credentials

### File Upload Not Working
- Ensure `public/uploads` directory exists
- Check file size limits in `.env`
- Verify API route permissions

### Telegram Bot Not Working
- Verify bot token is correct
- Check chat ID is correct
- Ensure bot has proper permissions

## Support

For issues or questions, please contact:
- Email: info@3dprint.business
- Telegram: @Mona_lisa69_bot

## License

This project is proprietary software. All rights reserved.
