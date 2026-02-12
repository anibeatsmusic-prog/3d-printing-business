// lib/telegram.ts
import TelegramBot from 'node-telegram-bot-api';

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

let bot: TelegramBot | null = null;

// Initialize bot only if token is provided
if (botToken) {
  bot = new TelegramBot(botToken);
}

interface OrderNotificationData {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  items: Array<{
    type: 'custom' | 'product';
    name?: string;
    fileName?: string;
    material: string;
    color: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  deliveryType: string;
  address?: string;
  notes?: string;
}

/**
 * Format order details for Telegram notification
 */
function formatOrderNotification(data: OrderNotificationData): string {
  const itemsList = data.items.map((item, index) => {
    const itemName = item.type === 'product' 
      ? `📦 ${item.name}` 
      : `🔧 Custom: ${item.fileName || 'No filename'}`;
    
    return `${index + 1}. ${itemName}
   Material: ${item.material}
   Color: ${item.color}
   Qty: ${item.quantity}
   Price: ฿${item.price.toLocaleString()}`;
  }).join('\n\n');

  return `
🎉 <b>NEW ORDER RECEIVED!</b>

📋 <b>Order #${data.orderNumber}</b>

👤 <b>Customer Info:</b>
   Name: ${data.customerName}
   Email: ${data.email}
   Phone: ${data.phone}
   ${data.address ? `Address: ${data.address}` : ''}

🛒 <b>Order Items:</b>
${itemsList}

💰 <b>Total: ฿${data.totalAmount.toLocaleString()}</b>

🚚 <b>Delivery:</b> ${data.deliveryType}
${data.notes ? `📝 <b>Notes:</b> ${data.notes}` : ''}

⏰ <i>${new Date().toLocaleString('th-TH')}</i>
  `.trim();
}

/**
 * Send order notification to Telegram bot
 */
export async function sendOrderNotification(data: OrderNotificationData): Promise<boolean> {
  if (!bot || !chatId) {
    console.error('Telegram bot not configured');
    return false;
  }

  try {
    const message = formatOrderNotification(data);
    await bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
    console.log('Telegram notification sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
}

/**
 * Send simple text message to Telegram
 */
export async function sendTelegramMessage(message: string): Promise<boolean> {
  if (!bot || !chatId) {
    console.error('Telegram bot not configured');
    return false;
  }

  try {
    await bot.sendMessage(chatId, message);
    return true;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
}

/**
 * Get bot information
 */
export async function getBotInfo(): Promise<any> {
  if (!bot) {
    throw new Error('Telegram bot not configured');
  }

  try {
    return await bot.getMe();
  } catch (error) {
    console.error('Error getting bot info:', error);
    throw error;
  }
}
