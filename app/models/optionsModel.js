module.exports = (sequelize, Sequelize)=> {
    const Option = sequelize.define("options", {
      option: {
        type: Sequelize.STRING
      }
    });
    return Option;
  };