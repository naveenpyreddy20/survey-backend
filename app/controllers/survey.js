const db = require("../models")
const user = db.user
const question = db.question
const survey = db.survey
const service = require("../services/surveyService")
const email = require("../services/email")
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


  exports.surveyList =async (req, res) => {
    if(req.query.adminId){
      //get user
      let userFound = await user.findOne({
        where:{id:req.query.adminId}
      })
      if(userFound){
        let surveyList = await survey.findAll({
          where:{userId:userFound.id}
        })
        console.log("user",userFound)
        return res.status(200).send({
          surveys:surveyList,
          userDetails:{  
            username:userFound.username,
          }
        })
      }else{
        return res.status(404).send("user not found")
      }
    }else{
    //find all surveys
  survey.findAll({
      where: { userId: req.userId }
    })

    .then((surveys) => {
      
      res.status(200).send(surveys);

    })
    .catch((err) => {
      console.log("error");
      res.status(500).send({ message: err.message });
    });
  }
}

  exports.deleteSurvey = (req, res) => {
    const id = req.params.id;
    survey.destroy({
      where: { id: id }
    })
      .then(async response => {
        if (response == 1) {
          console.log("resp",response)
         await question.destroy({
            where:{surveyId:null}
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
    if(req.query.makeLive === "false"){
    let updateSurvey = await  survey.update(
      {makeLive:false},
     { where: { id: req.params.id }}
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
      { where: { id: req.params.id }}
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

 


  exports.viewSurvey = async(req,res) =>{
    try{
        console.log("view survey",req.params.surveyId)
        var Survey = await survey.findOne({
            where: { id: req.params.surveyId},
            include: [
              {
                model: db.question, as: 'question',
                include: [{
                  model: db.option, as: "option"
                }]
              }
            ]
          }) 
          console.log("survey",Survey)
          if(!Survey || Survey==null){
            return res.status(404).send({
              message:"survey Don't Exists"
            })
          }
          return res.status(200).send(Survey)
    }catch(err){
        return res.status(500).send({
            message:"Internal Server Error"
          })
    }
  }
  exports.sendSurveyLink = async (req, res) => {
    if (!req.body.surveylink || !req.body.useremail) {
      return res.status(400).send({
        message: "link and  email are required to send email"
      })
    }
    let sendEmail = await email.sendEmail(req.body.surveylink, req.body.useremail)
    if (sendEmail) {
      return res.status(200).send("email sent ")
    } else {
      return res.status(200).send("email not sent")
    }
  }
