import sequelize from "../../config/sequelize.js";
import { Op } from "sequelize";
import Reservation from "../..//models/reservationModel.js";
import User from "../..//models/userModel.js";
import Room from "../..//models/roomModel.js";
import WeekTime from "../..//models/weekTimeModel.js";
import weekTimesController from "../week_times/weekTimesController.js";
import inventoryController from "../inventory/inventoryController.js";
import gamesController from "../games/gamesController.js";
import reservationsHasInventoryController from "../reservationsHasInventory/reservationsHasInventoryController.js";
import roomsController from "../rooms/roomsController.js";
import errors from "../../helpers/errors.js";
/**
 * Controlador para gestionar las reservas
 *
 * @module ReservationsController
 */
async function getAll() {
    const reservations = await Reservation.findAll();
    return reservations;
}
async function getById(id) {
    const reservation = await Reservation.findByPk(id);
    return reservation;
}
async function getByUserId(user_id) {
    const reservations = await Reservation.findAll({
        where: {
            user_id,
        },
    });
    return reservations;
}
/**
 * Obtener todos los datos relacionados con una reserva
 * @async
 * @function getFullInformationById
 * @memberof module:ReservationsController
 * @param {number} id - id de la reserva
 * @param {number} user_id - id del usuario logeado
 * @param {string} role - rol del usuario logeado
 * @returns {object} - Devuelve todos los datos relacionados con la reserva, desde los datos del usuario que la realizo, la informacion de la sala, los datos de la fecha y hora de reserva y los juegos reservados
 */
async function getFullInformationById(id, user_id, role) {
    const reservation = await Reservation.findByPk(id, {
        include: [
            {
                model: User,
                attributes: ["username", "email"],
            },
            {
                model: Room,
                attributes: ["name", "max_guests", "price"],
            },
            {
                model: WeekTime,
                attributes: ["time"],
            },
        ],
    });
    if (role == "client" && reservation.user_id !== user_id) {
        throw new Error("not allowed");
    }
    const inventoryItems =
        await reservationsHasInventoryController.getAllInventoryItemsOfReservation(
            id
        );
    const fullReservation = {
        reservation_id: reservation.id,
        user: {
            user_id: reservation.user_id,
            username: reservation.get("user").username,
            email: reservation.get("user").email,
        },
        room: {
            room_id: reservation.room_id,
            room_name: reservation.get("room").name,
            max_guests: reservation.get("room").max_guests,
            price: reservation.get("room").price,
        },
        dateTime: {
            week_time_id: reservation.week_time_id,
            date: reservation.date,
            time: reservation.get("week_time").time,
        },
        inventory_items: inventoryItems.inventory_items,
    };
    return fullReservation;
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
    const sameDateTime = await Reservation.findOne({
        where: {
            week_time_id,
            date,
            room_id,
        },
    });
    if (sameDateTime) {
        throw new errors.ALREADY_RESERVED();
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
/**
 * Obtener todos las horas disponibles de reserva y los estados de si estan ocupadas o no
 * @async
 * @function getFreeTimesByDate
 * @memberof module:ReservationsController
 * @param {number} room_id - id de la sala
 * @param {string} date - fecha seleccionada
 * @returns {object} - Devuelve una lista de objetos con las horas disponibles y su estado de ocupado o libre
 */
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
/**
 * Obtener todos los juegos del inventario disponibles para la fecha y hora especifica
 * @async
 * @function getAvailableInventoryItemsByDateTime
 * @memberof module:ReservationsController
 * @param {string} date - fecha seleccionada
 * @param {number} week_time_id - hora seleccionada
 * @returns {object} - Devuelve una lista de objetos con los datos de los juegos en el inventario y su cantidad disponible para la fecha y hora seleccionada
 */
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
    const gamesNotAvailable = [];
    for (const game_id of games) {
        const availableInventoryItem =
            await reservationsHasInventoryController.getAvailableInventoryItemByDateAndWeekTime(
                date,
                week_time_id,
                parseInt(game_id)
            );
        if (availableInventoryItem) {
            inventoryItems.push(availableInventoryItem);
            await reservationsHasInventoryController.addInventoryItemToReservation(
                newReservation.id,
                availableInventoryItem.game_id
            );
        } else {
            const game = await gamesController.getById(game_id);
            if (!gamesNotAvailable.includes(game.name)) {
                gamesNotAvailable.push(game.name);
            }
        }
    }
    const weekTime = await weekTimesController.getById(
        newReservation.week_time_id
    );
    let reservationComment = "";
    if (gamesNotAvailable.length > 0) {
        reservationComment = `Los siguientes juegos no estan disponibles: ${gamesNotAvailable.join(
            ", "
        )}`;
    }
    const fullReservation = {
        comment: reservationComment,
        id: newReservation.id,
        user_id: newReservation.user_id,
        room_id: newReservation.room_id,
        week_time_id: newReservation.week_time_id,
        date: newReservation.date,
        time: weekTime.time,
        inventory_items: inventoryItems,
    };
    return fullReservation;
}
export default {
    getAll,
    getById,
    getByUserId,
    getFullInformationById,
    getFreeTimesByDate,
    getAvailableInventoryItemsByDateTime,
    getAllReservationsByDateAndWeekTime,
    createNewReservation,
    create,
    update,
    remove,
};
