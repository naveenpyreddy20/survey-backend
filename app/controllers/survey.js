const db = require("../models")
const user = db.user
const question = db.question
const survey = db.survey
const service = require("../services/surveyService")

exports.createSurvey = async (req, res) => {
    try {
      //checking title and description
      if (!req.body.description || !req.body.title) {
        return res.status(400).json({
          message: "Error.! title and description missing"
        })
      }
      const {title,description,makeLive,questions}= req.body
      let Survey = await survey.create({
        surveyTitle:title,
        surveyDescription:description,
        makeLive:makeLive,
        userId:req.userId
      })
      for (let i = 0; i <= questions.length-1; i++) {
         await service.createQuestion(questions[i], Survey.dataValues.id)
      }
      let surveyInfo = await survey.findOne({
        where: { id: Survey.dataValues.id },
        include: [
        {
            model: db.question, as: 'question',
            include: [{
              model: db.option, as: "option"
            }]
          }
        ]
      })
      console.log("info",surveyInfo)
      res.status(200).send(surveyInfo)
    } catch (err) {
      res.status(500).send(err)
    }
  
  };