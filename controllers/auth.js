const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const db = mysql.createConnection({
  host: process.env.database_host,
  user: "root", //fix this later
  password: process.env.database_password,
  database: "ebookstore", //fix this later
});

const app = (exports.register = (req, res) => {
  console.log(req.body);

  const { name, email, address, user_name, password, passwordConfirm } =
    req.body;

  db.query(
    "SELECT email FROM `user_data` WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        return res.render("register", {
          message: "That email is already in use",
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          message: "Passwords do not match",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      db.query(
        "INSERT INTO `user_data` SET ?",
        {
          name: name,
          email: email,
          address: address,
          user_name: user_name,
          password: hashedPassword,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            return res.render("register", {
              message: "User resitered",
            });
          }
        }
      );
    }
  );
});
