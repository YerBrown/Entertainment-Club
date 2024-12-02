import reservationController from "./reservationController.js";
import errors from "../../helpers/errors.js";
import jwt from "../../config/jwt.js";

async function getAll(req, res) {
    try {
        const reservations = await reservationController.getAll();
        res.json(reservations);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function getById(req, res) {
    try {
        const reservation = await reservationController.getById(req.params.id);
        res.json(reservation);
    } catch (error) {
        errors.handleError(res, error);
    }
}
async function getByUserId(req, res) {
    try {
        const reservations = await reservationController.getByUserId(
            req.params.user_id
        );
        res.json(reservations);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function getMyReservations(req, res) {
    try {
        const user_id = jwt.getTokenPayload(req).user_id;
        const reservations = await reservationController.getByUserId(user_id);
        res.json(reservations);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function getFullInformationById(req, res) {
    try {
        const user_id = jwt.getTokenPayload(req).user_id;
        const role = jwt.getTokenPayload(req).role;
        const reservation = await reservationController.getFullInformationById(
            req.params.id,
            user_id,
            role
        );
        res.json(reservation);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function getFreeTimesByDate(req, res) {
    try {
        const { room_id, date } = req.body;
        const freeTimes = await reservationController.getFreeTimesByDate(
            room_id,
            date
        );
        res.json(freeTimes);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function getAvailableInventoryItemsByDateTime(req, res) {
    try {
        const { date, week_time_id } = req.body;
        const availableInventoryItems =
            await reservationController.getAvailableInventoryItemsByDateTime(
                date,
                week_time_id
            );
        res.json(availableInventoryItems);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function create(req, res) {
    try {
        const { user_id, room_id, week_time_id, date } = req.body;

        const reservation = await reservationController.create(
            user_id,
            room_id,
            week_time_id,
            date
        );
        res.status(201).json(reservation);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { user_id, room_id, week_time_id, date } = req.body;
        const reservation = await reservationController.update(
            id,
            user_id,
            room_id,
            week_time_id,
            date
        );
        res.json(reservation);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        const reservation = await reservationController.remove(id);
        res.json(reservation);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function createNewReservation(req, res) {
    try {
        const { user_id, room_id, week_time_id, date, games } = req.body;
        console.log("Game ids:", games);
        const reservation = await reservationController.createNewReservation(
            user_id,
            room_id,
            week_time_id,
            date,
            games
        );

        res.status(201).json(reservation);
    } catch (error) {
        errors.handleError(res, error);
    }
}

export default {
    getAll,
    getById,
    getByUserId,
    getMyReservations,
    getFullInformationById,
    getFreeTimesByDate,
    getAvailableInventoryItemsByDateTime,
    createNewReservation,
    create,
    update,
    remove,
};
