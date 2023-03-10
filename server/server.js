const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

// required component
const { connectDB } = require("./src/database/connectDB");
connectDB();

//middlewares
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://gros-shop-app.onrender.com"],
  })
);
app.use(morgan("dev"));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/app-data/uploads", express.static("app-data/uploads")); //routes
const { router } = require("./src/routes/routes");
app.use("/api", router);

const PORT = process.env.PORT || 2202;

app.listen(PORT, () => {
  console.log(colors.bgGreen("Server is running on PORT :", PORT));
});
