require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const input_txt = msg.text.toLowerCase().replace(/\n|\r/g, "").trim();
    console.log("Bot Input Message :" + input_txt);
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hi, Thank you for chatting with me');
});