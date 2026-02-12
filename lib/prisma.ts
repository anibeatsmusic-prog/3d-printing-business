// Mock prisma client for development
export const prisma = {
  user: {
    upsert: async ({ where, update, create }: any) => {
      // Mock upsert implementation
      return {
        id: `mock-user-${Date.now()}`,
        ...where,
        ...create,
        ...update
      };
    },
    findUnique: async ({ where, include }: any) => {
      // Mock findUnique implementation
      if (where.email) {
        return {
          id: `mock-user-${Date.now()}`,
          email: where.email,
          name: 'Mock User',
          phone: '000-000-0000',
          address: 'Mock Address',
          orders: include?.orders ? [] : undefined
        };
      }
      return null;
    }
  },
  order: {
    create: async (data: any) => {
      return {
        id: `mock-order-${Date.now()}`,
        orderNumber: `ORDER-${Date.now()}`,
        totalAmount: data.data.totalAmount,
        estimatedDelivery: data.data.estimatedDelivery,
        userId: data.data.userId
      };
    }
  },
  item: {
    create: async (data: any) => {
      return {
        id: `mock-item-${Date.now()}`,
        orderId: data.data.orderId,
        fileName: data.data.fileName,
        fileUrl: data.data.fileUrl,
        fileSize: data.data.fileSize,
        material: data.data.material,
        color: data.data.color,
        quantity: data.data.quantity,
        weightGrams: data.data.weightGrams,
        unitPrice: data.data.unitPrice,
        totalPrice: data.data.totalPrice
      };
    }
  }
};