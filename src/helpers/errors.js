class GAME_NOT_FOUND extends Error {
    constructor() {
        super("Juego no encontrado");
        this.status = 404;
    }
}

export default {
    GAME_NOT_FOUND,
};
