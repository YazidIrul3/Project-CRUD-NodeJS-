const mongoose = require("mongoose");

const dbName = "dapodik";
const url = `mongodb://localhost:27017/${dbName}`;

const Siswa = mongoose.model("Siswa", {
  nama: {
    type: String,
    required: true,
  },
  jk: {
    type: String,
    required: true,
  },
  nisn: {
    type: Number,
    required: true,
  },
  nik: {
    type: Number,
    required: true,
  },
  nokk: {
    type: Number,
    required: true,
  },
  tingkat: {
    type: String,
    required: true,
  },
  rombel: {
    type: String,
    required: true,
  },
  tgl_masuk: {
    type: Date,
    required: true,
  },
  terdaftar: {
    type: String,
    required: true,
  },
  ttl: {
    type: String,
    required: true,
  },
});

// new Siswa({
//   nama: "Budi",
//   jk: "L",
//   nisn: 123456789,
//   nik: 123456789,
//   nokk: 123456789,
//   tingkat: "X",
//   rombel: "PPLG 1",
//   tgl_masuk: "2021-01-01",
//   terdaftar: "2021-01-01",
//   ttl: "Jakarta",
// }).save();

module.exports = Siswa;
