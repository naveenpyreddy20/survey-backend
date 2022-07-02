
  module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.STRING,
      },
      userRole: {
        type: Sequelize.ENUM("superadmin", "admin"),
        default: "admin",
      },
    });
  
    return User;
  };
  