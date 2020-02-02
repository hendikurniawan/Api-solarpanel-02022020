const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historiSchema = new Schema({
  volt: {
    type: String
  },
  amper: {
    type: String
  },
  watt: {
    type: String
  },
  kwh: {
    type: String
  },
  hertz: {
    type: String
  },
  pff: {
    type: String
  },
  suhu: {
    type: String
  },
  kelembaban: {
    type: String
  },
  tanggal: Date
});

module.exports = mongoose.model("datahistoris", historiSchema);
