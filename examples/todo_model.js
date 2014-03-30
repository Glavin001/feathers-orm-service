module.exports = function(sequelize, DataTypes) {
  return sequelize.define("todo", {
    description: DataTypes.TEXT,
    done: DataTypes.BOOLEAN
  })
}