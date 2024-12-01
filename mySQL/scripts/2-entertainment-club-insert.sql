USE `Entertainment-Club`;



SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE users;
TRUNCATE TABLE games;
TRUNCATE TABLE inventory;
TRUNCATE TABLE rooms;
TRUNCATE TABLE week_times;
TRUNCATE TABLE reservations;
TRUNCATE TABLE reservations_has_inventory;

SET FOREIGN_KEY_CHECKS = 1;


INSERT INTO users (username, name, surnames, email, password, create_time, role)
VALUES
('iker89', 'Iker', 'García Aranburu', 'iker89@example.com', '$2a$10$Qfu45Y59xacwKq9GbXwjrev/KKth4D6mnO13bUe91BBgUu4Pv3OSG', '2024-08-15 10:30:25', 'client'),
('anne.tx', 'Anne', 'Etxeberria Garmendia', 'anne.tx@example.com', '$2a$10$Qfu45Y59xacwKq9GbXwjrev/KKth4D6mnO13bUe91BBgUu4Pv3OSG', '2024-09-03 15:45:10', 'client'),
('jon.andoni', 'Jon', 'Andoni Lasa', 'jon.andoni@example.com', '$2a$10$Qfu45Y59xacwKq9GbXwjrev/KKth4D6mnO13bUe91BBgUu4Pv3OSG', '2024-10-02 18:12:34', 'client'),
('maite.gtz', 'Maite', 'Gutiérrez Olano', 'maite.gtz@example.com', '$2a$10$Qfu45Y59xacwKq9GbXwjrev/KKth4D6mnO13bUe91BBgUu4Pv3OSG', '2024-09-17 09:50:42', 'client'),
('ander92', 'Ander', 'Aguirre Zubizarreta', 'ander92@example.com', '$2a$10$Qfu45Y59xacwKq9GbXwjrev/KKth4D6mnO13bUe91BBgUu4Pv3OSG', '2024-11-01 14:20:11', 'client'),
('nerea.sr', 'Nerea', 'Sarasola Lertxundi', 'nerea.sr@example.com', '$2a$10$Qfu45Y59xacwKq9GbXwjrev/KKth4D6mnO13bUe91BBgUu4Pv3OSG', '2024-10-25 13:55:00', 'client'),
('mikel.ab', 'Mikel', 'Abaroa Mendizabal', 'mikel.ab@example.com', '$2a$10$Qfu45Y59xacwKq9GbXwjrev/KKth4D6mnO13bUe91BBgUu4Pv3OSG', '2024-08-29 20:40:55', 'client'),
('aiala.bq', 'Aiala', 'Barrenechea Quiroga', 'aiala.bq@example.com', '$2a$10$Qfu45Y59xacwKq9GbXwjrev/KKth4D6mnO13bUe91BBgUu4Pv3OSG', '2024-09-12 16:18:47', 'client'),
('ugaitz.tx', 'Ugaitz', 'Txurruka Aizpurua', 'ugaitz.tx@example.com', '$2a$10$Qfu45Y59xacwKq9GbXwjrev/KKth4D6mnO13bUe91BBgUu4Pv3OSG', '2024-08-23 08:33:19', 'client'),
('yerbrown98', 'Yeray', 'Moreno Garcia', 'yerbrown98@gmail.com', '$2a$10$Qfu45Y59xacwKq9GbXwjrev/KKth4D6mnO13bUe91BBgUu4Pv3OSG', '2024-11-29 10:24:19', 'admin'),
('leire.ez', 'Leire', 'Eizagirre Arregi', 'leire.ez@example.com', '$2a$10$Qfu45Y59xacwKq9GbXwjrev/KKth4D6mnO13bUe91BBgUu4Pv3OSG', '2024-10-05 17:42:09', 'client');


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
('Sala 5', 4);

INSERT INTO week_times (week_day, time)
VALUES
(1,'10:00:00'),
(1,'11:00:00'),
(1,'12:00:00'),
(1,'13:00:00'),
(1,'17:00:00'),
(1,'18:00:00'),
(1,'19:00:00'),
(1,'20:00:00'),
(1,'21:00:00'),

(2,'10:00:00'),
(2,'11:00:00'),
(2,'12:00:00'),
(2,'13:00:00'),
(2,'17:00:00'),
(2,'18:00:00'),
(2,'19:00:00'),
(2,'20:00:00'),
(2,'21:00:00'),

(3,'10:00:00'),
(3,'11:00:00'),
(3,'12:00:00'),
(3,'13:00:00'),
(3,'17:00:00'),
(3,'18:00:00'),
(3,'19:00:00'),
(3,'20:00:00'),
(3,'21:00:00'),

(4,'10:00:00'),
(4,'11:00:00'),
(4,'12:00:00'),
(4,'13:00:00'),
(4,'17:00:00'),
(4,'18:00:00'),
(4,'19:00:00'),
(4,'20:00:00'),
(4,'21:00:00'),

(5,'10:00:00'),
(5,'11:00:00'),
(5,'12:00:00'),
(5,'13:00:00'),
(5,'17:00:00'),
(5,'18:00:00'),
(5,'19:00:00'),
(5,'20:00:00'),
(5,'21:00:00'),

(6,'10:00:00'),
(6,'11:00:00'),
(6,'12:00:00'),
(6,'13:00:00'),
(6,'17:00:00'),
(6,'18:00:00'),
(6,'19:00:00'),
(6,'20:00:00'),
(6,'21:00:00'),

(0,'10:00:00'),
(0,'11:00:00'),
(0,'12:00:00'),
(0,'13:00:00'),
(0,'17:00:00'),
(0,'18:00:00'),
(0,'19:00:00'),
(0,'20:00:00'),
(0,'21:00:00');


INSERT INTO reservations (user_id, room_id, week_time_id, date)
VALUES
(1, 3, 10, '2024-12-17'),
(2, 2, 52, '2024-12-28'),
(3, 4, 31, '2024-12-19'),
(4, 3, 51, '2024-12-21'),
(5, 3, 52, '2024-12-21'),
(6, 2, 33, '2024-12-19'),
(7, 2, 34, '2024-12-19');

INSERT INTO reservations_has_inventory (reservation_id, inventory_id)
VALUES
(1, 3),
(1, 14),
(1, 50),
(1, 92),
(2, 106),
(2, 101),
(2, 65),
(3, 17),
(3, 15),
(3, 22),
(4, 5),
(4, 39),
(4, 60),
(5, 100),
(5, 117),
(6, 26),
(6, 37),
(7, 1),
(7, 69);