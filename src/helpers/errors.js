// Maneja los errores y responde con un estado 500 y el mensaje del error
async function handleError(res, error) {
    console.error(error);
    if (error.status) {
        res.status(error.status);
    } else {
        res.status(500);
    }
    res.json({ error: error.message });
}

class GAME_NOT_FOUND extends Error {
    constructor() {
        super("Juego no encontrado");
        this.status = 404;
    }
}

class INVENTORY_ITEM_NOT_FOUND extends Error {
    constructor() {
        super("Artículo del inventario no encontrado");
        this.status = 404;
    }
}

class ROOM_NOT_FOUND extends Error {
    constructor() {
        super("Sala no encontrada");
        this.status = 404;
    }
}

class WEEK_TIME_NOT_FOUND extends Error {
    constructor() {
        super("Horario de la semana no encontrado");
        this.status = 404;
    }
}

class RESERVATIONS_HAS_INVENTORY_NOT_FOUND extends Error {
    constructor() {
        super("Enlace del inventario con reserva no encontrado");
        this.status = 404;
    }
}

class RESERVATION_NOT_FOUND extends Error {
    constructor() {
        super("Reserva no encontrada");
        this.status = 404;
    }
}

class USER_NOT_FOUND extends Error {
    constructor() {
        super("Usuario no encontrado");
        this.status = 404;
    }
}

class PASSWORD_NOT_MATCH extends Error {
    constructor() {
        super("Las contraseñas no coinciden");
        this.status = 400;
    }
}

class EMAIL_ALREADY_EXISTS extends Error {
    constructor() {
        super("Este correo electrónico ya está registrado");
        this.status = 400;
    }
}

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
    ROOM_NOT_FOUND,
    WEEK_TIME_NOT_FOUND,
    RESERVATIONS_HAS_INVENTORY_NOT_FOUND,
    RESERVATION_NOT_FOUND,
    USER_NOT_FOUND,
    PASSWORD_NOT_MATCH,
    EMAIL_ALREADY_EXISTS,
    INVALID_CREDENTIALS,
};
