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

La API está documentada utilizando Swagger. Puedes acceder a la documentación interactiva en:

    docker compose up --build

## 📝 Endpoints Principales

### **Auth**

-   `POST /auth/register` - Registra un nuevo usuario.
-   `POST /auth/login` - Inicia sesión y devuelve un token JWT.

### **Games**

-   `GET /games` - Obtiene todos los juegos disponibles.
-   `POST /games` - Añade un nuevo juego (requiere permisos de administrador).
-   `GET /games/{id}` - Obtiene un juego por su ID.
-   `PUT /games/{id}` - Actualiza los datos de un juego (requiere permisos de administrador).
-   `DELETE /games/{id}` - Elimina un juego por su ID (requiere permisos de administrador).

### **Reservations**

-   `GET /reservations` - Obtiene todas las reservas.
-   `POST /reservations` - Crea una nueva reserva.
-   `GET /reservations/{id}` - Obtiene los detalles de una reserva por su ID.
-   `DELETE /reservations/{id}` - Elimina una reserva.

### **Rooms**

-   `GET /rooms` - Lista todas las salas disponibles.
-   `POST /rooms` - Crea una nueva sala (requiere permisos de administrador).
-   `PUT /rooms/{id}` - Actualiza los datos de una sala (requiere permisos de administrador).
-   `DELETE /rooms/{id}` - Elimina una sala.

### **Inventory**

-   `GET /inventory` - Consulta el inventario de juegos disponibles.
-   `POST /inventory` - Agrega un juego al inventario.
-   `DELETE /inventory/{id}` - Elimina un juego del inventario.

---

## 🧪 Testing

La aplicación incluye pruebas para asegurar que las funcionalidades principales de la API funcionan correctamente. Estas pruebas están diseñadas para comprobar controladores, validaciones y la interacción con la base de datos.

### **Framework de Testing**

-   **Jest**: Framework de testing utilizado para ejecutar pruebas unitarias y de integración.

-   Utiliza el comando `npm test` para realizar los test
