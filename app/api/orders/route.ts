// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateOrderNumber, calculatePrice } from '@/lib/utils';
import { sendOrderNotification } from '@/lib/telegram';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Get form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const material = formData.get('material') as string;
    const color = formData.get('color') as string;
    const quantity = parseInt(formData.get('quantity') as string) || 1;
    const deliveryType = formData.get('deliveryType') as string;
    const weight = parseInt(formData.get('weight') as string);
    const notes = formData.get('notes') as string;

    // Get uploaded files
    const files = formData.getAll('files') as File[];
    
    // Validate required fields
    if (!name || !email || !phone || !address || !weight) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      );
    }

    // Calculate total price
    const unitPrice = calculatePrice(weight, material);
    const totalPrice = unitPrice * quantity;

    // Create or get user
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        phone,
        address,
      },
      create: {
        email,
        name,
        phone,
        address,
      },
    });

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: user.id,
        totalAmount: totalPrice,
        deliveryType: deliveryType as any,
        notes: notes || null,
        // Calculate estimated delivery date
        estimatedDelivery: new Date(
          Date.now() + (deliveryType === 'EXPRESS' ? 2 : 7) * 24 * 60 * 60 * 1000
        ),
      },
    });

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Create items for each file
    const itemsData = [];
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Generate unique filename
      const timestamp = Date.now();
      const filename = `${orderNumber}-${timestamp}-${file.name}`;
      const filepath = join(uploadsDir, filename);
      
      // Save file
      await writeFile(filepath, buffer);
      
      // Create item in database
      const item = await prisma.item.create({
        data: {
          orderId: order.id,
          fileName: file.name,
          fileUrl: `/uploads/${filename}`,
          fileSize: file.size,
          material: material as any,
          color,
          quantity,
          weightGrams: weight,
          unitPrice,
          totalPrice: unitPrice * quantity,
        },
      });

      itemsData.push({
        type: 'custom',
        fileName: file.name,
        material,
        color,
        quantity,
        price: item.totalPrice,
      });
    }

    // Send Telegram notification
    try {
      await sendOrderNotification({
        orderNumber,
        customerName: name,
        email,
        phone,
        address,
        items: itemsData,
        totalAmount: totalPrice,
        deliveryType,
        notes: notes || undefined,
      });
    } catch (telegramError) {
      console.error('Failed to send Telegram notification:', telegramError);
      // Don't fail the order if Telegram fails
    }

    return NextResponse.json({
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        estimatedDelivery: order.estimatedDelivery,
      },
      message: 'Order submitted successfully',
    });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        orders: {
          include: {
            items: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ orders: user.orders });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
