const db = require("../models");
const config = require("../config/authConfig");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    if (!req.body.email) {
      return  res.status(400).send({
          message: "Failed! Email Required!"
        });
      }
      // Email
    let user = await User.findOne({
        where: {
          email: req.body.email
        }
    })
    console.log("user",user)
    if (user!==null) {
      return  res.status(400).send({
          message: "Email already Exists!"
        });
      }
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    userRole : req.body.userRole ? req.body.userRole : "admin"
  })
    .then(user => {
    return  res.send({ message: "User registered successfully!", user: user });
    })
    .catch(err => {
      console.log("error")
      res.status(500).send({ message: err.message });
    });
};


exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400
      });

      user.token = token
      user.save()
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        userRole: user.userRole,
        accessToken: token
      });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = (req, res) => {
    User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        user.token = null;
        user.save();
        res.status(200).send({
          message: "logout successfully",
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  };
