module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      icon: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        unique: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
  };
  return User;
};
