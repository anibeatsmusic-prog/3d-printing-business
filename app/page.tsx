// app/page.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Printer, 
  Package, 
  Clock, 
  Award,
  Zap,
  Settings,
  ShoppingBag
} from "lucide-react";
import Link from "next/link";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              variants={fadeInUp}
            >
              Bring Your Ideas to Life with{" "}
              <span className="text-blue-600">3D Printing</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8"
              variants={fadeInUp}
            >
              High-quality custom 3D printing services. Fast delivery, professional results.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Link href="/order">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Your Order
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Browse Products
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 
              className="text-4xl font-bold text-center mb-12"
              variants={fadeInUp}
            >
              Why Choose Us?
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
            >
              {[
                {
                  icon: <Printer className="w-12 h-12" />,
                  title: "High Quality",
                  description: "Professional-grade printers with precision up to 0.1mm"
                },
                {
                  icon: <Zap className="w-12 h-12" />,
                  title: "Fast Delivery",
                  description: "Express delivery available in 24-48 hours"
                },
                {
                  icon: <Package className="w-12 h-12" />,
                  title: "Wide Selection",
                  description: "Multiple materials: PLA, PETG, ABS, TPU, and more"
                },
                {
                  icon: <Award className="w-12 h-12" />,
                  title: "Expert Support",
                  description: "Free consultation for your printing needs"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 
              className="text-4xl font-bold text-center mb-12"
              variants={fadeInUp}
            >
              Our Services
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Settings className="w-16 h-16 mb-4" />,
                  title: "Custom Printing",
                  description: "Upload your own design files (STL, OBJ, STEP) and we'll bring them to life with precision and quality.",
                  color: "blue"
                },
                {
                  icon: <ShoppingBag className="w-16 h-16 mb-4" />,
                  title: "Ready-Made Products",
                  description: "Browse our catalog of pre-designed 3D printed products ready for immediate shipment.",
                  color: "green"
                },
                {
                  icon: <Clock className="w-16 h-16 mb-4" />,
                  title: "Design Services",
                  description: "Need a custom design? Our team can help create 3D models tailored to your specifications.",
                  color: "purple"
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className={`text-${service.color}-600`}>{service.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 
              className="text-4xl font-bold text-center mb-4"
              variants={fadeInUp}
            >
              Our Portfolio
            </motion.h2>
            <motion.p 
              className="text-gray-600 text-center mb-12 text-lg"
              variants={fadeInUp}
            >
              See what we've created for our satisfied customers
            </motion.p>
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.03 }}
                  className="group relative overflow-hidden rounded-xl shadow-lg aspect-square bg-gray-100"
                >
                  <img
                    src={`https://placehold.co/400x400/3B82F6/white?text=Project+${index + 1}`}
                    alt={`3D Printed Project ${index + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-semibold">3D Print Project {index + 1}</p>
                      <p className="text-white/80 text-sm">Custom Design</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              className="text-4xl font-bold text-center mb-12"
              variants={fadeInUp}
            >
              Simple, Transparent Pricing
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-blue-500 transition-all"
              >
                <h3 className="text-2xl font-bold mb-2">Standard Service</h3>
                <div className="text-4xl font-bold text-blue-600 mb-6">
                  ฿2<span className="text-lg font-normal text-gray-600">/gram</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    5-7 business days
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    All materials available
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Standard finishing
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Free shipping on ฿1,000+
                  </li>
                </ul>
                <Link href="/order">
                  <Button className="w-full">Order Standard</Button>
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                  POPULAR
                </div>
                <h3 className="text-2xl font-bold mb-2">Express Service</h3>
                <div className="text-4xl font-bold mb-6">
                  ฿3<span className="text-lg font-normal text-blue-200">/gram</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    24-48 hours delivery
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Priority processing
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Premium finishing
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Free shipping on all orders
                  </li>
                </ul>
                <Link href="/order">
                  <Button variant="secondary" className="w-full">Order Express</Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "What file formats do you accept?",
                  answer: "We accept STL, OBJ, and STEP files. If you have a different format, please contact us and we'll do our best to help."
                },
                {
                  question: "What materials do you use?",
                  answer: "We offer PLA, PETG, ABS, TPU, wood-infused, and metal-infused filaments. Each material has different properties suitable for various applications."
                },
                {
                  question: "How long does delivery take?",
                  answer: "Standard service typically takes 5-7 business days, while express orders are delivered within 24-48 hours."
                },
                {
                  question: "Can I track my order?",
                  answer: "Yes! Once your order is confirmed, you'll receive tracking information via email to monitor your order status."
                },
                {
                  question: "Do you offer design services?",
                  answer: "Yes, our design team can help create custom 3D models based on your requirements. Contact us for a consultation."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">3D Printing Business</h3>
              <p className="text-gray-400">
                Professional 3D printing services bringing your ideas to life.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/products" className="hover:text-white">Products</Link></li>
                <li><Link href="/order" className="hover:text-white">Order</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@3dprint.business</li>
                <li>📱 +66 1 234 5678</li>
                <li>📍 Bangkok, Thailand</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} 3D Printing Business. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
