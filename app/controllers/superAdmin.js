const db = require("../models");
const User = db.user;
const Option = db.option;
const Question = db.question;
const Survey = db.survey;
const Response = db.response;
const Participant = db.participant;

exports.adminList = (req, res) => {
    //find all admins
    User.findAll({
      where: {
        userRole: "admin"
      }
    }).then(user => {
      return res.status(200).send(user);
    })
  
  };


  exports.deleteUser = async (req, res) => {
    const id = req.query.userId;
    User.destroy({
      where: { id: id, userRole: "admin" },
    })
      .then(async (success) => {
        if (success == 1) {
          //delete question
          await Survey.destroy({
            where: { userId: null },
          });
          await Question.destroy({
            where: { surveyId: null },
          });
          await Option.destroy({
            where: {
              questionId: null,
            },
          });
          await Participant.destroy({
            where: { surveyId: null },
          });
          await Response.destroy({
            where: { questionId: null },
          });
          res.status(200).send({
            message: "user  deleted !",
          });
        } else {
          res.status(404).send({
            message: `Cannot delete user  with id=${id}. Maybe User was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete survey with id=" + id,
        });
      });
  };