/**
 * Errores personalizados para la aplicación
 * @namespace CustomErrors
 */
/**
 * Maneja los errores de la aplicación
 * @function handleError
 * @memberof CustomErrors
 * @param {Response} res - Respuesta de http
 * @param {Error} error - Error a manejar
 */
async function handleError(res, error) {
    console.error(error);
    if (error.status) {
        res.status(error.status);
    } else {
        res.status(500);
    }
    res.json({ error: error.message });
}

/**
 * Error para cuando no se encuentra un juego
 * @memberof CustomErrors
 * @typedef {Error} GAME_NOT_FOUND
 */
class GAME_NOT_FOUND extends Error {
    constructor() {
        super("Juego no encontrado");
        this.status = 404;
    }
}
/**
 * Error para cuando no encuentra un articulo del inventario
 * @extends Error
 * @typedef {Error} INVENTORY_ITEM_NOT_FOUND
 * @memberof CustomErrors
 */
class INVENTORY_ITEM_NOT_FOUND extends Error {
    constructor() {
        super("Artículo del inventario no encontrado");
        this.status = 404;
    }
}

/**
 * Error para decir que no hay juegos de ese tipo disponibles
 * @extends Error
 * @typedef {Error} NO_GAMES_OF_THIS_TYPE_AVAILABLE
 * @memberof CustomErrors
 */
class NO_GAMES_OF_THIS_TYPE_AVAILABLE extends Error {
    constructor(game_name) {
        super(`No hay juegos de ${game_name} disponibles`);
        this.status = 404;
    }
}
/**
 * Error para decir que no hay articulos de un tipo de juego en el inventario
 * @extends Error
 * @typedef {Error} NO_INVENTORY_ITEM_OF_THIS_GAME_FOUND
 * @memberof CustomErrors
 */
class NO_INVENTORY_ITEM_OF_THIS_GAME_FOUND extends Error {
    constructor() {
        super("No hay artículos de inventario de este juego");
        this.status = 404;
    }
}

/**
 * Error para decir que no se ha encontrado una sala
 * @extends Error
 * @typedef {Error} ROOM_NOT_FOUND
 * @memberof CustomErrors
 */
class ROOM_NOT_FOUND extends Error {
    constructor() {
        super("Sala no encontrada");
        this.status = 404;
    }
}

/**
 * Error cuando no se encuentra el horario de la semana
 * @extends Error
 * @typedef {Error} WEEK_TIME_NOT_FOUND
 * @memberof CustomErrors
 */
class WEEK_TIME_NOT_FOUND extends Error {
    constructor() {
        super("Horario de la semana no encontrado");
        this.status = 404;
    }
}
/**
 * Error cuando no se encuentra el objeto de la reserva
 * @extends Error
 * @typedef {Error} RESERVATIONS_HAS_INVENTORY_NOT_FOUND
 * @memberof CustomErrors
 */
class RESERVATIONS_HAS_INVENTORY_NOT_FOUND extends Error {
    constructor() {
        super("Objeto de la reserva no encontrado");
        this.status = 404;
    }
}

/**
 * Error cuando no se encuentra la reserva
 * @extends Error
 * @typedef {Error} RESERVATION_NOT_FOUND
 * @memberof CustomErrors
 */
class RESERVATION_NOT_FOUND extends Error {
    constructor() {
        super("Reserva no encontrada");
        this.status = 404;
    }
}
/**
 * Error cuando ya hay una reserva en esa sala ese día y a esa hora
 * @extends Error
 * @typedef {Error} ALREADY_RESERVED
 * @memberof CustomErrors
 */
class ALREADY_RESERVED extends Error {
    constructor() {
        super(
            "Ya hay una reserva ese mismo dia y a la misma hora en la sala seleccionada"
        );
        this.status = 400;
    }
}
/**
 * Error cuando no se encuentra el usuario
 * @extends Error
 * @typedef {Error} USER_NOT_FOUND
 * @memberof CustomErrors
 */
class USER_NOT_FOUND extends Error {
    constructor() {
        super("Usuario no encontrado");
        this.status = 404;
    }
}
/**
 * Error cuando las contraseñas no coinciden
 * @extends Error
 * @typedef {Error} PASSWORD_NOT_MATCH
 * @memberof CustomErrors
 */
class PASSWORD_NOT_MATCH extends Error {
    constructor() {
        super("Las contraseñas no coinciden");
        this.status = 400;
    }
}
/**
 * Error cuando el correo electrónico ya está registrado
 * @extends Error
 * @typedef {Error} EMAIL_ALREADY_EXISTS
 * @memberof CustomErrors
 */
class EMAIL_ALREADY_EXISTS extends Error {
    constructor() {
        super("Este correo electrónico ya está registrado");
        this.status = 400;
    }
}

/**
 * Error cuando las credenciales no son válidas
 * @extends Error
 * @typedef {Error} INVALID_CREDENTIALS
 * @memberof CustomErrors
 */
class INVALID_CREDENTIALS extends Error {
    constructor() {
        super("Credenciales inválidas");
        this.status = 401;
    }
}

export default {
    handleError,
    GAME_NOT_FOUND,
    INVENTORY_ITEM_NOT_FOUND,
    NO_GAMES_OF_THIS_TYPE_AVAILABLE,
    NO_INVENTORY_ITEM_OF_THIS_GAME_FOUND,
    ROOM_NOT_FOUND,
    WEEK_TIME_NOT_FOUND,
    RESERVATIONS_HAS_INVENTORY_NOT_FOUND,
    RESERVATION_NOT_FOUND,
    ALREADY_RESERVED,
    USER_NOT_FOUND,
    PASSWORD_NOT_MATCH,
    EMAIL_ALREADY_EXISTS,
    INVALID_CREDENTIALS,
};
