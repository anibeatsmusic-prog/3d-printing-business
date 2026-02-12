// app/order/page.tsx
"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Upload, X, CheckCircle, Loader2, DollarSign } from "lucide-react";
import Link from "next/link";
import { calculatePrice } from "@/lib/utils";

const MATERIALS = [
  { value: "PLA", label: "PLA (Standard)" },
  { value: "PETG", label: "PETG (Durable)" },
  { value: "ABS", label: "ABS (Strong)" },
  { value: "TPU", label: "TPU (Flexible)" },
  { value: "WOOD", label: "Wood-Infused" },
  { value: "METAL", label: "Metal-Infused" }
];

const COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Red", hex: "#EF4444" },
  { name: "Blue", hex: "#3B82F6" },
  { name: "Green", hex: "#10B981" },
  { name: "Yellow", hex: "#F59E0B" },
  { name: "Orange", hex: "#F97316" },
  { name: "Purple", hex: "#8B5CF6" },
  { name: "Pink", hex: "#EC4899" },
  { name: "Gray", hex: "#6B7280" }
];

export default function OrderPage() {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderData, setOrderData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    material: "PLA",
    color: "Black",
    quantity: 1,
    deliveryType: "STANDARD",
    weight: "",
    notes: ""
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return ['stl', 'obj', 'step'].includes(extension || '');
    });

    if (validFiles.length < acceptedFiles.length) {
      toast({
        title: "Some files were rejected",
        description: "Only .stl, .obj, and .step files are accepted.",
        variant: "destructive"
      });
    }

    setFiles(prev => [...prev, ...validFiles]);
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'model/stl': ['.stl'],
      'model/obj': ['.obj'],
      'model/step': ['.step']
    },
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (field: string, value: string | number) => {
    setOrderData(prev => ({ ...prev, [field]: value }));
  };

  const estimatedPrice = files.length > 0 && orderData.weight
    ? calculatePrice(parseInt(orderData.weight), orderData.material) * orderData.quantity
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload at least one 3D model file.",
        variant: "destructive"
      });
      return;
    }

    if (!orderData.weight) {
      toast({
        title: "Weight required",
        description: "Please provide the estimated weight of your model.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });
      formData.append('name', orderData.name);
      formData.append('email', orderData.email);
      formData.append('phone', orderData.phone);
      formData.append('address', orderData.address);
      formData.append('material', orderData.material);
      formData.append('color', orderData.color);
      formData.append('quantity', orderData.quantity.toString());
      formData.append('deliveryType', orderData.deliveryType);
      formData.append('weight', orderData.weight);
      formData.append('notes', orderData.notes);

      const response = await fetch('/api/orders', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const result = await response.json();

      toast({
        title: "Order submitted successfully!",
        description: `Your order #${result.orderNumber} has been received.`,
      });

      // Reset form
      setFiles([]);
      setOrderData({
        name: "",
        email: "",
        phone: "",
        address: "",
        material: "PLA",
        color: "Black",
        quantity: 1,
        deliveryType: "STANDARD",
        weight: "",
        notes: ""
      });

    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Error submitting order",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4">← Back to Home</Button>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Custom 3D Print Order</h1>
            <p className="text-gray-600">Upload your 3D model files and get an instant quote</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* File Upload Section */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Upload 3D Model Files</CardTitle>
                  <CardDescription>
                    Upload STL, OBJ, or STEP files (max 10MB each)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    {isDragActive ? (
                      <p className="text-blue-600">Drop the files here...</p>
                    ) : (
                      <div>
                        <p className="text-gray-600 mb-2">
                          Drag & drop files here, or click to select
                        </p>
                        <p className="text-sm text-gray-400">
                          Supports: .stl, .obj, .step (max 10MB)
                        </p>
                      </div>
                    )}
                  </div>

                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map((file, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Details</CardTitle>
                  <CardDescription>Specify material and quantity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="weight">Estimated Weight (grams) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={orderData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      placeholder="e.g., 50"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="material">Material</Label>
                    <Select value={orderData.material} onValueChange={(value) => handleInputChange('material', value)}>
                      <SelectTrigger id="material">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MATERIALS.map(material => (
                          <SelectItem key={material.value} value={material.value}>
                            {material.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="color">Color</Label>
                    <div className="grid grid-cols-5 gap-2 mt-2">
                      {COLORS.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() => handleInputChange('color', color.name)}
                          className={`relative w-10 h-10 rounded-full border-2 transition-transform ${
                            orderData.color === color.name
                              ? 'border-blue-500 scale-110'
                              : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Selected: {orderData.color}</p>
                  </div>

                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={orderData.quantity}
                      onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="delivery">Delivery Type</Label>
                    <Select value={orderData.deliveryType} onValueChange={(value) => handleInputChange('deliveryType', value)}>
                      <SelectTrigger id="delivery">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="STANDARD">Standard (5-7 days)</SelectItem>
                        <SelectItem value="EXPRESS">Express (24-48 hours)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Input
                      id="notes"
                      value={orderData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Any special requirements..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Customer Info & Price Estimate */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Information</CardTitle>
                    <CardDescription>How should we contact you?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={orderData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={orderData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={orderData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Input
                        id="address"
                        value={orderData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Price Estimate */}
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Price Estimate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {estimatedPrice > 0 ? (
                      <div>
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          ฿{estimatedPrice.toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-600">
                          {orderData.deliveryType === 'EXPRESS' ? 'Express pricing applied' : 'Standard pricing'}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        Upload files and enter weight to see estimate
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg"
                  disabled={isSubmitting || files.length === 0}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Order"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
