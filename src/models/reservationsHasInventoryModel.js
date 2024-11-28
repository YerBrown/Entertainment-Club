import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Reservation from "./reservationModel.js";
import Inventory from "./inventoryModel.js";

const ReservationsHasInventory = sequelize.define(
    "reservations_has_inventory",
    {
        reservation_id: {
            type: DataTypes.INTEGER,
            nullable: false,
            references: {
                model: "reservations",
                key: "id",
            },
        },
        inventory_id: {
            type: DataTypes.INTEGER,
            nullable: false,
            references: {
                model: "inventory",
                key: "id",
            },
        },
    }
);

Reservation.belongsToMany(Inventory, {
    through: ReservationsHasInventory,
    foreignKey: "reservation_id",
});
Inventory.belongsToMany(Reservation, {
    through: ReservationsHasInventory,
    foreignKey: "inventory_id",
});

ReservationsHasInventory.belongsTo(Inventory, {
    foreignKey: "inventory_id",
});
Inventory.hasMany(ReservationsHasInventory, {
    foreignKey: "inventory_id",
});

export default ReservationsHasInventory;
