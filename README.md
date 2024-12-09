# Entertainment-Club 🎲🎮🎤

Entertainment-Club es una API backend diseñada para gestionar las operaciones de un establecimiento de entretenimiento que ofrece experiencias de **juegos de mesa**, **videojuegos multijugador** y **karaoke**. Esta solución proporciona una plataforma robusta para **reservar espacios**, **administrar colecciones de juegos** y **gestionar reservas**, asegurando una experiencia fluida tanto para los clientes como para el personal.

## 🚀 Características

-   **Gestión de usuarios**: Registro e inicio de sesión con autenticación segura.
-   **Gestión de juegos**:
    -   Juegos de mesa y videojuegos.
    -   Inventario para controlar la disponibilidad.
-   **Gestión de reservas**:
    -   Espacios como salas de karaoke o mesas para juegos.
    -   Disponibilidad por días y horarios.
-   **Panel de administración**: Operaciones CRUD para juegos, usuarios, y reservas.
-   **Autenticación con JWT**: Seguridad para rutas privadas.

---

## 📦 Tecnologías Utilizadas

-   **Backend**:
    -   Node.js
    -   Express
    -   Sequelize (ORM)
-   **Base de Datos**:
    -   MySQL
-   **Autenticación**:
    -   JSON Web Tokens (JWT)
    -   Bcrypt para el cifrado de contraseñas
-   **Documentación**:
    -   Swagger UI
    -   JSDoc
-   **Testing**:
    -   Jest (opcional)

---

## 🛠️ Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/YerBrown/Entertainment-Club
    ```
2. Crear archivo '.env':

    Utilizando el '.env.example' crea el archivo '.env' y añade las variables de entorno

    ```plaintext
     DB_HOST=entertainment-club-db
     DB_PORT=3308
     APP_HOST=entertainment-club
     APP_PORT=3002
     DB_USER=user
     DB_PASSWORD=12345
     DB_NAME=Entertainment-Club
     SESSION_SECRET=esunsecreto
     JWT_SECRET=esunsecreto
     DB_DIALECT=mysql
    ```

3. Inicia el contenedor de docker:

    Entra en la carpeta del proyecto y usa este comando para crear el contenedor

    ```bash
    docker compose up --build
    ```

## 📖 Documentación de la API:

La API está documentada utilizando Swagger. Puedes acceder a la documentación interactiva en: http://localhost:3002/api-docs/

## 📝 Endpoints Principales

### **Auth**

-   `POST /auth/register` - Registra un nuevo usuario.
-   `POST /auth/login` - Inicia sesión y devuelve un token JWT.

### **Games**

-   `GET /games` - Obtiene todos los juegos disponibles.
-   `GET /games/{id}` - Obtiene un juego por su ID.
-   `POST /games` - Añade un nuevo juego (requiere permisos de administrador).
-   `PUT /games/{id}` - Actualiza los datos de un juego (requiere permisos de administrador).
-   `DELETE /games/{id}` - Elimina un juego por su ID (requiere permisos de administrador).

### **Reservations**

-   `GET /reservations` - Obtiene todas las reservas (requiere permisos de administrador).
-   `GET /reservations/free-date` - Obtiene los horarios libres de una fecha y sala concreta.
-   `GET /reservations/free-items-by-date-time` - Obtiene el inventario disponible de reserva en un dia y hora concreto.
-   `GET /reservations/my-reservations` - Obtiene todas las reservas del usuario logeado.
-   `GET /reservations/{id}` - Obtiene los detalles de una reserva por su ID (requiere permisos de administrador).
-   `GET /reservations/{id}/full-data` - Obtiene todos los detalles relacionados de una reserva por su ID (requiere permisos de administrador).
-   `GET /reservations/user/{user_id}` - Obtiene todas las reservas del usuario por su User_ID (requiere permisos de administrador).
-   `POST /reservations` - Crea una nueva reserva(requiere permisos de administrador).
-   `POST /reservations/new` - Crea una nueva reserva por un cliente, pasandole toda la información necesaria para la reserva.
-   `PUT /reservations/{id}` - Actualiza los datos de una reserva (requiere permisos de administrador).
-   `DELETE /reservations/{id}` - Elimina una reserva (requiere permisos de administrador).
-   `DELETE /reservations/user/{id}` - Elimina una reserva del propio usuario logeado por su ID.

### **Rooms**

-   `GET /rooms` - Lista todas las salas disponibles.
-   `POST /rooms` - Crea una nueva sala (requiere permisos de administrador).
-   `PUT /rooms/{id}` - Actualiza los datos de una sala (requiere permisos de administrador).
-   `DELETE /rooms/{id}` - Elimina una sala (requiere permisos de administrador).

### **Inventory**

-   `GET /inventory` - Consulta el inventario de juegos disponibles (requiere permisos de administrador).
-   `GET /inventory/amount-fof-games` - Consulta el inventario de juegos disponibles y las cantidades de cada juego.
-   `GET /inventory/game/{game_id}` - Te devuelve los articulos del inventario de un juego en concreto.
-   `GET /inventory/{id}` - Consulta un articulo del inventario de juegos por su id (requiere permisos de administrador).
-   `POST /inventory` - Agrega un juego al inventario(requiere permisos de administrador).
-   `PUT /inventory/{id}` - Actualiza un juego del inventario (requiere permisos de administrador).
-   `DELETE /inventory/{id}` - Elimina un juego del inventario (requiere permisos de administrador).

### **Users**

-   `GET /users` - Lista de todos los usuarios del club (requiere permisos de administrador).
-   `GET /users/my-profile` - Obtencion de los datos del usuario logeado
-   `GET /users/{id}`- Obtener un usuario por su id (requiere permisos de administrador).
-   `POST /users` - Crear un usuario nuevo (requiere permisos de administrador).
-   `PUT /users/my-profile` - Actualizar los datos del usuario logeado.
-   `PUT /users/{id}`- Actualizar lo datos de un usario por su id (requiere permisos de administrador).
-   `DELETE /users/{id}` - Eliminar un usuario por su id (requiere permisos de administrador).

### **Week Times**

-   `GET /week-times` - Lista de todos las horas disponibles de la semana (requiere permisos de administrador).
-   `GET /week-times/date` - Lista de horas por fecha.
-   `GET /week-times/{id}`- Obtener un horario de la semana por su id.
-   `POST /week-times` - Crear un horario de la semana nuevo (requiere permisos de administrador).
-   `PUT /week-times/{id}`- Actualizar lo datos de un horario de la semana por su id (requiere permisos de administrador).
-   `DELETE /week-times/{id}` - Eliminar un horario de la semana por su id (requiere permisos de administrador).

---

## 🧪 Testing

La aplicación incluye pruebas para asegurar que las funcionalidades principales de la API funcionan correctamente. Estas pruebas están diseñadas para comprobar controladores y validaciones.

### **Framework de Testing**

-   **Jest**: Framework de testing utilizado para ejecutar pruebas unitarias y de integración.

-   Utiliza el comando `npm test` para realizar los test
