import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Room from "./roomModel.js";
import WeekTime from "./weekTimeModel.js";
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
Reservation.belongsTo(Room, { foreignKey: "room_id" });
Room.hasMany(Reservation, { foreignKey: "room_id" });
Reservation.belongsTo(WeekTime, { foreignKey: "week_time_id" });
WeekTime.hasMany(Reservation, { foreignKey: "week_time_id" });
export default Reservation;
