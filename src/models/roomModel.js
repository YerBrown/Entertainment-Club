import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Room = sequelize.define("rooms", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    max_guests: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Room;
