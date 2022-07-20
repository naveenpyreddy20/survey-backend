const controller = require("../controllers/survey");
const authFunctions = require("../middleware/auth");
const auth = require("./auth");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post(
    "/api/survey",
    [authFunctions.verifyToken],
    controller.createSurvey
  );

};
