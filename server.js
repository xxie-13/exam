//API framework
const express = require("express");
//cross origin resource sharing
const cors = require("cors");
//Environment variables
require("dotenv").config();
//Database connection
const db = require("./config/db");
//Routes
const routes = require("./routes");

//utilization of express
const app = express();
//monet
const moment = require("moment");
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${req.originalUrl}-${moment().format()}`,
  );
  next();
};
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Use routes
app.use("/api", routes);

//Server listening
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
