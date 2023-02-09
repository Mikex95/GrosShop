//using mongoose
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const colors = require("colors");

const URL = process.env.MONGO_DB_ATLAS_URI;
const DB_NAME = process.env.MONGO_DB_NAME;

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DB_NAME,
    });
    console.log(colors.bgYellow("MongoDB connected ....."));
  } catch (err) {
    console.log(colors.bgRed("Error Connecting to Database, will Abort!"));
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectDB: connectDB };
