const dataModelHistori = require("../models/sensorModelHistori");
const dataModelRealtime = require("../models/sensorModelRealtime");

const bcrypt = require("bcryptjs");
//untuk conversi tgl
var moment = require("moment");
//insert data sensor PZEM 004t v3
exports.insertSensor = (volt, amper, watt, kwh, hertz, pff, suhu, kelembaban) =>
  new Promise((resolve, reject) => {
    let dataSensorHistori = new dataModelHistori({
      volt: volt,
      amper: amper,
      watt: watt,
      kwh: kwh,
      hertz: hertz,
      pff: pff,
      suhu: suhu,
      kelembaban: kelembaban,
      tanggal: new Date()
    });
    //update data sensor
    dataModelRealtime
      .update(
        {
          "volt.id": "volt",
          "amper.id": "amper",
          "watt.id": "watt",
          "kwh.id": "kwh",
          "hertz.id": "hertz",
          "pff.id": "pff",
          "suhu.id": "suhu",
          "kelembaban.id": "kelembaban"
        },
        {
          $set: {
            "volt.data": volt,
            "amper.data": amper,
            "watt.data": watt,
            "kwh.data": kwh,
            "hertz.data": hertz,
            "pff.data": pff,
            "suhu.data": suhu,
            "kelembaban.data": kelembaban,
            tanggal: new Date()
          }
          //ketika data yang di update kosong,akan insert terlebih dahulu
        },
        { upsert: true }
      )
      .then(() => {
        dataSensorHistori
          .save()
          .then(res => {
            resolve({
              error: false,
              pesan: "berhasil input data"
            });
          })
          .catch(() => {
            reject({
              error: true,
              pesan: "gagal input data"
            });
          });
      })
      .catch(err => console.log(err));
  });

//histori data new | PZEM
exports.getHistory = () =>
  new Promise((resolve, reject) => {
    dataModelHistori.find().then(dataHistoris => {
      const myDate = moment(dataHistoris[0].tanggal);
      // console.log(myDate)
      if (dataHistoris.length == 0) {
        reject({ status: 200, message: "tidak ada data" });
      } else {
        let dataSensor = dataHistoris.map(p => {
          return {
            _id: p._id,
            volt: p.volt,
            amper: p.amper,
            watt: p.watt,
            kwh: p.kwh,
            hertz: p.hertz,
            pff: p.pff,
            suhu: p.suhu,
            kelembaban: p.kelembaban,
            tanggal: moment(p.tanggal).format("l | LTS")
          };
        });
        console.log(dataSensor);
        resolve({ status: 200, message: dataSensor });
      }
    });
  });

//realtime data new | PZEM
exports.getRealtime = () =>
  new Promise((resolve, reject) => {
    dataModelRealtime.find().then(datarealtimes => {
      const myDate = moment(datarealtimes[0].tanggal);
      console.log(myDate);
      if (datarealtimes.length == 0) {
        reject({ status: 200, message: "tidak ada data" });
      } else {
        let dataSensor = datarealtimes.map(p => {
          return {
            volt: {
              id: p.volt.id,
              data: p.volt.data
            },
            amper: {
              id: p.amper.id,
              data: p.amper.data
            },
            watt: {
              id: p.watt.id,
              data: p.watt.data
            },
            kwh: {
              id: p.kwh.id,
              data: p.kwh.data
            },
            hertz: {
              id: p.hertz.id,
              data: p.hertz.data
            },
            pff: {
              id: p.pff.id,
              data: p.pff.data
            },
            suhu: {
              id: p.suhu.id,
              data: p.suhu.data
            },
            kelembaban: {
              id: p.kelembaban.id,
              data: p.kelembaban.data
            },
            _id: p.id,
            tanggal: moment(p.tanggal).format("l | LTS")
          };
        });

        resolve({ status: 200, message: dataSensor });
      }
    });
  });
