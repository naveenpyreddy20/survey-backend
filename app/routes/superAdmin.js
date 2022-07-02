const { authJwt } = require("../middleware");
const superAdminController = require("../controllers/superAdmin");
const authFunctions = require("../middleware/auth")
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/superadmin/alladmins", controller.getAllAdmins);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );


};
