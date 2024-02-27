const cheerio = require('cheerio');
const axios = require('axios');

const url = "https://www.cricbuzz.com/cricket-match/live-scores/";

async function webscrap() {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const val = $("div").text();
        console.log(val);
    }
    catch (error) {
        console.log(error);
    }
}

webscrap();