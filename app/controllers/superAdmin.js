const db = require("../models");
const User = db.user;

exports.adminList = (req, res) => {
    //find all admins
    User.findAll({
      where: {
        userRole: "admin"
      }
    }).then(user => {
      return res.status(200).send(user);
    })
  
  };