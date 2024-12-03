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
import errors from "../../helpers/errors.js";
/**
 * Controlador para gestionar las reservas
 *
 * @namespace ReservationsController
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
 * @memberof ReservationsController
 * @param {Number} id - id de la reserva
 * @param {Number} user_id - id del usuario logeado
 * @param {String} role - rol del usuario logeado
 * @returns {Object} - Devuelve todos los datos relacionados con la reserva, desde los datos del usuario que la realizo, la informacion de la sala, los datos de la fecha y hora de reserva y los juegos reservados.
 * @example
 * {
 *   "reservation_id": 1,
 *   "user": {
 *       "user_id": 1,
 *       "username": "iker89",
 *       "email": "iker89@example.com"
 *   },
 *   "room": {
 *       "room_id": 3,
 *       "room_name": "Sala 3",
 *       "max_guests": 8,
 *       "price": "80€"
 *   },
 *   "dateTime": {
 *       "week_time_id": 10,
 *       "date": "2024-12-17",
 *       "time": "10:00:00"
 *   },
 *    "inventory_items": [
 *        {
 *            "inventory_id": 3,
 *            "game_id": 1,
 *            "game_name": "Karaoke",
 *            "game_description": "Contamos con dos microfonos por sala para poder usar como karaoke"
 *        },
 *        {
 *            "inventory_id": 14,
 *            "game_id": 2,
 *            "game_name": "Catan",
 *            "game_description": "Juego de estrategia donde los jugadores colonizan una isla, construyen asentamientos y comercian recursos."
 *        },
 *        {
 *            "inventory_id": 50,
 *            "game_id": 10,
 *            "game_name": "Codenames",
 *            "game_description": "Juego de palabras por equipos donde se deben adivinar las palabras clave basándose en pistas dadas por un compañero."
 *        },
 *        {
 *            "inventory_id": 92,
 *            "game_id": 22,
 *            "game_name": "Super Smash Bros. Ultimate",
 *            "game_description": "Juego de lucha que reúne a personajes icónicos de diversas franquicias de Nintendo y otros universos, permitiendo combates de hasta ocho jugadores."
 *        }
 *    ]
 * }
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
 * @memberof ReservationsController
 * @param {Number} room_id - id de la sala
 * @param {String} date - fecha seleccionada
 * @returns {Object} - Devuelve una lista de objetos con las horas disponibles y su estado de ocupado o libre
 * @throws {ROOM_NOT_FOUND} - Si no encuentra la sala
 * @example
 * [
 *    {
 *        "id": 19,
 *        "time": "10:00:00",
 *        "reserved": false
 *    },
 *    {
 *        "id": 20,
 *        "time": "11:00:00",
 *        "reserved": false
 *    },
 *    {
 *        "id": 21,
 *        "time": "12:00:00",
 *        "reserved": false
 *    },
 *    {
 *        "id": 22,
 *        "time": "13:00:00",
 *        "reserved": false
 *    },
 *    {
 *        "id": 23,
 *        "time": "17:00:00",
 *        "reserved": false
 *    },
 *    {
 *        "id": 24,
 *        "time": "18:00:00",
 *        "reserved": false
 *    },
 *    {
 *        "id": 25,
 *        "time": "19:00:00",
 *        "reserved": false
 *    },
 *    {
 *        "id": 26,
 *        "time": "20:00:00",
 *        "reserved": false
 *    },
 *    {
 *        "id": 27,
 *        "time": "21:00:00",
 *        "reserved": false
 *    }
 * ]
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
 * @memberof ReservationsController
 * @param {String} date - fecha seleccionada
 * @param {Number} week_time_id - hora seleccionada
 * @returns {Object} - Devuelve una lista de objetos con los datos de los juegos en el inventario y su cantidad disponible para la fecha y hora seleccionada.
 * @example
 * [
 *  {
 *      "game_id": 1,
 *      "game_name": "Karaoke",
 *      "game_description": "Contamos con dos microfonos por sala para poder usar como karaoke",
 *      "amount": 10
 *  },
 *  {
 *      "game_id": 2,
 *      "game_name": "Catan",
 *      "game_description": "Juego de estrategia donde los jugadores colonizan una isla, construyen asentamientos y comercian recursos.",
 *      "amount": 5
 *  },
 *  {
 *      "game_id": 3,
 *      "game_name": "Carcassonne",
 *      "game_description": "Juego de colocación de losetas donde se construyen ciudades, caminos y campos en la región medieval de Carcassonne.",
 *      "amount": 5
 *  },
 *  {
 *      "game_id": 4,
 *      "game_name": "Dixit",
 *      "game_description": "Juego de cartas ilustradas donde los jugadores deben adivinar la carta que corresponde a una pista dada.",
 *      "amount": 5
 *  },
 *  {
 *      ...
 *  }
 * ]
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
/**
 * Crea una nueva reserva para el usuario logeado con los juegos seleccionados.
 * @async
 * @function createNewReservation
 * @memberof ReservationsController
 * @param {Number} user_id - Id del usuario.
 * @param {Number} room_id - Id de la sala.
 * @param {Number} week_time_id - Id de la hora de la semana.
 * @param {String} date - Fecha de la reserva.
 * @param {Number[]} games - Array con los ids de los juegos.
 * @return {Object} - Objeto con todos los datos de la reserva nueva, con un comentario en el caso de que no se pueda añadir algun juego por falta en el inventario.
 * @throws {USER_NOT_FOUND} - Si no encuentra el usuario
 * @throws {ROOM_NOT_FOUND} - Si no encuentra la sala
 * @throws {WEEK_TIME_NOT_FOUND} - Si no encuentra la hora de la semana
 * @throws {ALREADY_RESERVED} - Si ya hay una reserva a la misma hora y el mismo dia en esa sala
 * @example
 * {
 *    "comment": "",
 *    "id": 9,
 *    "user_id": 10,
 *    "room_id": "2",
 *    "week_time_id": "34",
 *    "date": "2024-12-20T00:00:00.000Z",
 *    "time": "19:00:00",
 *    "inventory_items": [
 *        {
 *            "inventory_id": 1,
 *            "game_id": 1,
 *            "game_name": "Karaoke",
 *            "game_description": "Contamos con dos microfonos por sala para poder usar como karaoke"
 *        },
 *        {
 *            "inventory_id": 11,
 *            "game_id": 2,
 *            "game_name": "Catan",
 *            "game_description": "Juego de estrategia donde los jugadores colonizan una isla, construyen asentamientos y comercian recursos."
 *        },
 *        {
 *            "inventory_id": 16,
 *            "game_id": 3,
 *            "game_name": "Carcassonne",
 *            "game_description": "Juego de colocación de losetas donde se construyen ciudades, caminos y campos en la región medieval de Carcassonne."
 *        },
 *        {
 *            "inventory_id": 21,
 *            "game_id": 4,
 *            "game_name": "Dixit",
 *            "game_description": "Juego de cartas ilustradas donde los jugadores deben adivinar la carta que corresponde a una pista dada."
 *        }
 *    ]
 * }
 */
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
