request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.geoapify.com/v1/geocode/autocomplete?text=" + encodeURIComponent(address) + "&lang=en&limit=1&type=city&format=json&apiKey=6666914962014157841ea257e4db4111"
    
    request({url, json: true} , (error, {body}) => {
        if (error){
            callback("Unable to connect to geocoding service", undefined)
        }
        else if (body.results.length === 0){
            callback("Unable to find this location", undefined)
        }
        else{
            callback(undefined, {
                country: body.results[0].country,
                city: body.results[0].city,
                longitude: body.results[0].lon,
                latitude: body.results[0].lat
            })
        }
    })
}

module.exports = geocode
