const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
forecast = require("./utils/forecast")
geocode = require("./utils/geocode")

const port = process.env.port || 3000
//Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup static directory to serve
app.use(express.static('public'))

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anurag'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Anurag'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            Error: 'Location to fetch address is not provided'
        })
    }

    geocode(req.query.address, (error, {city, country, latitude, longitude} = {}) => {
        if (error){
            return res.send({
                Error: error
            })
        }

        forecast(city, (error, forecastdata) => {
            if (error){
                return res.send({
                    Error: error
                })
            }
            return res.send({
                City: city,
                Country: country,
                Latitude: latitude,
                Longitude: longitude,
                forecast: forecastdata
            })
        })
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Anurag',
        errorMessage: 'About information not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: 'Error 404',
        name: 'Anurag',
        errorMessage: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log("Server is up on port" + port)
})