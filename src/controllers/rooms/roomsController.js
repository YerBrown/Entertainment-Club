import sequelize from "../../config/sequelize.js";
import { Op } from "sequelize";
import Room from "../..//models/roomModel.js";
import errors from "../../helpers/errors.js";

/**
 * Controlador para gestionar las salas
 *
 * @module RoomsController
 */
/**
 * Obtener la informacion de todas las salas
 *
 * @async
 * @function getAll
 * @memberof module:RoomsController
 * @returns {object[]} - Lista de objetos con los datos de todas las salas
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
