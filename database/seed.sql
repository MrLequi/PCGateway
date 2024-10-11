USE `tiendadb`;

INSERT INTO `banner` (`id`, `imagen`) VALUES
(1, 'https://thotcomputacion.com.uy/wp-content/uploads/2024/09/CM_wb_2024_q3_1920x470.jpg'),
(2, 'https://thotcomputacion.com.uy/wp-content/uploads/2024/08/banner-web-largo-5.png'),
(3, 'https://thotcomputacion.com.uy/wp-content/uploads/2024/07/FuryRenegadeLE_BANNER-WEB.jpg');

INSERT INTO `carrito` (`id_carrito`, `id_usuario`, `fecha_creacion`) VALUES
(1, 2, '2024-09-23 20:09:11');

INSERT INTO `categoría` (`id_categoría`, `nombre`) VALUES
(1, 'Equipos armados'),
(2, 'Notebooks'),
(3, 'Consolas'),
(4, 'Monitores'),
(5, 'TV'),
(6, 'Smartwatch'),
(7, 'Mobiliario'),
(8, 'Domótica'),
(9, 'Componentes de PC'),
(10, 'Streaming'),
(11, 'Periféricos'),
(12, 'Simuladores y accesorios');

INSERT INTO `configuracion` (`nombre_empresa`, `telefono`, `email`, `direccion`) VALUES
('PCGateway', '123.456.789', 'info.pcgateway@mail.com', 'Paralela Sur, 15800 Ciudad de la Costa, Departamento de Canelones');

INSERT INTO `detalle_carrito` (`id_carrito`, `id_producto`, `cantidad`) VALUES
(1, 15, 2);

INSERT INTO `producto` (`id_producto`, `nombre`, `descripcion`, `precio`, `stock`, `imagen`, `descuento`) VALUES
(3, 'PlayStation 5', 'Consola de videojuegos de última generación', 500.00, 20, 'https://example.com/images/playstation5.jpg', 0.00),
(4, 'Monitor LG', 'Monitor 4K UHD de 27 pulgadas', 300.00, 25, 'https://example.com/images/monitor-lg.jpg', 0.00),
(5, 'Smart TV Samsung', 'Smart TV Samsung de 55 pulgadas', 700.00, 30, 'https://example.com/images/smart-tv-samsung.jpg', 0.00),
(6, 'Apple Watch', 'Reloj inteligente Apple Watch Series 6', 400.00, 12, 'https://example.com/images/apple-watch.jpg', 0.00),
(7, 'Escritorio Gaming', 'Escritorio ergonómico para gaming', 200.00, 5, 'https://example.com/images/escritorio-gaming.jpg', 0.00),
(8, 'Google Nest', 'Sistema de automatización para el hogar Google Nest', 150.00, 8, 'https://example.com/images/google-nest.jpg', 0.00),
(9, 'Tarjeta gráfica RTX 3080', 'Tarjeta gráfica NVIDIA RTX 3080', 900.00, 7, 'https://example.com/images/rtx-3080.jpg', 0.00),
(10, 'Webcam Logitech', 'Cámara web HD para streaming', 100.00, 20, 'https://example.com/images/webcam-logitech.jpg', 0.00),
(11, 'Teclado Mecánico', 'Teclado mecánico RGB', 120.00, 18, 'https://example.com/images/teclado-mecanico.jpg', 0.00),
(12, 'Volante Logitech G29', 'Volante y pedales para simuladores', 300.00, 10, 'https://example.com/images/volante-logitech.jpg', 0.00),
(13, 'Equipo AMD Athlon 3000G – 8Gb – SSD – Radeon Graphics', 'Gabinete Shot 8011 RGB con lateral en cristal templado\n\nFuente Aerocool VX Plus 450w\n\nMother Asrock B450M HDV  – Sata III – USB 3.0\n\nProcesador AMD Athlon 3000G 2 núcleos – 4 hilos 3,5Ghz\n\nMemoria Kingston 8Gb DDR4 2666Mhz\n\nDisco SSD 240Gb\n\nGráficos Radeon™ Vega 3', 290.00, 10, 'https://thotcomputacion.com.uy/wp-content/uploads/2023/05/Equipo-Athlon-300x297.jpg', 0.00),
(14, 'Equipo AMD Ryzen 3 3200G Pro Gamer – 8Gb – SSD – Radeon Graphics', 'Gabinete Shot 8011 RGB con lateral en cristal templado\n\nFuente Aerocool VX Plus 450w\n\nMother Asrock B450M HDV  – Sata III – USB 3.0\n\nProcesador AMD Ryzen 3 3200G 4 núcleos\n\nMemoria Kingston 8Gb DDR4 3200mhz\n\nDisco SSD 480Gb\n\nGráficos AMD Radeon 1700 MHz', 325.00, 6, 'https://thotcomputacion.com.uy/wp-content/uploads/2023/05/Equipo-AMD-3-300x300.jpg', 0.00),
(15, 'Equipo AMD Ryzen 5 4600G Pro Gamer – 16Gb – SSD – Radeon Graphics', 'Gabinete X-LION KX-88 RGB\n\nFuente Aerocool VX Plus 450w\n\nMother Asrock B450M HDV  – Sata III – USB 3.0\n\nProcesador AMD Ryzen 5 4600G 6 núcleos\n\nMemoria HyperX 16Gb DDR4 3200Mhz\n\nDisco SSD 480Gb', 700.00, 5, 'https://thotcomputacion.com.uy/wp-content/uploads/2023/05/Equipo-AMD-5-300x300.jpg', 0.00);

INSERT INTO `producto_categoria` (`id_producto`, `id_categoría`) VALUES
(3, 3), -- PlayStation 5 en Consolas
(4, 4), -- Monitor LG en Monitores
(5, 5), -- Smart TV Samsung en TV
(6, 6), -- Apple Watch en Smartwatch
(7, 7), -- Escritorio Gaming en Mobiliario
(8, 8), -- Google Nest en Domótica
(9, 9), -- Tarjeta gráfica RTX 3080 en Componentes de PC
(10, 11), -- Webcam Logitech en Periféricos
(11, 11), -- Teclado Mecánico en Periféricos
(12, 12), -- Volante Logitech G29 en Simuladores y accesorios
(13, 9), -- Equipo AMD Athlon en Componentes de PC
(14, 9), -- Equipo AMD Ryzen 3 en Componentes de PC
(15, 9); -- Equipo AMD Ryzen 5 en Componentes de PC