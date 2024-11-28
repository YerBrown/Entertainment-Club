import sequelize from "../../config/sequelize.js";
import { Op, where } from "sequelize";
import ReservationsHasInventory from "../../models/reservationsHasInventoryModel.js";
import Inventory from "../../models/inventoryModel.js";
import Game from "../../models/gameModel.js";
import errors from "../../helpers/errors.js";

async function getAll() {
    const reservationsHasInventories = await ReservationsHasInventory.findAll();
    return reservationsHasInventories;
}
async function getAllInventoryItemsOfReservation(reservation_id) {
    const reservationInventoryItems = await ReservationsHasInventory.findAll({
        where: {
            reservation_id,
        },
        include: [
            {
                model: Inventory,
                include: [
                    {
                        model: Game,
                    },
                ],
            },
        ],
    });
    return reservationInventoryItems;
}
async function create(reservation_id, inventory_id) {
    const reservationHasInventory = await ReservationsHasInventory.create({
        reservation_id,
        inventory_id,
    });
    return reservationHasInventory;
}
async function remove(reservation_id) {
    const reservationsHasInventory = await ReservationsHasInventory.findAll({
        where: {
            reservation_id: reservation_id,
        },
    });
    if (!reservationHasInventory) {
        throw new errors.RESERVATIONS_HAS_INVENTORY_NOT_FOUND();
    }
    for (const reservationInventory of reservationsHasInventory) {
        await reservationInventory.destroy();
    }
}
export default {
    getAll,
    getAllInventoryItemsOfReservation,
    create,
    remove,
};
