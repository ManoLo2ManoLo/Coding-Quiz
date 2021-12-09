const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Score extends Model {}

Score.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "score"
    }
);

module.exports = Score;
