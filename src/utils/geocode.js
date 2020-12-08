const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWRhc3dvcmsiLCJhIjoiY2tndG0wempsMWcxajJzbDg0ZjdpdnZpZSJ9.db2n3LLgDfV_5SDLduYqxQ&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Geo Coding Service!!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location provided. Try another search!', undefined)
        } else {
            // First item in the center array is longitude
            const long = body.features[0].center[0]
            // Second item in the center array is latitude
            const lat = body.features[0].center[1]
            callback(undefined, {
                longitude: long,
                latitude: lat,
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode