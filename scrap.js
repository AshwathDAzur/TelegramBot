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
        console.log(filteredArray);
        filteredArray.forEach(match => {
            console.log(match);
        });

    }
    catch (error) {
        console.log(error);
    }
}

webscrap();
