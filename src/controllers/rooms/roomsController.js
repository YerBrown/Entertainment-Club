import sequelize from "../../config/sequelize.js";
import { Op } from "sequelize";
import Room from "../..//models/roomModel.js";
import errors from "../../helpers/errors.js";

/**
 * Controlador para gestionar las salas
 *
 * @namespace RoomsController
 */
/**
 * Obtener la informacion de todas las salas
 *
 * @async
 * @function getAll
 * @memberof RoomsController
 * @returns {Object[]} - Lista de objetos con los datos de todas las salas
 * @example
 * [
 *    {
 *        "price": "40€",
 *        "id": 1,
 *        "name": "Sala 1",
 *        "max_guests": 4
 *    },
 *    {
 *        "price": "60€",
 *        "id": 2,
 *        "name": "Sala 2",
 *        "max_guests": 6
 *    },
 *    {
 *        "price": "80€",
 *        "id": 3,
 *        "name": "Sala 3",
 *        "max_guests": 8
 *    },
 *    {
 *        "price": "90€",
 *        "id": 4,
 *        "name": "Sala 4",
 *        "max_guests": 10
 *    },
 *    {
 *        "price": "40€",
 *        "id": 5,
 *        "name": "Sala 5",
 *        "max_guests": 4
 *    }
 * ]
 */

async function getAll() {
    const rooms = await Room.findAll();
    return rooms;
}
async function getById(id) {
    const room = await Room.findByPk(id);
    return room;
}
async function create(name, max_guests) {
    const room = await Room.create({ name, max_guests });
    return room;
}
async function update(id, name, max_guests) {
    const room = await Room.findByPk(id);
    if (!room) {
        throw new errors.ROOM_NOT_FOUND();
    }

    await room.update({ name, max_guests });
    return room;
}
async function remove(id) {
    const room = await Room.findByPk(id);
    if (!room) {
        throw new errors.ROOM_NOT_FOUND();
    }
    await room.destroy();
    return room;
}

export default {
    getAll,
    getById,
    create,
    update,
    remove,
};
