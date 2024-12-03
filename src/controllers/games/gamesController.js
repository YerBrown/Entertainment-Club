/**
 * Controlador para gestionar los juegos.
 * Este controlador incluye funciones para realizar operaciones CRUD (crear, leer, actualizar, eliminar) sobre los juegos.
 *
 * @namespace GamesController
 */

import Game from "../../models/gameModel.js";
import errors from "../../helpers/errors.js";

/**
 * Devuelve todos los juegos
 *
 * @async
 * @function getAll
 * @memberof GamesController
 * @returns {Object[]} - Array de objetos con los juegos
 */
async function getAll() {
    const games = await Game.findAll();
    return games;
}
/**
 * Devuelve un juego por id
 * @async
 * @function getById
 * @memberof GamesController
 * @param {number} id - Id del juego
 * @returns {object} - Objeto con el juego
 * @throws {GAME_NOT_FOUND} - Si el juego no existe
 *
 * @example
 * // Ejemplo de uso
 * const game = await getById(1);
 * console.log(game);
 * // Salida: { id: 1, name: "Catan", minPlayers: 3, maxPlayers: 4 }
 */
async function getById(id) {
    const game = await Game.findByPk(id);
    if (!game) {
        throw new errors.GAME_NOT_FOUND();
    }
    return game;
}
/**
 * Crea un nuevo juego y lo añade a la base de datos
 *
 * @async
 * @function create
 * @memberof GamesController
 * @param {object} gameData - Objeto con los datos del juego a crear.
 * @returns {object} - Devuelve el objeto con los datos del juego creado.
 *
 * @example
 * // Ejemplo de uso
 * const newGame = await create({
 *     name: "Dixit",
 *     minPlayers: 3,
 *     maxPlayers: 6,
 *     description: "Juego de cartas ilustradas donde los jugadores deben adivinar la carta que corresponde a una pista dada.",
 * });
 * console.log(newGame);
 * // Salida: { id: 1, name: "Dixit", minPlayers: 3, maxPlayers: 6, description: "Juego de cartas ilustradas...}
 */
async function create(gameData) {
    const game = await Game.create(gameData);
    return game;
}
/**
 * Actualiza los datos de un juego en la base de datos
 *
 * @async
 * @function update
 * @memberof GamesController
 * @param {number} id - Id del juego a actualizar
 * @param {object} gameData - Objeto con los nuevos datos del juego
 * @returns {object} - Devuelve el objeto con los datos del juego actualizado.
 * @throws {GAME_NOT_FOUND} - Si el juego no existe
 * @example
 * // Ejemplo de uso
 * const updatedGame = await update(1, {
 *    name: "Dixit 2",
 *    minPlayers: 3,
 *   maxPlayers: 6,
 *   description: "Juego de cartas ilustradas donde los jugadores deben adivinar la carta que corresponde a una pista dada.",
 * });
 * console.log(updatedGame);
 * // Salida: { id: 1, name: "Dixit 2", minPlayers: 3, maxPlayers: 6, description: "Juego de cartas ilustr...}
 */
async function update(id, gameData) {
    const game = await Game.findByPk(id);
    if (!game) {
        throw new errors.GAME_NOT_FOUND();
    }
    await game.update(gameData);
    return game;
}
/**
 * Elimina un juego de la base de datos
 *
 * @async
 * @function remove
 * @memberof GamesController
 * @param {number} id - Id del juego a eliminar
 * @returns {object} - Devuelve el objeto con los datos del juego eliminado.
 * @throws {GAME_NOT_FOUND} - Si el juego no existe
 * @example
 * // Ejemplo de uso
 * const deletedGame = await remove(1);
 * console.log(deletedGame);
 * Salida: { id: 1, name: "Dixit 2", minPlayers: 3, maxPlayers: 6, description: "Juego de cartas ilustr..}
 */
async function remove(id) {
    const game = await Game.findByPk(id);
    if (!game) {
        throw new errors.GAME_NOT_FOUND();
    }
    await game.destroy();
    return game;
}
export default {
    getAll,
    getById,
    create,
    update,
    remove,
};
