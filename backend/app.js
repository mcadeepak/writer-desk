const express = require("express");
const mongo = require("mongoose");

const app = express();
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

mongo
  .connect("mongodb://localhost:27017/AngularCRUD")
  .then(() => {
    console.log("Connected to Database!!");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

const usersSchema = mongo.Schema({
  name: String,
  contact: String,
  email: String,
  gender: String,
  username: String,
  password: String,
});

const Model = mongo.model("Users", usersSchema);

app.post("/api/saveUser", (req, res, next) => {
  const mod = new Model({
    name: req.body.name,
    contact: req.body.contact,
    email: req.body.email,
    gender: req.body.gender,
    username: req.body.username,
    password: req.body.password,
  });
  mod.save();
  res.status(201).json({
    message: "User SignUp successfull.",
  });
});

app.post("/api/getUser", (req, res) => {
  let i = 1;
  Model.find().then((users) => {
    Object.keys(users).forEach((id) => {
      const name = users[id].name;
      const contact = users[id].contact;
      const email = users[id].email;
      const gender = users[id].gender;
      const username = users[id].username;
      const password = users[id].password;

      if (username === req.body.username) {
        if (password === req.body.password) {
          const user = [name, contact, email, gender, username, password];
          res.status(200).json({
            message: "User Login successfull!!",
            auth: true,
            usersInfo: user,
          });
        } else {
          res.status(200).json({
            message: "Wrong Password!!",
            auth: false,
            usersInfo: [],
          });
        }
      } else {
        if (i === users.length) {
          if (username != req.body.username) {
            res.status(200).json({
              message: "User Not found",
              auth: false,
              usersInfo: [],
            });
          }
        }
        i++;
      }
    });
  });
});

module.exports = app;
