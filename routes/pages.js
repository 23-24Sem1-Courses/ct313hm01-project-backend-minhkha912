const express = require("express");
const app = express();

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.hbs");
});

router.get("/login", (req, res) => {
  res.render("login.hbs");
});

router.post("/login", function (request, response, next) {
  res.render("login.hbs");

  var user_name = request.body.user_name;

  var password = request.body.password;

  if (user_name && password) {
    query = `
    SELECT * FROM user_data
    WHERE user_name = "${user_name}"
    `;

    database.query(query, function (error, data) {
      if (data.length > 0) {
        for (var count = 0; count < data.length; count++) {
          if (data[count].password == password) {
            request.session.ID = data[count].ID;

            response.redirect("/");
          } else {
            response.send("Incorrect Password");
          }
        }
      } else {
        response.send("Incorrect User name");
      }
    });
  } else {
    response.send("Please Enter User name and Password");
    response.end();
  }
});

router.get("/register", (req, res) => {
  res.render("register.hbs");
});

module.exports = router;
