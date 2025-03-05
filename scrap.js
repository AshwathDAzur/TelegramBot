const cheerio = require('cheerio');
const axios = require('axios');

const url = "https://www.cricbuzz.com/cricket-match/live-scores/";

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
        const replyArray = [`***Live Scores - by Ashwath***`, ...combinedArray];
        return replyArray
    }
    catch (error) {
        console.log(error);
    }
}

webscrap();
