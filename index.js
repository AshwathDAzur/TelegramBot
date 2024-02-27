require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const input_txt = msg.text.toLowerCase().replace(/\n|\r/g, "").trim();
    console.log("Bot Input Message :" + input_txt);
    const chatId = msg.chat.id;
    if (input_txt === "ashwath") {
        const adaptiveCardHtml = `
            <b>Ashwath Kumaran B</b>
            <i>Description</i>
            <a href="http://example.com">Link</a>
            <code>{"key": "value"}</code>
        `;
        // Send the HTML content
        bot.sendMessage(chatId, adaptiveCardHtml, { parse_mode: 'HTML' })
            .then(() => {
                // Send the image
                bot.sendPhoto(chatId, 'Assests/DevProfile.jpeg', { caption: 'Image Caption' });
            })
            .catch((error) => {
                console.error('Error sending message:', error);
            });
    }

    else {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Sorry, I cannot understand');
    }

});