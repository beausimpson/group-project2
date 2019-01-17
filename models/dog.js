module.exports = function(sequelize, DataTypes) {
  var Dog = sequelize.define("Dog", {
    dogName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    dogBreed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dogPark: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Dog;
};
