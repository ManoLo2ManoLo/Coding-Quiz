const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Score extends Model {}

Score.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        score: {
            type: DataTypes.INTEGER,
            required: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'score'
    }
);

module.exports = Score;