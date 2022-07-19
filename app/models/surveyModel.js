module.exports = (sequelize, Sequelize) => {
    const Survey = sequelize.define("surveys", {
      surveyTitle: {
        type: Sequelize.STRING
      },
      surveyDescription: {
        type: Sequelize.STRING
      },
      makeLive: {
        type: Sequelize.BOOLEAN
      },
      surveyLink: {
        type: Sequelize.STRING
      }
  
    });
  
    return Survey;
  };