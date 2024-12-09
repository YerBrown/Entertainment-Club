import { jest } from "@jest/globals";
import gamesController from "../../src/controllers/games/gamesController.js";
import Game from "../../src/models/gameModel.js";
import errors from "../../src/helpers/errors.js";

Game.findAll = jest.fn();
Game.findByPk = jest.fn();
Game.create = jest.fn();
Game.update = jest.fn();
Game.destroy = jest.fn();

describe("Games Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpia los mocks antes de cada test
    });
    describe("getAll", () => {
        it("should return all games", async () => {
            const mockGames = [
                {
                    id: 1,
                    name: "Karaoke",
                    min_players: 1,
                    max_players: 2,
                    description:
                        "Contamos con dos microfonos por sala para poder usar como karaoke",
                },
                {
                    id: 2,
                    name: "Catan",
                    min_players: 3,
                    max_players: 4,
                    description:
                        "Juego de estrategia donde los jugadores colonizan una isla, construyen asentamientos y comercian recursos.",
                },
                {
                    id: 3,
                    name: "Carcassonne",
                    min_players: 2,
                    max_players: 5,
                    description:
                        "Juego de colocación de losetas donde se construyen ciudades, caminos y campos en la región medieval de Carcassonne.",
                },
                {
                    id: 4,
                    name: "Dixit",
                    min_players: 3,
                    max_players: 6,
                    description:
                        "Juego de cartas ilustradas donde los jugadores deben adivinar la carta que corresponde a una pista dada.",
                },
            ];
            Game.findAll.mockResolvedValueOnce(mockGames);

            const result = await gamesController.getAll();
            expect(result).toEqual(mockGames);
        });
    });
    describe("getById", () => {
        it("should return a game by id", async () => {
            const mockGame = {
                id: 1,
                name: "Karaoke",
                min_players: 1,
                max_players: 2,
                description:
                    "Contamos con dos microfonos por sala para poder usar como karaoke",
            };
            Game.findByPk.mockResolvedValueOnce(mockGame);

            const result = await gamesController.getById(1);
            expect(result).toEqual(mockGame);
        });
        it("should throw an error if game not found", async () => {
            Game.findByPk.mockRejectedValue(new errors.GAME_NOT_FOUND());

            await expect(gamesController.getById(1)).rejects.toThrow(
                errors.GAME_NOT_FOUND
            );
        });
    });
    describe("create", () => {
        it("should create a new game", async () => {
            const mockGame = {
                id: 1,
                name: "Karaoke",
                min_players: 1,
                max_players: 2,
                description:
                    "Contamos con dos microfonos por sala para poder usar como karaoke",
            };
            Game.create.mockResolvedValueOnce(mockGame);

            const result = await gamesController.create({
                name: "Karaoke",
                min_players: 1,
                max_players: 2,
                description:
                    "Contamos con dos microfonos por sala para poder usar como karaoke",
            });
            expect(result).toEqual(mockGame);
        });
    });
    describe("update", () => {
        it("should update a game by id", async () => {
            const mockGame = {
                id: 1,
                name: "Karaoke",
                min_players: 1,
                max_players: 2,
                description:
                    "Contamos con dos microfonos por sala para poder usar como karaoke",
            };
            Game.findByPk.mockResolvedValueOnce(mockGame);
            Game.update.mockResolvedValueOnce(mockGame);

            const result = await gamesController.update(1, {
                name: "Karaoke",
                min_players: 1,
                max_players: 2,
                description:
                    "Contamos con tres microfonos por sala para poder usar como karaoke",
            });
            expect(result).toEqual(mockGame);
        });
    });
});
