// app/products/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Package, Filter } from "lucide-react";
import Link from "next/link";

// Sample product data (would come from database in production)
const PRODUCTS = [
  {
    id: "1",
    name: "Custom Phone Stand",
    slug: "custom-phone-stand",
    description: "Elegant and functional phone stand for any desk",
    price: 350,
    category: "ACCESSORIES",
    imageUrl: "https://placehold.co/300x300/3B82F6/white?text=Phone+Stand",
    material: "PLA",
    stock: 50
  },
  {
    id: "2",
    name: "Geometric Planter",
    slug: "geometric-planter",
    description: "Modern geometric planter for small plants",
    price: 280,
    category: "HOME",
    imageUrl: "https://placehold.co/300x300/10B981/white?text=Planter",
    material: "PLA",
    stock: 35
  },
  {
    id: "3",
    name: "Miniature Action Figure",
    slug: "miniature-action-figure",
    description: "Detailed 3D printed action figure base",
    price: 450,
    category: "TOYS",
    imageUrl: "https://placehold.co/300x300/8B5CF6/white?text=Action+Figure",
    material: "PETG",
    stock: 20
  },
  {
    id: "4",
    name: "Wall Art Decor",
    slug: "wall-art-decor",
    description: "Beautiful 3D printed wall art piece",
    price: 680,
    category: "ART",
    imageUrl: "https://placehold.co/300x300/F97316/white?text=Wall+Art",
    material: "PLA",
    stock: 15
  },
  {
    id: "5",
    name: "Mechanical Parts Kit",
    slug: "mechanical-parts-kit",
    description: "Set of custom mechanical components",
    price: 890,
    category: "PARTS",
    imageUrl: "https://placehold.co/300x300/6B7280/white?text=Mech+Parts",
    material: "ABS",
    stock: 40
  },
  {
    id: "6",
    name: "Custom Keychain",
    slug: "custom-keychain",
    description: "Personalized 3D printed keychain",
    price: 150,
    category: "ACCESSORIES",
    imageUrl: "https://placehold.co/300x300/EC4899/white?text=Keychain",
    material: "PLA",
    stock: 100
  },
  {
    id: "7",
    name: "Pencil Holder",
    slug: "pencil-holder",
    description: "Stylish desk organizer for pens and pencils",
    price: 320,
    category: "HOME",
    imageUrl: "https://placehold.co/300x300/F59E0B/white?text=Pencil+Holder",
    material: "PLA",
    stock: 60
  },
  {
    id: "8",
    name: "Prototype Model",
    slug: "prototype-model",
    description: "High-quality prototype for product development",
    price: 1200,
    category: "PROTOTYPES",
    imageUrl: "https://placehold.co/300x300/EF4444/white?text=Prototype",
    material: "PETG",
    stock: 10
  }
];

const CATEGORIES = [
  { value: "ALL", label: "All Categories" },
  { value: "TOYS", label: "Toys" },
  { value: "HOME", label: "Home" },
  { value: "ACCESSORIES", label: "Accessories" },
  { value: "ART", label: "Art" },
  { value: "PROTOTYPES", label: "Prototypes" },
  { value: "PARTS", label: "Parts" }
];

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z-A" }
];

export default function ProductsPage() {
  const { toast } = useToast();
  const [category, setCategory] = useState("ALL");
  const [sort, setSort] = useState("default");

  const filteredProducts = PRODUCTS.filter(product => 
    category === "ALL" || product.category === category
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const handleOrderNow = (productId: string) => {
    toast({
      title: "Added to cart!",
      description: "Proceeding to checkout...",
    });
    // In production, this would add to cart and redirect to checkout
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <Button variant="secondary" className="mb-4">← Back to Home</Button>
            </Link>
            <h1 className="text-5xl font-bold mb-4">Ready-Made Products</h1>
            <p className="text-xl text-blue-100">
              Browse our collection of pre-designed 3D printed products
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 flex-1">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="font-semibold">Filter by:</span>
            </div>
            <div className="flex-1">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.3 }
                }
              }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    {product.category}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4 flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Package className="w-4 h-4" />
                    <span>Material: {product.material}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <span>Stock: {product.stock} available</span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between pt-2 border-t">
                  <div className="text-2xl font-bold text-blue-600">
                    ฿{product.price.toLocaleString()}
                  </div>
                  <Button
                    onClick={() => handleOrderNow(product.id)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Order Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {sortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
