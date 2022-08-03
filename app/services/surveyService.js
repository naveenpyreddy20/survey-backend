const db = require("../models")
const question = db.question
const option = db.option
const participant = db.participant
exports.createQuestion = async (Question,surveyId) => {
    try {
      //create survey
      let createQuestion = await question.create({
        questionTitle: Question.questionTitle,
        required: Question.required,
        questionType:Question.questionType,
        surveyId: surveyId,
      })
      console.log("question info",createQuestion)
if(Question.questionType == "multiple-choice-question"){
    console.log("inn",createQuestion.dataValues.questionType)
    for(let i=0;i<=Question.options.length-1;i++){
        console.log("options",Question.options[i].option)
    await option.create({
        option:Question.options[i].option,
        questionId:createQuestion.dataValues.id
    })
    }
}
      return createQuestion
    } catch (err) {
      return err
    }
  };

  //check email exists
exports.checkEmail = async (email, id) => {
//check   // Email
  let exists = await participant.findOne({
    where: {
      email: email, surveyId: id
    }
  })
  if (exists == null) {
    return false
  }
  return true
};

exports.saveParticipant = async (email, name, id) => {
  try {
    let saveParticipant = await participant.create({
      name: name,
      email: email,
      surveyId: id
    })
    return saveParticipant
  } catch (err) {
    return err
  }
};