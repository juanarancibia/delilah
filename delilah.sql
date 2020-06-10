CREATE TABLE `DetallePedido` (
    `Id_Detalle` INT(11) NOT NULL,
    `Id_Pedido` INT(11) NOT NULL,
    `Id_Producto` INT(11) NOT NULL,
    `Cantidad` INT(11) NOT NULL,
    `Precio` INT(11) NOT NULL
);

INSERT INTO `DetallePedido` (`Id_Detalle`, `Id_Pedido`, `Id_Producto`, `Cantidad`, `Precio`) VALUES
(1, 5, 1, 3, 240);

CREATE TABLE `Estado` (
  `Id_estado` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
);

INSERT INTO `Estado` (`Id_estado`, `nombre`, `descripcion`) VALUES
(3, 'Nuevo', NULL),
(4, 'Confirmado', NULL),
(5, 'Preparando', NULL),
(6, 'Enviando', NULL),
(7, 'Cancelado', NULL),
(8, 'Entregado', NULL);

CREATE TABLE `EstadosXPedido` (
  `Id_EstadosXPedido` int(11) NOT NULL,
  `Id_Pedido` int(11) NOT NULL,
  `FechaHora` datetime NOT NULL,
  `descripcion` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
);

INSERT INTO `EstadosXPedido` (`Id_EstadosXPedido`, `Id_Pedido`, `FechaHora`, `descripcion`) VALUES
(3, 3, '2020-05-05 13:34:35', NULL),
(3, 4, '2020-05-05 13:51:50', NULL),
(3, 5, '2020-05-05 13:54:58', NULL),
(4, 5, '2020-05-06 12:17:14', 'El pedido esta en preparacion'),
(4, 6, '2020-05-06 12:19:04', NULL),
(5, 5, '2020-05-06 12:19:47', NULL),
(6, 5, '2020-05-06 12:30:12', NULL);

CREATE TABLE `FormaPago` (
  `Id_FormaPago` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL
);

CREATE TABLE `Pedido` (
  `Id_Pedido` int(11) NOT NULL,
  `Id_Usuario` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Precio` int(11) DEFAULT NULL,
  `Id_FormaPago` enum('Efectivo','Tarjeta') COLLATE utf8_unicode_ci NOT NULL,
  `FechaHora` datetime NOT NULL
);

INSERT INTO `Pedido` (`Id_Pedido`, `Id_Usuario`, `Precio`, `Id_FormaPago`, `FechaHora`) VALUES
(2, 'test', NULL, 'Efectivo', '2020-05-05 13:17:58'),
(3, 'test', NULL, 'Tarjeta', '2020-05-05 13:34:33'),
(4, 'test', NULL, 'Tarjeta', '2020-05-05 13:51:47'),
(5, 'test', NULL, 'Tarjeta', '2020-05-05 13:54:54');

CREATE TABLE `Producto` (
  `Id_Producto` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `precio` int(11) NOT NULL
);

INSERT INTO `Producto` (`Id_Producto`, `nombre`, `descripcion`, `precio`) VALUES
(1, 'Pan Casero', 'Coca 1lt', 80);

CREATE TABLE `Rol` (
  `Id_rol` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
);

INSERT INTO `Rol` (`Id_rol`, `nombre`, `descripcion`) VALUES
(1, 'Administrador', 'Es el admin'),
(2, 'Cliente', 'Es el cliente ');

CREATE TABLE `Usuario` (
  `usuario` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `contrasena` varchar(140) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `telefono` int(11) NOT NULL,
  `direccion` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `rol` int(11) NOT NULL,
  `nombreYapellido` varchar(50) COLLATE utf8_unicode_ci NOT NULL
);

INSERT INTO `Usuario` (`usuario`, `contrasena`, `email`, `telefono`, `direccion`, `rol`, `nombreYapellido`) VALUES
('test', '$2a$05$MfUuCXiW9Ot1qn6DNisL/.fuYB231UFAc6Dj5e0cg7RvWvM6wuMR2', 'test@mail.com', 123456, 'Pje Bobone 558', 1, 'Juan Cruz Arancibia');


ALTER TABLE `DetallePedido`
  ADD PRIMARY KEY (`Id_Detalle`,`Id_Pedido`) USING BTREE,
  ADD KEY `fkProducto` (`Id_Producto`);

ALTER TABLE `Estado`
  ADD PRIMARY KEY (`Id_estado`);

ALTER TABLE `EstadosXPedido`
  ADD PRIMARY KEY (`Id_EstadosXPedido`,`Id_Pedido`);

ALTER TABLE `FormaPago`
  ADD PRIMARY KEY (`Id_FormaPago`);

ALTER TABLE `Pedido`
  ADD PRIMARY KEY (`Id_Pedido`),
  ADD KEY `fkUsuario` (`Id_Usuario`),
  ADD KEY `fkFormaPago` (`Id_FormaPago`);

ALTER TABLE `Producto`
  ADD PRIMARY KEY (`Id_Producto`);

ALTER TABLE `Rol`
  ADD PRIMARY KEY (`Id_rol`);

ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`usuario`),
  ADD KEY `rolUsuario` (`rol`);


ALTER TABLE `DetallePedido`
  MODIFY `Id_Detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `Estado`
  MODIFY `Id_estado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

ALTER TABLE `FormaPago`
  MODIFY `Id_FormaPago` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `Pedido`
  MODIFY `Id_Pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `Producto`
  MODIFY `Id_Producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

ALTER TABLE `Rol`
  MODIFY `Id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


ALTER TABLE `DetallePedido`
  ADD CONSTRAINT `fkProducto` FOREIGN KEY (`Id_Producto`) REFERENCES `Producto` (`id_producto`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `EstadosXPedido`
  ADD CONSTRAINT `fkEstado` FOREIGN KEY (`Id_EstadosXPedido`) REFERENCES `Estado` (`id_estado`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `Pedido`
  ADD CONSTRAINT `fkUsuario` FOREIGN KEY (`Id_Usuario`) REFERENCES `Usuario` (`usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `Usuario`
  ADD CONSTRAINT `rolUsuario` FOREIGN KEY (`rol`) REFERENCES `Rol` (`id_rol`);
