import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const WeekTime = sequelize.define("week_times", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    week_day: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
});

export default WeekTime;
