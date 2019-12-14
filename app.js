const express = require('express')
const path = require('path')
const fs = require('fs')
const os = require('os')
const moment = require('moment');
const gs = require('./spreadsheet.js')

const app = express()
const port = process.env.PORT || 3000
const dateFormat = 'DD/MM/YYYY'

app.use(express.static('public'));
app.use(express.urlencoded({
    'extended': true
}));

app.get('/', (req, res) => {
    gs.accessSpreadsheet()
    res.sendFile(path.join(__dirname + '/html/index.html'))
    // res.send('Hello World!')
})

app.post('/trip', (req, res) => {
    let {
        km,
        to
    } = req.body

    let trip = {
        date: moment(new Date()).format(dateFormat),
        KM: km,
        To: to
    }

    // console.log('trip', trip);

    gs.accessSpreadsheet(0, trip)
    res.send('Trip details added')
})

app.post('/fuel', (req, res) => {
    let {
        amt,
        ltr
    } = req.body

    let fuelup = {
        date: moment(new Date()).format(dateFormat),
        liter: ltr,
        amount: amt,
        rate: amt / ltr
    }

    gs.accessSpreadsheet(1, fuelup)
    res.send('Fuel-up Added')
})

app.get('*', (req, res) => {
    res.send('404')
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))