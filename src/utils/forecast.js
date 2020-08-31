//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2b6e3ec6f1c61ea02646fde22370fe7a&query=' + longitude + ',' + latitude + '&units=m'

    //Default function parameters
    request({url, json: true}, (error, {body} = {}) => {
        if (error){
            callback('Unable to connect to weather forecast services.')
        }else if (body.error){
            callback('Wrong coordinates')
        }else {
            callback(undefined, 'The current temperature is ' + body.current.temperature + ' degrees Celcius.')
        }
    })
}

module.exports = forecast


