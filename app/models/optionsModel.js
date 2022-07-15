module.exports = (sequelize, Sequelize)=> {
    const Option = sequelize.define("choices", {
      choice: {
        type: Sequelize.STRING
      }
    });
    return Option;
  };