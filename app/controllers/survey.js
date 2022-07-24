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

  exports.deleteSurvey = (req, res) => {
    const id = req.params.id;
    survey.destroy({
      where: { id: id }
    })
      .then(async response => {
        if (response == 1) {
          console.log("resp",response)
         await question.destroy({
            where:{surveyId:id}
          })
          res.send({
            message: "Survey  deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Survey  with id=${id}. Maybe Survey was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete survey with id=" + id
        });
      });
  };

  exports.makeSurveyLive = async(req, res) => {
    //find all users
    if(req.query.makeSurveyLive === "false"){
    let updateSurvey = await  survey.update(
      {makeLive:false},
     { where: { id: req.params.surveyId }}
    )
    if(updateSurvey == 0){
      return res.status(200).send({
        message:"Error occured.Please check surveyId and published values"
      })
    }
    return res.status(200).send({
      message:"unpublish successfull"
    })
     }
     if(req.query.makeLive === "true"){
    let updateSurvey =  await  survey.update(
       {makeLive:true},
      { where: { id: req.params.surveyId }}
     )
     if(updateSurvey == 0){
      return res.status(200).send({
        message:"Error occured.Please check surveyId and published values"
      })
    }
     return res.status(200).send({
      message:"publish successfull"
    })
      }

    }