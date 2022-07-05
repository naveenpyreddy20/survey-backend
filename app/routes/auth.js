const controller = require("../controllers/auth");
const authFunctions = require("../middleware/auth")
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/user/signup",
    controller.signup
  );

  app.post("/api/user/signin", controller.signin);
  app.get("/api/user/logout/:id", controller.signout);
};
