import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate unique order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `3DP-${timestamp}-${random}`;
}

// Format price in currency
export function formatPrice(price: number | string): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(numPrice);
}

// Format date
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

// Calculate estimated price based on weight and material
export function calculatePrice(weightGrams: number, material: string): number {
  const basePricePerGram = 2; // Base price per gram in THB
  const materialMultiplier: Record<string, number> = {
    PLA: 1.0,
    PETG: 1.2,
    ABS: 1.3,
    TPU: 1.5,
    WOOD: 1.4,
    METAL: 2.0,
  };
  
  const multiplier = materialMultiplier[material] || 1.0;
  return Math.ceil(weightGrams * basePricePerGram * multiplier);
}
