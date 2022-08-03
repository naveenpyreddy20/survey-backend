const controller = require("../controllers/superAdmin");
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

  app.get("/api/user/alladmins", [authFunctions.verifyToken, authFunctions.superAdmin], controller.adminList);
  app.delete(
    "/api/user/delete",
    [authFunctions.verifyToken, authFunctions.superAdmin],
    controller.deleteUser
  );
};
