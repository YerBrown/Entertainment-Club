import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Game from "./gameModel.js";

const Inventory = sequelize.define("inventory", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Inventory.belongsTo(Game, { foreignKey: "game_id" });
Game.hasMany(Inventory, { foreignKey: "game_id" });
export default Inventory;
