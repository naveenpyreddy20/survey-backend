module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("questions", {
      questionTitle: {
        type: Sequelize.STRING
      },
      required: {
        type: Sequelize.BOOLEAN
      },
      questionType: {
        type: Sequelize.ENUM("text-box", "multiple-choice-question", "rating-question"),
      }
    });
    return Question;
  };
  