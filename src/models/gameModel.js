import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Game = sequelize.define("games", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    min_players: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    max_players: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Game;
