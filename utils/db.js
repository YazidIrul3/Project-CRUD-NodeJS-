const mongoose = require("mongoose");

const dbName = "dapodik";
const url = `mongodb://localhost:27017/${dbName}`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(`Received an Error: ${err}`);
  });

module.exports = mongoose;
