# Telegram Bot Setup Guide

This guide walks you through setting up the Telegram bot integration for the 3D printing website.

## Step 1: Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Start a conversation with BotFather
3. Send the command `/newbot`
4. Follow the prompts:
   - **Name**: Choose a display name (e.g., "3D Print Orders Bot")
   - **Username**: Choose a unique username (e.g., `Mona_lisa69_bot`)
5. BotFather will provide you with a **Bot Token** that looks like:
   ```
   1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
   ```

📝 **Copy this token and save it for step 3**

## Step 2: Get Your Chat ID

To send messages to yourself (or a specific channel/group), you need the Chat ID.

### Option A: Personal Chat ID

1. Start a conversation with your bot (search for your bot's username)
2. Send any message to the bot (e.g., "Hello")
3. Open this URL in your browser:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
   Replace `<YOUR_BOT_TOKEN>` with your actual token from Step 1

4. Look for the `chat` object in the JSON response:
   ```json
   {
     "message": {
       "chat": {
         "id": 123456789,
         "first_name": "Your Name",
         "type": "private"
       }
     }
   }
   ```
5. Copy the `id` number (e.g., `123456789`)

### Option B: Channel/Group Chat ID

**For a Channel:**
1. Create a Telegram channel
2. Add your bot as administrator
3. The channel ID will look like `-1001234567890`

**For a Group:**
1. Create a Telegram group
2. Add your bot to the group
3. Send a message in the group
4. Check the getUpdates URL to find the group ID
5. The group ID will look like `-1001234567890`

## Step 3: Configure Environment Variables

Open your `.env` file and add the following:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

Replace the values with:
- Your bot token from Step 1
- Your chat ID from Step 2

## Step 4: Test the Integration

Start your development server:

```bash
npm run dev
```

Test by submitting an order through the website. You should receive a notification in Telegram!

## Example Notification Format

```
🎉 NEW ORDER RECEIVED!

📋 Order #3DP-XYZ123-ABCD

👤 Customer Info:
   Name: John Doe
   Email: john@example.com
   Phone: +66 1 234 5678
   Address: 123 Main St, Bangkok

🛒 Order Items:
1. 🔧 Custom: my_model.stl
   Material: PLA
   Color: Black
   Qty: 2
   Price: ฿200

💰 Total: ฿200

🚚 Delivery: STANDARD

⏰ 12 Jan 2025, 14:30
```

## Troubleshooting

### "Chat not found" error

**Possible causes:**
- Chat ID is incorrect
- You haven't started a conversation with the bot (for private chats)
- Bot doesn't have permission to send to the channel/group

**Solutions:**
1. For private chat: Send a message to the bot first
2. For channel/group: Add bot as administrator
3. Double-check the chat ID format
4. Use the getUpdates URL to verify the correct ID

### "Unauthorized" error

**Possible causes:**
- Bot token is incorrect or expired
- Bot was deleted or deactivated

**Solutions:**
1. Verify token with @BotFather using `/mybots`
2. Generate a new token if needed
3. Check the token in your `.env` file

### No notification received

**Possible causes:**
- Order submission failed
- Telegram API error
- Bot blocked or muted

**Solutions:**
1. Check browser console for errors
2. Check server logs for error messages
3. Verify bot can send messages by using a test script
4. Check that bot is not blocked or muted in Telegram settings

## Testing Bot Manually

Create a test script to verify your bot is working:

```typescript
// test-bot.ts
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!);

bot.sendMessage(process.env.TELEGRAM_CHAT_ID!, 'Test message from bot')
  .then(() => console.log('Message sent successfully!'))
  .catch((err) => console.error('Error:', err));
```

Run it with:
```bash
npx tsx test-bot.ts
```

## Additional Bot Commands

You can add custom commands to your bot using @BotFather:

- `/help` - Display help information
- `/orders` - View recent orders
- `/status <order_number>` - Check order status

To add these commands, message @BotFather:
```
/setcommands
```
Then follow the prompts to set up your custom commands.

## Best Practices

1. **Keep your bot token secret** - Never commit it to version control
2. **Use a dedicated chat ID** - Don't use a personal chat for production
3. **Add error handling** - Gracefully handle Telegram API failures
4. **Monitor bot usage** - Track how many notifications are sent
5. **Rate limiting** - Don't spam notifications; group them if needed

## Security Considerations

1. **Token Protection**:
   - Store token in environment variables
   - Never expose in frontend code
   - Rotate tokens periodically

2. **Access Control**:
   - Validate chat IDs before sending
   - Use a whitelist of allowed chat IDs
   - Implement request rate limiting

3. **Data Privacy**:
   - Don't include sensitive customer data in notifications
   - Use anonymous order numbers
   - Be mindful of data protection laws

## Resources

- Telegram Bot API Documentation: https://core.telegram.org/bots/api
- @BotFather: https://t.me/BotFather
- node-telegram-bot-api: https://github.com/yagop/node-telegram-bot-api

---

Need help? Contact us at info@3dprint.business
