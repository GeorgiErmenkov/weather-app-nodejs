const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ2VvcmdpZXJtIiwiYSI6ImNsMGpkM2h1ajA5anczYnB3dmlkYzk0cDMifQ.e_ljnXLA1sKWyrFVZboduA'

    request({ url, json: true }, (error, { body: { features } }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode