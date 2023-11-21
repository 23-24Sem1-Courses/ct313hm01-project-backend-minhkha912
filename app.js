const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "/.env" });

const app = express();

app.use(express.json());
app.use(cors(
  {
  origin: [""],
  methods:["POST, GET"],
  credentials: true
  }
))



const db = mysql.createConnection({
  host: process.env.database_host,
  user: "root", //fix this later
  password: process.env.database_password,
  database: process.env.database,
});

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.set("view engine", "hbs");

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL Connected");
  }
});

//Define Routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Server start on Port 3306");
});
