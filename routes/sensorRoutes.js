const sensor = require('express')()
const sensorController = require('../controller/sensorController')
//history
sensor.post('/insert', (req, res) => {
    console.log(req.body);
    sensorController.insertSensor(req.body.volt, req.body.amper, req.body.watt, req.body.kwh, req.body.hertz, req.body.pff, req.body.suhu, req.body.kelembaban)
        .then(result => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
});


//get histori nganu new
sensor.get('/getHistori', (req, res) => {

    sensorController.getHistory()
        .then(result => {
            console.log(result)
            res.status(result.status).json({ success: true, message: result.message })
        })

        .catch(err => res.status(err.status).json({ success: false, message: err.message }));
});

//get real nganu new
sensor.get('/getRealtime', (req, res) => {

    sensorController.getRealtime()
        .then(result => {
            console.log(result)
            res.status(result.status).json({ success: true, message: result.message })
        })

        .catch(err => res.status(err.status).json({ success: false, message: err.message }));
});

module.exports = sensor