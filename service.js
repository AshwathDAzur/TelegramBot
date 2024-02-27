const axios = require('axios');

const service = {

    async getDish() {
        try {
            const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = service;