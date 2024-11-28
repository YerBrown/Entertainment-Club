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
                req.body.reservation_id
            );
        res.json(
            "Removed reference to all inventory items of reservation successfully"
        );
    } catch (error) {
        errors.handleError(res, error);
    }
}

export default {
    getAll,
    getAllInventoryItemsOfReservation,
    create,
    remove,
};
