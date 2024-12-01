import reservationsHasInventoryController from "./reservationsHasInventoryController.js";
import errors from "../../helpers/errors.js";

async function getAll(req, res) {
    try {
        const reservationsHasInventories =
            await reservationsHasInventoryController.getAll();
        res.json(reservationsHasInventories);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function getAllInventoryItemsOfReservation(req, res) {
    try {
        const reservationInventoryItems =
            await reservationsHasInventoryController.getAllInventoryItemsOfReservation(
                req.body.reservation_id
            );
        res.json(reservationInventoryItems);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function addInventoryItemToReservation(req, res) {
    try {
        const reservation_id = req.body.reservation_id;
        const game_id = req.body.game_id;

        const reservationHasInventory =
            await reservationsHasInventoryController.addInventoryItemToReservation(
                reservation_id,
                game_id
            );
        res.json(reservationHasInventory);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function getAvailableInventoryItemByDateAndWeekTime(req, res) {
    try {
        const date = req.body.date;
        const weekTime_id = req.body.week_time_id;
        const game_id = req.body.game_id;

        const availableInventoryItem =
            await reservationsHasInventoryController.getAvailableInventoryItemByDateAndWeekTime(
                date,
                weekTime_id,
                game_id
            );
        res.json(availableInventoryItem);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function create(req, res) {
    try {
        const reservation_id = req.body.reservation_id;
        const inventory_id = req.body.inventory_id;

        const reservationHasInventory =
            await reservationsHasInventoryController.create(
                reservation_id,
                inventory_id
            );
        res.status(201).json(reservationHasInventory);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function remove(req, res) {
    try {
        const reservationHasInventory =
            await reservationsHasInventoryController.remove(
                req.body.reservation_id,
                req.body.inventory_id
            );
        res.json(
            "Removed reference to inventory item of reservation successfully"
        );
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function removeGameFromReservations(req, res) {
    try {
        const game_id = req.body.game_id;
        const reservation_id = req.body.reservation_id;

        await reservationsHasInventoryController.removeGameFromReservations(
            reservation_id,
            game_id
        );
        res.json("Removed game from reservation successfully");
    } catch (error) {
        errors.handleError(res, error);
    }
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
