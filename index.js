require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const cheerio = require('cheerio');
const axios = require('axios');

const url = process.env.SCRAP_URL;
const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    console.log("Bot Input Message :" + msg.text);
    try {
        const replyData = await webscrap();
        replyData.forEach(reply => {
            const chatId = msg.chat.id;
            bot.sendMessage(chatId, reply);
        });
    } catch (error) {
        console.log(error);
    }
});

async function webscrap() {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        // Select the div with class "cb-col-100 cb-col cb-schdl"
        const divElement = $(".cb-col-100.cb-col.cb-schdl");
        // console.log(divElement.html());
        const rawData = divElement.text();
        const rawArray = rawData.split("    ");
        const filteredArray = rawArray.filter(item => item.trim().length > 0);
        const combinedArray = [];
        for (let i = 0; i < filteredArray.length; i += 2) {
            if (i + 1 < filteredArray.length) {
                combinedArray.push(filteredArray[i] + filteredArray[i + 1]);
            } else {
                combinedArray.push(filteredArray[i]);
            }
        }
        return combinedArray;
    }
    catch (error) {
        console.log(error);
    }
}


