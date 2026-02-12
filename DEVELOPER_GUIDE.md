# Developer Guide

Quick reference for developers working on this 3D printing business website.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your values

# Setup database
npm run db:push

# Seed database
npm run db:seed

# Start development
npm run dev
```

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
npm run db:push   # Push schema to database
npm run db:studio # Open Prisma Studio
npm run db:seed   # Seed database with sample data
```

## Project Structure

### Frontend (Pages)
- `app/page.tsx` - Landing page
- `app/order/page.tsx` - Custom order form
- `app/products/page.tsx` - Product catalog

### Backend (API Routes)
- `app/api/orders/route.ts` - Order CRUD operations
- `app/api/orders/[id]/route.ts` - Single order operations
- `app/api/quote/route.ts` - Price estimation
- `app/api/upload/route.ts` - File upload

### Components
- `components/ui/` - Shadcn/ui components

### Libraries
- `lib/prisma.ts` - Database client
- `lib/telegram.ts` - Telegram integration
- `lib/utils.ts` - Utility functions

### Database
- `prisma/schema.prisma` - Database schema
- `prisma/seed.ts` - Database seeding

## Database Models

### User
```typescript
{
  id: string
  email: string
  name?: string
  phone?: string
  address?: string
  orders: Order[]
}
```

### Order
```typescript
{
  id: string
  orderNumber: string
  status: OrderStatus
  totalAmount: Decimal
  deliveryType: DeliveryType
  notes?: string
  trackingNumber?: string
  estimatedDelivery?: Date
  userId: string
  items: Item[]
}
```

### Item
```typescript
{
  id: string
  orderId: string
  product?: Product
  productId?: string
  fileName?: string
  fileUrl?: string
  fileSize?: number
  material: MaterialType
  color: string
  quantity: number
  weightGrams?: number
  unitPrice: Decimal
  totalPrice: Decimal
}
```

### Product
```typescript
{
  id: string
  name: string
  slug: string
  description: string
  category: ProductCategory
  imageUrl: string
  price: Decimal
  stock: number
  featured: boolean
  material?: MaterialType
  dimensions?: string
}
```

## Utility Functions

### cn(...inputs)
Merge Tailwind CSS classes with precedence.

```typescript
import { cn } from '@/lib/utils';

cn('base-class', 'additional-class', condition && 'conditional-class')
```

### calculatePrice(weight: number, material: string): number
Calculate price based on weight and material.

```typescript
const price = calculatePrice(50, 'PLA'); // Returns 100 (50g × ฿2 × 1.0)
```

### formatPrice(price: number | string): string
Format price as Thai Baht currency.

```typescript
const formatted = formatPrice(1234.56); // Returns "฿1,234.56"
```

### formatDate(date: Date | string): string
Format date in Thai locale.

```typescript
const date = formatDate(new Date()); // Returns "12 มกราคม 2025"
```

### generateOrderNumber(): string
Generate unique order number.

```typescript
const orderNumber = generateOrderNumber(); // Returns "3DP-XYZ123-ABCD"
```

## Telegram Integration

### sendOrderNotification(data)
Send formatted order notification to Telegram.

```typescript
import { sendOrderNotification } from '@/lib/telegram';

await sendOrderNotification({
  orderNumber: '3DP-XYZ123',
  customerName: 'John Doe',
  email: 'john@example.com',
  phone: '+66 123 456 789',
  items: [{ type: 'custom', material: 'PLA', ... }],
  totalAmount: 200,
  deliveryType: 'STANDARD'
});
```

### sendTelegramMessage(message)
Send simple text message.

```typescript
await sendTelegramMessage('Custom message here');
```

## API Usage Examples

### Create Order

```typescript
const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('email', 'john@example.com');
formData.append('phone', '+66 123 456 789');
formData.append('address', '123 Main St');
formData.append('material', 'PLA');
formData.append('color', 'Black');
formData.append('quantity', '2');
formData.append('deliveryType', 'STANDARD');
formData.append('weight', '50');
formData.append('file', fileObject);

const response = await fetch('/api/orders', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data.order); // { id, orderNumber, totalAmount, estimatedDelivery }
```

### Get Quote

```typescript
const response = await fetch('/api/quote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    weight: 50,
    material: 'PLA',
    quantity: 2,
    deliveryType: 'STANDARD'
  })
});

const data = await response.json();
console.log(data.quote.totalPrice); // 200
```

### Upload File

```typescript
const formData = new FormData();
formData.append('file', fileObject);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data.file.url); // '/uploads/timestamp-random-filename.stl'
```

## Styling Conventions

### Colors
```css
/* Primary (Blue) */
bg-primary text-primary-foreground
hover:bg-primary/90

/* Secondary */
bg-secondary text-secondary-foreground
hover:bg-secondary/80

/* Muted */
bg-muted text-muted-foreground

/* Accent */
bg-accent text-accent-foreground
```

### Spacing
```css
p-4   /* 1rem (16px) */
py-8  /* 2rem (32px) */
px-12 /* 3rem (48px) */
```

### Typography
```css
text-sm   /* 14px */
text-base /* 16px */
text-lg   /* 18px */
text-xl   /* 20px */
text-2xl  /* 24px */
text-4xl  /* 36px */
font-semibold
font-bold
```

### Flexbox
```css
flex flex-col
flex flex-row
justify-between
items-center
gap-4
```

### Grid
```css
grid grid-cols-1
grid md:grid-cols-2
grid lg:grid-cols-3
gap-6
```

## State Management

### useState (Local State)
```typescript
const [files, setFiles] = useState<File[]>([]);
const [isSubmitting, setIsSubmitting] = useState(false);

setFiles(prev => [...prev, newFile]);
```

### useToast (Notifications)
```typescript
import { useToast } from '@/components/ui/use-toast';

const { toast } = useToast();

toast({
  title: 'Success',
  description: 'Order submitted!',
  variant: 'default' // or 'destructive'
});
```

### Form State
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  material: 'PLA',
  // ...
});

const handleChange = (field: string, value: any) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};
```

## File Upload Pattern

```typescript
import { useDropzone } from 'react-dropzone';

const onDrop = useCallback((acceptedFiles) => {
  setFiles(prev => [...prev, ...acceptedFiles]);
}, []);

const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  accept: { 'model/stl': ['.stl'] },
  maxSize: 10 * 1024 * 1024 // 10MB
});

// In JSX
<div {...getRootProps()}>
  <input {...getInputProps()} />
  {isDragActive ? 'Drop files here' : 'Drag & drop files'}
</div>
```

## Animation Pattern (Framer Motion)

```typescript
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div
  initial="hidden"
  animate="visible"
  variants={variants}
  transition={{ duration: 0.5 }}
>
  Content here
</motion.div>
```

## Responsive Design

```tsx
{/* Mobile-first approach */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</div>

{/* Responsive text */}
<h1 className="text-4xl md:text-6xl">Heading</h1>

{/* Hidden on mobile */}
<div className="hidden md:block">
  Desktop only content
</div>
```

## Error Handling

### API Routes
```typescript
try {
  // Database operation
} catch (error) {
  console.error('Error:', error);
  return NextResponse.json(
    { error: 'Operation failed' },
    { status: 500 }
  );
}
```

### Client Side
```typescript
try {
  const response = await fetch('/api/orders');
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  const data = await response.json();
} catch (error) {
  toast({
    title: 'Error',
    description: 'Something went wrong',
    variant: 'destructive'
  });
}
```

## Testing Tips

### Test API Routes
```bash
# Create order
curl -X POST http://localhost:3000/api/orders \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "phone=1234567890" \
  -F "address=Test Address" \
  -F "weight=50" \
  -F "material=PLA" \
  -F "files=@test.stl"

# Get quote
curl -X POST http://localhost:3000/api/quote \
  -H "Content-Type: application/json" \
  -d '{"weight":50,"material":"PLA","quantity":1}'
```

### View Database
```bash
npm run db:studio
# Opens Prisma Studio at http://localhost:5555
```

## Common Patterns

### Fetch Data with Loading State
```typescript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData)
    .finally(() => setLoading(false));
}, []);

if (loading) return <Loader />;
```

### Debounced Search
```typescript
import { useState, useEffect } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};
```

### Local Storage
```typescript
// Save
localStorage.setItem('key', JSON.stringify(data));

// Load
const data = JSON.parse(localStorage.getItem('key') || 'null');
```

## Environment Variables

Access with:
```typescript
process.env.VARIABLE_NAME
```

Required variables:
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

## Performance Tips

1. **Use Next.js Image component** for images
2. **Lazy load** heavy components
3. **Cache API responses** when possible
4. **Optimize database queries** with `select` and `include`
5. **Use pagination** for large lists
6. **Compress images** before upload
7. **Use static generation** for static pages

## Security Best Practices

1. **Never expose** API keys or secrets in client code
2. **Validate all inputs** on the server
3. **Sanitize user uploads**
4. **Use environment variables** for sensitive data
5. **Implement rate limiting** on API routes
6. **Use HTTPS** in production
7. **Keep dependencies updated**

## Debugging

### Enable Prisma Query Logging
```env
DATABASE_URL="postgresql://...?loglevel=debug"
```

### Console Log API Responses
```typescript
const response = await fetch('/api/orders');
const data = await response.json();
console.log('API Response:', data);
```

### Check Network Requests
Open browser DevTools → Network tab to inspect API calls.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)

---

Happy coding! 🚀
