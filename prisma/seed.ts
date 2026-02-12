// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create sample products
  const products = [
    {
      name: 'Custom Phone Stand',
      slug: 'custom-phone-stand',
      description: 'Elegant and functional phone stand for any desk. Perfect for video calls and watching content.',
      category: 'ACCESSORIES',
      imageUrl: 'https://placehold.co/600x600/3B82F6/white?text=Phone+Stand',
      price: 350,
      stock: 50,
      featured: true,
      material: 'PLA',
      dimensions: '100mm x 80mm x 40mm',
    },
    {
      name: 'Geometric Planter',
      slug: 'geometric-planter',
      description: 'Modern geometric planter for small plants. Adds a contemporary touch to any space.',
      category: 'HOME',
      imageUrl: 'https://placehold.co/600x600/10B981/white?text=Planter',
      price: 280,
      stock: 35,
      featured: true,
      material: 'PLA',
      dimensions: '90mm x 90mm x 80mm',
    },
    {
      name: 'Miniature Action Figure',
      slug: 'miniature-action-figure',
      description: 'Detailed 3D printed action figure base. Customizable with your own design.',
      category: 'TOYS',
      imageUrl: 'https://placehold.co/600x600/8B5CF6/white?text=Action+Figure',
      price: 450,
      stock: 20,
      featured: false,
      material: 'PETG',
      dimensions: '60mm x 40mm x 100mm',
    },
    {
      name: 'Wall Art Decor',
      slug: 'wall-art-decor',
      description: 'Beautiful 3D printed wall art piece. Intricate patterns and modern design.',
      category: 'ART',
      imageUrl: 'https://placehold.co/600x600/F97316/white?text=Wall+Art',
      price: 680,
      stock: 15,
      featured: true,
      material: 'PLA',
      dimensions: '200mm x 200mm x 20mm',
    },
    {
      name: 'Mechanical Parts Kit',
      slug: 'mechanical-parts-kit',
      description: 'Set of custom mechanical components for your projects. High precision and durability.',
      category: 'PARTS',
      imageUrl: 'https://placehold.co/600x600/6B7280/white?text=Mech+Parts',
      price: 890,
      stock: 40,
      featured: false,
      material: 'ABS',
      dimensions: 'Various sizes',
    },
    {
      name: 'Custom Keychain',
      slug: 'custom-keychain',
      description: 'Personalized 3D printed keychain. Great for gifts and promotional items.',
      category: 'ACCESSORIES',
      imageUrl: 'https://placehold.co/600x600/EC4899/white?text=Keychain',
      price: 150,
      stock: 100,
      featured: false,
      material: 'PLA',
      dimensions: '50mm x 30mm x 5mm',
    },
    {
      name: 'Pencil Holder',
      slug: 'pencil-holder',
      description: 'Stylish desk organizer for pens and pencils. Keeps your workspace tidy.',
      category: 'HOME',
      imageUrl: 'https://placehold.co/600x600/F59E0B/white?text=Pencil+Holder',
      price: 320,
      stock: 60,
      featured: false,
      material: 'PLA',
      dimensions: '80mm x 80mm x 100mm',
    },
    {
      name: 'Prototype Model',
      slug: 'prototype-model',
      description: 'High-quality prototype for product development. Perfect for testing and validation.',
      category: 'PROTOTYPES',
      imageUrl: 'https://placehold.co/600x600/EF4444/white?text=Prototype',
      price: 1200,
      stock: 10,
      featured: false,
      material: 'PETG',
      dimensions: 'Custom',
    },
    {
      name: 'Decorative Bowl',
      slug: 'decorative-bowl',
      description: 'Elegant decorative bowl for small items. Adds charm to any room.',
      category: 'HOME',
      imageUrl: 'https://placehold.co/600x600/14B8A6/white?text=Decorative+Bowl',
      price: 390,
      stock: 25,
      featured: true,
      material: 'PLA',
      dimensions: '120mm diameter x 50mm height',
    },
    {
      name: 'Gaming Controller Stand',
      slug: 'gaming-controller-stand',
      description: 'Sleek stand for your gaming controllers. Keeps them organized and ready.',
      category: 'ACCESSORIES',
      imageUrl: 'https://placehold.co/600x600/7C3AED/white?text=Controller+Stand',
      price: 420,
      stock: 30,
      featured: false,
      material: 'PETG',
      dimensions: '100mm x 80mm x 60mm',
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log('Database seed completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
