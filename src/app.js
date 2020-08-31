const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

// .get(path, callback) function routes HTTP GET requests to the specified path with the specified callback functions
// Defined what should happen when visiting the homepage
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Valeryia'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Valeryia'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Valeryia',
        helpText: 'Help yourself!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'Please provide an address to search for'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error){
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastData) => {
            res.send({
                location,
                forecastData
            })
        })
    })
})

// A more specific error page
app.get('/help/*', (req, res) => {
    //res.send('This page cannot help you either...')
    res.render('404', {
        title: '404 Error',
        name: 'Valeryia',
        errorMessage: 'This page cannot help you either...'
    })
})

//Needs to be defined as the last because Express looks up for the match to the route from the top to the bottom and * matches everything
//Compare: routing protocol
app.get('*', (req, res) => {
    //res.send('My 404 Page')
    res.render('404', {
        title: ' 404 Error',
        name: 'Valeryia',
        errorMessage: 'Page not found.'
    })
})

//Starting the engine at the free port on the local machine
app.listen(3000, () => {
    console.log('Server is run on the port 3000')
})