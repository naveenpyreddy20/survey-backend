module.exports = (sequelize, Sequelize) => {
    const Participant = sequelize.define("participants", {
     name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      }
    });
    return Participant;
  };
  