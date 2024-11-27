import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import User from "./userModel.js";
const Reservation = sequelize.define("reservations", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    week_time_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

Reservation.belongsTo(User, { foreignKey: "user_id" }); // Una reserva pertenece a un usuario

export default Reservation;
