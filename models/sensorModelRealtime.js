const mongoose = require('mongoose')
const Schema = mongoose.Schema

const realtimeSchema = new Schema({

    volt: {
        id: { type: String, default: 'volt' },
        data: String,
    },
    amper: {
        id: { type: String, default: 'amper' },
        data: String
    },
    watt: {
        id: { type: String, default: 'watt' },
        data: String
    },
    kwh: {
        id: { type: String, default: 'kwh' },
        data: String
    },
    hertz: {
        id: { type: String, default: 'hertz'},
        data: String
    },
    pff: {
        id: { type: String, default: 'pff' },
        data: String
    },
    suhu: {
        id: { type: String, default: 'suhu'},
        data: String
    },
    kelembaban: { 
        id: { type: String, default: 'kelembaban'},
        data: String
    },
    tanggal: Date
})

module.exports = mongoose.model('datarealtimes', realtimeSchema)