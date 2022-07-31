module.exports = (sequelize, Sequelize) => {
    const response = sequelize.define("response", {
      response: {
        type: Sequelize.STRING,
      },
    });
    return response;
  };