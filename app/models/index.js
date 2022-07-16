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

//relatinons
db.user.hasMany(db.survey, {
    as: 'Survey'
  });
db.survey.belongsTo(db.user, {
    foreignKey: 'userId', as: 'User',
  });

  db.survey.hasMany(db.question, {
    as: 'Question'
  });
  db.question.belongsTo(db.survey, {
    foreignKey: 'surveyId', as: 'Survey',
  });
  
  db.question.hasMany(db.option, {
    as: 'Option'
  });
  db.option.belongsTo(db.question, {
    foreignKey: 'questionId', as: 'Question',
  });


module.exports = db;
