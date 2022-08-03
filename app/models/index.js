const config = require("../config/dbConfig");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/userModel")(sequelize, Sequelize);
db.survey = require("../models/surveyModel")(sequelize, Sequelize);
db.question = require("../models/questionModel")(sequelize, Sequelize);
db.option = require("../models/optionsModel")(sequelize, Sequelize);
db.participant = require("../models/participantModel")(sequelize,Sequelize)
db.response = require("../models/responseModel")(sequelize,Sequelize)

//relations
//relations
db.user.hasMany(db.survey, {
    as: 'survey'
  });
db.survey.belongsTo(db.user, {
    foreignKey: 'userId', as: 'User',
  });
//
  db.survey.hasMany(db.question, {
    as: 'question'
  });
  
  db.question.belongsTo(db.survey, {
    foreignKey: 'surveyId', as: 'survey',
  });
  //
  db.question.hasMany(db.option, {
    as: 'option'
  });
  
  db.option.belongsTo(db.question, {
    foreignKey: 'questionId', as: 'question',
  });
//
  db.survey.hasMany(db.response, {
    as: 'response'
  });
  db.response.belongsTo(db.survey, {
    foreignKey: 'surveyId', as: 'survey',
  });
//
db.survey.hasMany(db.participant, {
  as: 'participant'
});
db.participant.belongsTo(db.survey, {
  foreignKey: 'surveyId', as: 'survey',
});
//
db.question.hasMany(db.response, {
  as: 'response'
});
db.response.belongsTo(db.question, {
  foreignKey: 'questionId', as: 'question',
});
//
db.participant.hasMany(db.response, {
  as: 'response'
});
db.response.belongsTo(db.participant, {
  foreignKey: 'participantId', as: 'participant',
});
//

module.exports = db;
