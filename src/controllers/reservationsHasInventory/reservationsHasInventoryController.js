import sequelize from "../../config/sequelize.js";
import { Op, where } from "sequelize";
import ReservationsHasInventory from "../../models/reservationsHasInventoryModel.js";
import Inventory from "../../models/inventoryModel.js";
import Game from "../../models/gameModel.js";
import reservationController from "../reservations/reservationController.js";
import inventoryController from "../inventory/inventoryController.js";
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
                include: Game,
            },
        ],
    });

    const reservedInvenotryItems = [];
    for (const inventoryItem of reservationInventoryItems) {
        reservedInvenotryItems.push({
            inventory_id: inventoryItem.inventory_id,
            game_id: inventoryItem.inventory.game_id,
            game_name: inventoryItem.inventory.game.name,
            game_description: inventoryItem.inventory.game.description,
        });
    }
    const reservedData = {
        reservation_id: reservation_id,
        inventory_items: reservedInvenotryItems,
    };
    return reservedData;
}
async function addInventoryItemToReservation(reservation_id, game_id) {
    const currentReservation = await reservationController.getById(
        reservation_id
    );
    console.log("Current Reservation", currentReservation.date);
    const availableInventoryItem =
        await getAvailableInventoryItemByDateAndWeekTime(
            currentReservation.date,
            currentReservation.week_time_id,
            game_id
        );
    console.log("Available Inventory Item", availableInventoryItem);
    const newInvenotryItemAdded = await create(
        reservation_id,
        availableInventoryItem.inventory_id
    );
    return newInvenotryItemAdded;
}

async function getAvailableInventoryItemByDateAndWeekTime(
    date,
    week_time_id,
    game_id
) {
    const allInventoryItemsOfGame =
        await inventoryController.getInventoryItemsOfGameId(game_id);

    const allReservationsInSameDateTime =
        await reservationController.getAllReservationsByDateAndWeekTime(
            date,
            week_time_id
        );

    const reservedItemsAtThatDateAndTime = [];
    for (const reservation of allReservationsInSameDateTime) {
        const reservedItems = await getAllInventoryItemsOfReservation(
            reservation.id
        );

        reservedItemsAtThatDateAndTime.push(...reservedItems.inventory_items);
    }
    let availableItem = null;
    let notAvailableItemName = allInventoryItemsOfGame[0].game_name;
    for (const inventoryItem of allInventoryItemsOfGame) {
        const reservedItemFound = reservedItemsAtThatDateAndTime.find(
            (reservedItem) => {
                return reservedItem.inventory_id == inventoryItem.inventory_id;
            }
        );
        if (!reservedItemFound) {
            availableItem = inventoryItem;
            break;
        }
    }

    // if (!availableItem) {
    //     throw new errors.NO_GAMES_OF_THIS_TYPE_AVAILABLE(notAvailableItemName);
    // }
    return availableItem;
}

async function create(reservation_id, inventory_id) {
    const reservationHasInventory = await ReservationsHasInventory.create({
        reservation_id,
        inventory_id,
    });
    return reservationHasInventory;
}

async function remove(reservation_id, inventory_id) {
    const reservationHasInventory = await ReservationsHasInventory.findOne({
        where: {
            reservation_id: reservation_id,
            inventory_id: inventory_id,
        },
    });
    if (!reservationHasInventory) {
        throw new errors.RESERVATIONS_HAS_INVENTORY_NOT_FOUND();
    }
    await reservationHasInventory.destroy();
    return reservationHasInventory;
}

async function removeGameFromReservations(reservation_id, game_id) {
    const allReservationInventory = await getAllInventoryItemsOfReservation(
        reservation_id
    );
    let inventoryToRemove = null;
    for (const inventoryItem of allReservationInventory.inventory_items) {
        if (inventoryItem.game_id == game_id) {
            console.log("Game Found to be removed", inventoryItem.inventory_id);
            inventoryToRemove = inventoryItem;
            break;
        }
    }
    if (!inventoryToRemove) {
        throw new errors.RESERVATIONS_HAS_INVENTORY_NOT_FOUND();
    }
    await remove(reservation_id, inventoryToRemove.inventory_id);
}
export default {
    getAll,
    getAllInventoryItemsOfReservation,
    addInventoryItemToReservation,
    getAvailableInventoryItemByDateAndWeekTime,
    create,
    remove,
    removeGameFromReservations,
};
