const jwt = require("jsonwebtoken");
const config = require("../config/authConfig");
const db = require("../models");
const User = db.user;

let verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  await jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
        console.log("err",token,'\n', err)
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

let superAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user == null) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    if (user.userRole === "superadmin") {
      next();
      return;
    }


    res.status(403).send({
      message: "Require Super Admin Role!"
    });
    return;

  });
};


  const authFunctions = {
    verifyToken,superAdmin  
};
module.exports = authFunctions;
