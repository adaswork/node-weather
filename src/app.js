const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Express path configuration variables
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Express views settings
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Static Directory settings
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Amit Das'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Amit Das'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Amit Das',
        message: 'Here is a very helpful message that will change your life.'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is required for getting weather'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            return res.send({
                location,
                address: req.query.address,
                forecast: forecastData
            })
        })
    })
    // res.send({
    //     location: req.query.address,
    //     forecast: "It is drizling. Temperature is 27 degree."
    // });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search criteria!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amit Das',
        message: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amit Das',
        message: 'This page does not exist.'
    })
});

app.listen(3000, () => {
    console.log('Express Server has been started on port 3000!')
});