import { jest } from "@jest/globals";
import gamesController from "../../src/controllers/games/gamesController.js";
import errors from "../../src/helpers/errors.js";
jest.clearAllMocks(); // Limpia los mocks antes de cada test

gamesController.getAll = jest.fn();
gamesController.getById = jest.fn();
gamesController.create = jest.fn();
gamesController.update = jest.fn();
gamesController.remove = jest.fn();
describe("Games API Controller", () => {
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
            gamesController.getAll.mockResolvedValueOnce(mockGames);

            const result = await gamesController.getAll();
            expect(result).toEqual(mockGames);
            expect(gamesController.getAll).toHaveBeenCalled();
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
            gamesController.getById.mockResolvedValueOnce(mockGame);

            const result = await gamesController.getById(1);
            expect(result).toEqual(mockGame);
            expect(gamesController.getById).toHaveBeenCalledWith(1);
        });
        it("should throw an error if game not found", async () => {
            gamesController.getById.mockRejectedValue(
                new errors.GAME_NOT_FOUND()
            );

            await expect(gamesController.getById(1)).rejects.toThrow(
                errors.GAME_NOT_FOUND
            );
            expect(gamesController.getById).toHaveBeenCalledWith(1);
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
            gamesController.create.mockResolvedValueOnce(mockGame);

            const result = await gamesController.create({
                name: "Karaoke",
                min_players: 1,
                max_players: 2,
                description:
                    "Contamos con dos microfonos por sala para poder usar como karaoke",
            });
            expect(result).toEqual(mockGame);
            expect(gamesController.create).toHaveBeenCalledWith({
                name: "Karaoke",
                min_players: 1,
                max_players: 2,
                description:
                    "Contamos con dos microfonos por sala para poder usar como karaoke",
            });
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
            gamesController.update.mockResolvedValueOnce(mockGame);

            const result = await gamesController.update(1, {
                name: "Karaoke 2",
                min_players: 2,
                max_players: 3,
                description:
                    "Contamos con tres microfonos por sala para poder usar como karaoke",
            });
            expect(result).toEqual(mockGame);
            expect(gamesController.update).toHaveBeenCalledWith(1, {
                name: "Karaoke 2",
                min_players: 2,
                max_players: 3,
                description:
                    "Contamos con tres microfonos por sala para poder usar como karaoke",
            });
        });
    });
});
