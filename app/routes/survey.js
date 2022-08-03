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
  app.put("/api/survey/:id", [authFunctions.verifyToken], controller.makeSurveyLive);

  app.get("/api/surveylist",[authFunctions.verifyToken], controller.surveyList);

    app.get("/api/survey/:surveyId",[authFunctions.verifyToken],controller.viewSurvey)

  app.delete("/api/survey/:id", [authFunctions.verifyToken], controller.deleteSurvey);

  app.post(
    "/api/send/email",[authFunctions.verifyToken],controller.sendSurveyLink);

    app.post("/api/submit/survey", controller.submitSurvey);

    app.get("/api/surveyquestions", controller.surveyQuestions);
    app.get("/api/report/:surveyId", [authFunctions.verifyToken], controller.generateSurveyReport);

  };
