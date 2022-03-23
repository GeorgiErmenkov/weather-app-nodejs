const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const app = express();
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views locatoin
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static folder to serve
app.use(express.static(publicPath))

// Setup routing
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Georgi Ermenkov'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Georgi Ermenkov'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'This is the help page.',
        title: 'Help',
        name: 'Georgi Ermenkov'
    })
})

app.get('/weather', (req, res) => {


    if (!req.query.address) {
        return res.send({
            error: 'Please provide a real address.'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error
                })
            } else {
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        return res.send({
                            error
                        })
                    }
                    res.send({
                        address: req.query.address,
                        forecast: forecastData,
                        location
                    })
                })
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Georgi Ermenkov'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Georgi Ermenkov'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
