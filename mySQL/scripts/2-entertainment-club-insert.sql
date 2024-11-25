USE `Entertainment-Club`;


SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE users;
TRUNCATE TABLE games;
TRUNCATE TABLE inventory;
TRUNCATE TABLE rooms;
SET FOREIGN_KEY_CHECKS = 1;


INSERT INTO users (username, name, surnames, email, password, create_time)
VALUES
('iker89', 'Iker', 'García Aranburu', 'iker89@example.com', '1234', '2024-08-15 10:30:25'),
('anne.tx', 'Anne', 'Etxeberria Garmendia', 'anne.tx@example.com', '1234', '2024-09-03 15:45:10'),
('jon.andoni', 'Jon', 'Andoni Lasa', 'jon.andoni@example.com', '1234', '2024-10-02 18:12:34'),
('maite.gtz', 'Maite', 'Gutiérrez Olano', 'maite.gtz@example.com', '1234', '2024-09-17 09:50:42'),
('ander92', 'Ander', 'Aguirre Zubizarreta', 'ander92@example.com', '1234', '2024-11-01 14:20:11'),
('nerea.sr', 'Nerea', 'Sarasola Lertxundi', 'nerea.sr@example.com', '1234', '2024-10-25 13:55:00'),
('mikel.ab', 'Mikel', 'Abaroa Mendizabal', 'mikel.ab@example.com', '1234', '2024-08-29 20:40:55'),
('aiala.bq', 'Aiala', 'Barrenechea Quiroga', 'aiala.bq@example.com', '1234', '2024-09-12 16:18:47'),
('ugaitz.tx', 'Ugaitz', 'Txurruka Aizpurua', 'ugaitz.tx@example.com', '1234', '2024-08-23 08:33:19'),
('leire.ez', 'Leire', 'Eizagirre Arregi', 'leire.ez@example.com', '1234', '2024-10-05 17:42:09');


INSERT INTO games (name, min_players, max_players, description)
VALUES
('Karaoke',1,2, 'Contamos con dos microfonos por sala para poder usar como karaoke'),
('Catan', 3, 4, 'Juego de estrategia donde los jugadores colonizan una isla, construyen asentamientos y comercian recursos.'),
('Carcassonne', 2, 5, 'Juego de colocación de losetas donde se construyen ciudades, caminos y campos en la región medieval de Carcassonne.'),
('Dixit', 3, 6, 'Juego de cartas ilustradas donde los jugadores deben adivinar la carta que corresponde a una pista dada.'),
('Ticket to Ride', 2, 5, 'Juego de estrategia ferroviaria donde los jugadores compiten por construir rutas de tren en América del Norte.'),
('Pandemic', 2, 4, 'Juego cooperativo donde los jugadores trabajan juntos para detener brotes de enfermedades en todo el mundo.'),
('Azul', 2, 4, 'Juego de estrategia abstracta donde los jugadores decoran un palacio real portugués con azulejos.'),
('7 Wonders', 2, 7, 'Juego de construcción de civilizaciones donde los jugadores desarrollan una ciudad y construyen una maravilla del mundo.'),
('Splendor', 2, 4, 'Juego de desarrollo económico donde los jugadores coleccionan gemas y compran cartas de desarrollo.'),
('Codenames', 2, 8, 'Juego de palabras por equipos donde se deben adivinar las palabras clave basándose en pistas dadas por un compañero.'),
('Terraforming Mars', 1, 5, 'Juego de estrategia donde los jugadores compiten por transformar Marte en un planeta habitable.'),
('It Takes Two', 2, 2, 'Una aventura cooperativa que sigue a una pareja transformada en muñecos, navegando por mundos únicos para salvar su relación.'),
('Overcooked! All You Can Eat', 2, 4, 'Un juego de cocina caótico donde los jugadores deben colaborar para preparar y servir pedidos a tiempo.'),
('FIFA 22', 2, 4, 'Un simulador de fútbol que permite jugar partidos locales entre amigos.'),
('Mortal Kombat 11 Ultimate', 2, 2, 'Un juego de lucha con combates intensos que incluye personajes icónicos y movimientos especiales.'),
('Sackboy: A Big Adventure', 2, 4, 'Un juego de plataformas en 3D donde los jugadores cooperan para superar niveles creativos y desafiantes.'),
('NBA 2K22', 2, 4, 'Un simulador de baloncesto que permite competir en partidos locales.'),
('Call of Duty: Vanguard', 2, 2, 'Un shooter en primera persona ambientado en la Segunda Guerra Mundial, con modos multijugador local para enfrentamientos competitivos.'),
('Diablo III: Eternal Collection', 2, 4, 'Un juego de rol y acción donde los jugadores exploran mazmorras y enfrentan hordas de enemigos en modo cooperativo.'),
('Gran Turismo 7', 1, 2, 'Un simulador de carreras que ofrece multijugador local para competir en diversos circuitos.'),
('Street Fighter V: Champion Edition', 2, 2, 'Un juego de lucha clásico que permite batallas locales con una amplia variedad de personajes.'),
('Super Smash Bros. Ultimate', 1, 8, 'Juego de lucha que reúne a personajes icónicos de diversas franquicias de Nintendo y otros universos, permitiendo combates de hasta ocho jugadores.'),
('Mario Kart 8 Deluxe', 1, 12, 'Juego de carreras que ofrece circuitos dinámicos y la posibilidad de competir en línea con hasta doce jugadores.'),
('Splatoon 2', 1, 8, 'Juego de disparos en tercera persona donde equipos de inklings compiten por cubrir el mayor territorio con tinta de su color.'),
('Overcooked! 2', 1, 4, 'Juego cooperativo de cocina donde los jugadores deben preparar y servir pedidos en cocinas caóticas y desafiantes.'),
('Super Mario Party', 1, 4, 'Juego de mesa virtual que incluye una variedad de minijuegos y modos de juego para disfrutar en grupo.'),
('Rocket League', 1, 8, 'Juego que combina fútbol y conducción, permitiendo partidos de hasta ocho jugadores en línea.'),
('Minecraft', 1, 8, 'Juego de construcción y aventura que permite a los jugadores explorar mundos generados aleatoriamente y construir estructuras juntos.'),
('Fortnite', 1, 100, 'Juego de batalla campal en línea donde hasta 100 jugadores compiten para ser el último en pie.'),
('Mario Tennis Aces', 1, 4, 'Juego de tenis que ofrece partidos individuales y dobles, con personajes del universo Mario y habilidades especiales.');

INSERT INTO inventory (game_id)
VALUES
(1), (1), (1), (1), (1), (1), (1), (1), (1), (1),
(2), (2), (2), (2), (2),
(3), (3), (3), (3), (3),
(4), (4), (4), (4), (4),
(5), (5), (5), (5), (5),
(6), (6), (6), (6),
(7), (7), (7),
(8), (8), (8), (8), (8),
(9), (9), (9), (9),
(10), (10), (10), (10), (10),
(11), (11), (11), (11),
(12), (12),
(13), (13), (13), (13), (13),
(14), (14),
(15), (15), (15), (15), (15),
(16), (16), (16), (16),
(17), (17), (17),
(18), (18), (18), (18), (18),
(19), (19), (19),
(20), (20), (20), (20), (20),
(21), (21),
(22), (22), (22),
(23), (23), (23),
(24), (24), (24),
(25), (25), (25), (25), (25),
(26), (26), (26), (26),
(27), (27), (27),
(28), (28), (28),
(29), (29), (29);

INSERT INTO rooms (name, max_guests)
VALUES
('Sala 1', 4),
('Sala 2', 6),
('Sala 3', 8),
('Sala 4', 10),
('Sala 5', 4),
('Sala 6', 6),
('Sala 7', 8),
('Sala 8', 10),
('Sala 9', 6),
('Sala 10', 8);