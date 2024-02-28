require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const cheerio = require('cheerio');
const axios = require('axios');

const url = process.env.SCRAP_URL;
const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const input_txt = msg.text.toLowerCase().replace(/\n|\r/g, "").trim();
    console.log("Bot Input Message :" + input_txt);
    try {
        var replyData = await webscrap();
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
        var response = await axios.get(url);
        const $ = cheerio.load(response.data);
        // Select the div with class "cb-col-100 cb-col cb-schdl"
        const divElement = $(".cb-col-100.cb-col.cb-schdl");
        // console.log(divElement.html());
        const rawData = divElement.text();
        const rawArray = rawData.split("    ");
        const filteredArray = rawArray.filter(item => item.trim().length > 0);
        const newArray = [`***Live Scores - by Ashwath***`, ...filteredArray];
        return newArray;
    }
    catch (error) {
        console.log(error);
    }
}


