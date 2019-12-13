const express = require('express')
const path = require('path')
const fs = require('fs')
const os = require('os')
const moment = require('moment');

const app = express()
const port = process.env.PORT || 3000
const dateFormat = 'DD/MM/YYYY'

app.use(express.static('public'));
app.use(express.urlencoded({
    'extended': true
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/index.html'))
    // res.send('Hello World!')
})

app.post('/trip', (req, res) => {
    let {
        km,
        message
    } = req.body

    let trip = [moment(new Date()).format(dateFormat), km, message]

    fs.appendFileSync('trips.csv', trip + os.EOL)
    res.send('Trip Added')
})

app.post('/fuel', (req, res) => {
    let {
        amt,
        ltr
    } = req.body

    let fuelup = [moment(new Date()).format(dateFormat), ltr, amt, amt / ltr]

    fs.appendFileSync('fuelup.csv', fuelup + os.EOL)
    res.send('Fuel-up Added')
})

app.get('*', (req, res) => {
    res.send('404')
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))