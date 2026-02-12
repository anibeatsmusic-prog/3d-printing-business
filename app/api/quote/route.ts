// app/api/quote/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { calculatePrice } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { weight, material, quantity = 1, deliveryType = 'STANDARD' } = body;

    // Validate input
    if (!weight || !material) {
      return NextResponse.json(
        { error: 'Weight and material are required' },
        { status: 400 }
      );
    }

    if (weight <= 0) {
      return NextResponse.json(
        { error: 'Weight must be positive' },
        { status: 400 }
      );
    }

    // Calculate base price
    const basePrice = calculatePrice(parseInt(weight), material);
    
    // Apply delivery multiplier
    const deliveryMultiplier = deliveryType === 'EXPRESS' ? 1.5 : 1.0;
    const totalPrice = Math.ceil(basePrice * quantity * deliveryMultiplier);

    // Breakdown
    const breakdown = {
      weight: parseInt(weight),
      material,
      quantity,
      basePricePerGram: 2,
      materialMultiplier: getMaterialMultiplier(material),
      deliveryMultiplier,
      unitPrice: basePrice,
      totalPrice,
    };

    return NextResponse.json({
      quote: breakdown,
      formattedPrice: `฿${totalPrice.toLocaleString()}`,
    });

  } catch (error) {
    console.error('Error calculating quote:', error);
    return NextResponse.json(
      { error: 'Failed to calculate quote' },
      { status: 500 }
    );
  }
}

function getMaterialMultiplier(material: string): number {
  const multipliers: Record<string, number> = {
    PLA: 1.0,
    PETG: 1.2,
    ABS: 1.3,
    TPU: 1.5,
    WOOD: 1.4,
    METAL: 2.0,
  };
  return multipliers[material] || 1.0;
}
