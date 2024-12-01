import sequelize from "../../config/sequelize.js";
import { Op } from "sequelize";
import Reservation from "../..//models/reservationModel.js";
import User from "../..//models/userModel.js";
import Room from "../..//models/roomModel.js";
import WeekTime from "../..//models/weekTimeModel.js";
import weekTimesController from "../week_times/weekTimesController.js";
import inventoryController from "../inventory/inventoryController.js";
import reservationsHasInventoryController from "../reservationsHasInventory/reservationsHasInventoryController.js";
import errors from "../../helpers/errors.js";

async function getAll() {
    const reservations = await Reservation.findAll();
    return reservations;
}
async function getById(id) {
    const reservation = await Reservation.findByPk(id);
    return reservation;
}

async function create(user_id, room_id, week_time_id, date) {
    const user = await User.findByPk(user_id);
    if (!user) {
        throw new errors.USER_NOT_FOUND();
    }

    const room = await Room.findByPk(room_id);
    if (!room) {
        throw new errors.ROOM_NOT_FOUND();
    }

    const weekTime = await WeekTime.findByPk(week_time_id);
    if (!weekTime) {
        throw new errors.WEEK_TIME_NOT_FOUND();
    }

    const reservation = await Reservation.create({
        user_id,
        room_id,
        week_time_id,
        date,
    });
    return reservation;
}
async function update(id, user_id, room_id, week_time_id, date) {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
        throw new errors.RESERVATION_NOT_FOUND();
    }

    const user = await User.findByPk(user_id);
    if (!user) {
        throw new errors.USER_NOT_FOUND();
    }

    const room = await Room.findByPk(room_id);
    if (!room) {
        throw new errors.ROOM_NOT_FOUND();
    }

    const weekTime = await WeekTime.findByPk(week_time_id);
    if (!weekTime) {
        throw new errors.WEEK_TIME_NOT_FOUND();
    }

    await reservation.update({
        user_id,
        room_id,
        week_time_id,
        date,
    });
    return reservation;
}
async function remove(id) {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
        throw new errors.RESERVATION_NOT_FOUND();
    }

    await reservation.destroy();
    return reservation;
}
// Obtener todos los horarios de un salón para una fecha específica y su estado de ocupación
async function getFreeTimesByDate(room_id, date) {
    const room = await Room.findByPk(room_id);
    if (!room) {
        throw new errors.ROOM_NOT_FOUND();
    }
    // Obtener todas las reservas de ese salón en la fecha dada
    const reservationsInDate = await Reservation.findAll({
        where: {
            room_id,
            date,
        },
    });
    // Obtener los IDs de los horarios reservados en esa fecha
    const weekTimesReserved = [];
    for (const reservation of reservationsInDate) {
        weekTimesReserved.push(reservation.week_time_id);
    }
    // Obtener todos los horarios de la semana para esa fecha
    const weekTimesOfDate = await weekTimesController.getAllByDate(date);

    // Verificar el estado de ocupación de cada horario y crear un objeto con el estado de ocupación
    const weekTimesState = [];
    for (const weekTime of weekTimesOfDate) {
        let reserved = false;
        const reservedWeekTime = weekTimesReserved.find(
            (reservedWeekTime) => reservedWeekTime === weekTime.id
        );
        if (reservedWeekTime) {
            reserved = true;
        }
        weekTimesState.push({
            id: weekTime.id,
            time: weekTime.time,
            reserved,
        });
    }
    return weekTimesState;
}
// TODO: Obtener todos los items disponibles para una fecha y horario específicos
async function getAvailableInventoryItemsByDateTime(date, week_time_id) {
    const reservationsInDateTime = await Reservation.findAll({
        where: {
            date,
            week_time_id,
        },
    });

    const amountOfGamesInInventory =
        await inventoryController.getAmountOfGames();

    const allItemsReserved = [];
    for (const reservation of reservationsInDateTime) {
        const reservedItems =
            await reservationsHasInventoryController.getAllInventoryItemsOfReservation(
                reservation.id
            );

        allItemsReserved.push(...reservedItems.inventory_items);
    }

    for (const itemReserved of allItemsReserved) {
        for (const game of amountOfGamesInInventory) {
            if (game.game_id === itemReserved.game_id) {
                --game.amount;
            }
        }
    }

    return amountOfGamesInInventory;
}

async function getAllReservationsByDateAndWeekTime(date, week_time_id) {
    const reservations = await Reservation.findAll({
        where: {
            date,
            week_time_id,
        },
    });
    return reservations;
}

async function createNewReservation(
    user_id,
    room_id,
    week_time_id,
    date,
    games
) {
    const newReservation = await create(user_id, room_id, week_time_id, date);

    const inventoryItems = [];
    for (const game_id of games) {
        const availableInventoryItem =
            await reservationsHasInventoryController.getAvailableInventoryItemByDateAndWeekTime(
                date,
                week_time_id,
                game_id
            );
        if (availableInventoryItem) {
            inventoryItems.push(availableInventoryItem);
        }
    }

    for (const inventoryItem of inventoryItems) {
        await reservationsHasInventoryController.addInventoryItemToReservation(
            newReservation.id,
            inventoryItem.id
        );
    }

    return newReservation;
}
export default {
    getAll,
    getById,
    getFreeTimesByDate,
    getAvailableInventoryItemsByDateTime,
    getAllReservationsByDateAndWeekTime,
    create,
    update,
    remove,
};
