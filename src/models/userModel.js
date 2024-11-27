import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Reservation from "./reservationModel.js";

const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surnames: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    create_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

User.hasMany(Reservation, { foreignKey: "user_id" });
export default User;
