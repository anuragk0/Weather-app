request = require('request')
require('dotenv').config()

const forecast = (address, callback) => {
    const url = "http://api.weatherapi.com/v1/current.json?key=" + (process.env.FOR_API) + "&q=" + encodeURIComponent(address) + "&aqi=no"

    request ({url, json: true}, (error, {body}) => {
        if (error){
            callback("Unable to connect to Weather service", undefined)
        }
        else if (body.error){
            callback("Unable to find location", undefined)
        }
        else{
            callback(undefined, body.current.condition.text + ". It is currently " + body.current.temp_c + " degrees out." + "There is a " + body.current.precip_in + "% chance of rain.")
        }
    })
}

module.exports = forecast