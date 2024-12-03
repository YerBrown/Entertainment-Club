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
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Formatear el precio para pasar de centimos a euros
        get() {
            const rawValue = this.getDataValue("price");
            if (!rawValue) return null;

            return (rawValue / 100).toString() + "€";
        },
    },
});
export default Room;
