const request = require('request')

const geocode = (address, callback) => {
    if (!address){
        callback('Provide an address.')
        return
    }

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWlyZWxhd2FsZXJpYSIsImEiOiJja2Vmc3dvNGgwc3RiMnlveTQxaDVidzJqIn0.hq3DDbJKCO7UX-9yMRu9Sw&limit=1'

    //Default function parameters
    request({url, json: true}, (error, {body} = {}) => {
        if (error){
            callback('Unable to connect to location services')
        }else if (body.features.length === 0){
            callback('Unable to find location. Try another search!')
        }else {
            callback(undefined, {
                longtitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode