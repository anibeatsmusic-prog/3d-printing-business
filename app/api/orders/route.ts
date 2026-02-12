// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateOrderNumber, calculatePrice } from '@/lib/utils';
import { sendOrderNotification } from '@/lib/telegram';

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
    const files: any[] = [];
    
    // Validate required fields
    if (!name || !email || !phone || !address || !weight) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate total price
    const unitPrice = calculatePrice(weight, material);
    const totalPrice = unitPrice * quantity;

    // Generate order number
    const orderNumber = generateOrderNumber();

    // Mock order creation
    const order = {
      id: `mock-order-${Date.now()}`,
      orderNumber,
      totalAmount: totalPrice,
      estimatedDelivery: new Date(
        Date.now() + (deliveryType === 'EXPRESS' ? 2 : 7) * 24 * 60 * 60 * 1000
      ).toISOString(),
    };

    // Create items for each file
    const itemsData = [];
    for (let i = 0; i < Math.min(files.length, 1); i++) {
      const file = { name: 'mock-file.stl', size: 1024 }; // Mock file
      itemsData.push({
        type: 'custom',
        fileName: file.name,
        material,
        color,
        quantity,
        price: unitPrice * quantity,
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
        items: itemsData,
      },
      message: 'Order submitted successfully (mock)',
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

    // Mock user and orders
    const user = {
      orders: [
        {
          id: 'mock-order-1',
          orderNumber: '3DP-MOCK123',
          totalAmount: 500,
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
          items: [
            {
              type: 'custom',
              fileName: 'sample.stl',
              material: 'PLA',
              color: 'red',
              quantity: 1,
              price: 500,
            }
          ]
        }
      ]
    };

    return NextResponse.json({ orders: user.orders });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}