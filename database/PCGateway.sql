DROP DATABASE IF EXISTS pcgateway;
CREATE DATABASE pcgateway;
USE pcgateway;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `banner` (`id`, `imagen`) VALUES
(1, 'https://thotcomputacion.com.uy/wp-content/uploads/2024/09/CM_wb_2024_q3_1920x470.jpg'),
(2, 'https://thotcomputacion.com.uy/wp-content/uploads/2024/08/banner-web-largo-5.png'),
(3, 'https://thotcomputacion.com.uy/wp-content/uploads/2024/07/FuryRenegadeLE_BANNER-WEB.jpg'),
(5, 'https://thotcomputacion.com.uy/wp-content/uploads/2024/10/BANNER-WEB-1.png'),
(6, 'https://thotcomputacion.com.uy/wp-content/uploads/2024/10/BANNER-WEB-2.png'),
(7, 'https://thotcomputacion.com.uy/wp-content/uploads/2023/04/22KDI041_BeastDDR5_2000x520_REV3.jpg');

CREATE TABLE `carrito` (
  `id_carrito` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `categoría` (
  `id_categoría` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `categoría` (`id_categoría`, `nombre`) VALUES
(1, 'Pre-built PCs'),
(2, 'Laptops'),
(3, 'Consoles'),
(4, 'Monitors'),
(5, 'TVs'),
(6, 'Smartwatches'),
(7, 'Furniture'),
(8, 'Home Automation'),
(9, 'PC Components'),
(10, 'Streaming'),
(11, 'Peripherals'),
(12, 'Simulators and Accessories');

CREATE TABLE `configuracion` (
  `nombre_empresa` varchar(255) NOT NULL DEFAULT 'PCGateway',
  `telefono` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `configuracion` (`nombre_empresa`, `telefono`, `email`, `direccion`) VALUES
('PCGateway', '098 921 935', 'info.pcgateway@mail.com', 'Paralela Sur, 15800 Ciudad de la Costa, Departamento de Canelones');

CREATE TABLE `detalle_carrito` (
  `id_carrito` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `productos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`productos`)),
  `estado` varchar(50) DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `descuento` decimal(5,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `producto` (`id_producto`, `nombre`, `descripcion`, `precio`, `stock`, `categoria`, `imagen`, `descuento`) VALUES
(13, 'Equipo AMD Athlon 3000G – 8Gb – SSD – Radeon Graphics', 'Gabinete Shot 8011 RGB con lateral en cristal templado\n\nFuente Aerocool VX Plus 450w\n\nMother Asrock B450M HDV  – Sata III – USB 3.0\n\nProcesador AMD Athlon 3000G 2 núcleos – 4 hilos 3,5Ghz\n\nMemoria Kingston 8Gb DDR4 2666Mhz\n\nDisco SSD 240Gb\n\nGráficos Radeon™ Vega 3', 290.00, 8, '1', 'https://thotcomputacion.com.uy/wp-content/uploads/2023/05/Equipo-Athlon-300x297.jpg', 0.00),
(14, 'Equipo AMD Ryzen 3 3200G Pro Gamer – 8Gb – SSD – Radeon Graphics', 'Gabinete Shot 8011 RGB con lateral en cristal templado\n\nFuente Aerocool VX Plus 450w\n\nMother Asrock B450M HDV  – Sata III – USB 3.0\n\nProcesador AMD Ryzen 3 3200G 4 núcleos\n\nMemoria Kingston 8Gb DDR4 3200mhz\n\nDisco SSD 480Gb\n\nGráficos AMD Radeon 1700 MHz', 325.00, 0, '1', 'https://thotcomputacion.com.uy/wp-content/uploads/2023/05/Equipo-AMD-3-300x300.jpg', 0.00),
(15, 'Equipo AMD Ryzen 5 4600G Pro Gamer – 16Gb – SSD – Radeon Graphics', 'Gabinete X-LION KX-580 – Cristal templado – PSU Cover – RGB\n\nFuente Deepcool PF450 80 Plus\n\nMother Gigabyte A520M K\n\nProcesador AMD Ryzen 5 4600G Pro 6 núcleos 12 hilos 3.7GHz / 4.2GHzz\n\nMemoria Kingston 16Gb DDR4 3200mhz 2×8\n\nDisco SSD 480Gb\n\nGráficos AMD Radeon 1900 MHz', 400.00, 9, '1', 'https://thotcomputacion.com.uy/wp-content/uploads/2015/05/Equipo-AMD-3-1-300x300.jpg', 0.00),
(16, 'Equipo AMD Ryzen 5 5600GT Pro Gamer – 16Gb – SSD – Radeon Graphics', 'Gabinete X-LION KX-580 – Cristal templado – PSU Cover – RGB\nFuente Deepcool PF450 80 Plus\nMother Gigabyte A520M K\nProcesador AMD Ryzen 5 5600GT 6 núcleos 12 hilos 3.6GHz / 4.6GHz\nMemoria Kingston 16Gb DDR4 3200mhz (2 x 8)\nDisco SSD 480Gb\nGráficos AMD Radeon 1900 MHz', 450.00, 11, '1', 'https://thotcomputacion.com.uy/wp-content/uploads/2015/05/Equipo-AMD-3-1-300x300.jpg', 0.00),
(17, 'Equipo AMD Ryzen 5 4500 Pro Gamer – 16Gb – SSD – Radeon RX550 4Gb', 'Gabinete Cooler Master CMP320L con lateral en cristal templado\nFuente Cooler Master Elite NEX N400\nMother Gigabyte A520M K\nProcesador AMD Ryzen 5 4500 6 núcleos 12 hilos 3.6GHz / 4.1GHz\nMemoria Kingston 16Gb DDR4 3200mhz (2 x 8)\nDisco SSD 480Gb\nGráficos AMD Radeon RX550 4Gb', 525.00, 2, '1', 'https://thotcomputacion.com.uy/wp-content/uploads/2023/12/8-L-AMD-rx-300x300.jpg', 0.00),
(19, 'Equipo AMD Ryzen 5 4500 Pro Gamer – 16Gb – SSD – Radeon RX6400 4Gb', 'Gabinete Cooler Master CMP320L con lateral en cristal templado\nFuente Cooler Master Elite NEX N400\nMother Gigabyte A520M K\nProcesador AMD Ryzen 5 4500 6 núcleos 12 hilos 3.6GHz / 4.1GHz\nMemoria 16Gb DDR4 3200mhz (2 x 8Gb)\nDisco SSD 512Gb\nGráficos Radeon RX6400 4Gb', 575.00, 15, '1', 'https://thotcomputacion.com.uy/wp-content/uploads/2023/12/8-L-AMD-rx-300x300.jpg', 0.00),
(20, 'Equipo AMD Ryzen 5 8500G Pro Gamer – 16Gb DDR5 – SSD – Radeon Graphics', 'Gabinete Cooler Master CMP320 con lateral en cristal templado\nFuente Cooler Master Elite NEX 500w 80 Plus\nMother MSI A620M E AM5 DDR5\nProcesador AMD Ryzen 5 8500G 6 núcleos 12 hilos 3.5GHz / 5.0GHz\nMemoria 16Gb DDR5 5200mhz\nDisco SSD 512Gb\nGráficos AMD Radeon™ 740M', 590.00, 11, '1', 'https://thotcomputacion.com.uy/wp-content/uploads/2024/02/Equipo-AMD-7-300x298.jpg', 0.00),
(21, 'Equipo AMD Ryzen 5 4500 Pro Gamer – 16Gb – SSD – Geforce GTX1650', 'Gabinete Cooler Master CMP320L con lateral en cristal templado\nFuente Cooler Master Elite NEX N400\nMother Gigabyte A520M K\nProcesador AMD Ryzen 5 4500 6 núcleos 12 hilos 3.6GHz / 4.1GHz\nMemoria 16Gb DDR4 3200mhz (2 x 8Gb)\nDisco SSD 512Gb\nGráficos Geforce GTX1650 4Gb', 625.00, 1, '1', 'https://thotcomputacion.com.uy/wp-content/uploads/2024/08/Equipo-AMD-4-300x300.jpg', 0.00),
(22, 'Equipo AMD Ryzen 5 4500 Pro Gamer – 16Gb – SSD – Geforce RTX3050 6Gb', 'Gabinete Antec AX20 – 3 fanes RGB – PSU Cover – Cristal templado\nFuente Cooler Master Elite NEX N500 / Deepcool 500w\nMother Gigabyte A520M K\nProcesador AMD Ryzen 5 4500 6 núcleos 12 hilos 3.6GHz / 4.1GHz\nMemoria 16Gb DDR4 3200mhz (2 x 8Gb)\nDisco SSD 512Gb\nGráficos Geforce RTX3050 6Gb', 659.00, 14, '1', 'https://thotcomputacion.com.uy/wp-content/uploads/2024/08/Equipo-AMD-6-300x300.jpg', 0.00),
(23, 'Equipo AMD Ryzen 5 8600G Pro Gamer – 16Gb DDR5 – SSD – Radeon Graphics', 'Gabinete Cooler Master CMP320 con lateral en cristal templado \nFuente Cooler Master Elite NEX 500w 80 Plus\nMother MSI A620M E AM5 DDR5\nProcesador AMD Ryzen 5 8600G 6 núcleos 12 hilos 4.3GHz / 5.0GHz\nMemoria 16Gb DDR5 5200mhz\nDisco SSD 512Gb\nGráficos AMD Radeon™ 760M', 675.00, 12, '1', 'https://thotcomputacion.com.uy/wp-content/uploads/2024/02/Equipo-AMD-8-300x300.jpg', 0.00),
(24, 'Equipo AMD Ryzen 5 4500 Pro Gamer – SSD – 16Gb – Geforce RTX3050 8Gb', 'Gabinete Cooler Master CMP320L con lateral en cristal templado\nFuente Cooler Master Elite NEX N400\nMother Gigabyte A520M K\nProcesador AMD Ryzen 5 4500 6 núcleos 12 hilos 3.6GHz / 4.1GHz\nMemoria Kingston 16Gb DDR4 3200mhz 2 x 8\nDisco SSD 512Gb\nGráficos Geforce RTX3050 8Gb', 775.00, 5, '1', 'https://thotcomputacion.com.uy/wp-content/uploads/2023/05/5-AMD-rtx-300x300.jpg', 0.00),
(25, 'Equipo AMD Ryzen 7 8700G Pro Gamer – 16Gb DDR5 – SSD – Radeon Graphics', 'Gabinete Cooler Master CMP320 con lateral en cristal templado \nFuente Cooler Master Elite NEX 500w 80 Plus\nMother MSI A620M E AM5 DDR5\nProcesador AMD Ryzen 7 8700G 8 núcleos 16 hilos 4.2GHz / 5.1GHz\nMemoria 16Gb DDR5 5200mhz\nDisco SSD 512Gb\nGráficos AMD Radeon™ 780M', 845.00, 4, '1', 'https://thotcomputacion.com.uy/wp-content/uploads/2024/02/Equipo-AMD-8-300x300.jpg', 0.00),
(26, 'Equipo AMD Ryzen 5 4500 Pro Gamer – SSD – 16Gb – Radeon RX7600', 'Gabinete CMP320 con lateral en cristal templado \nFuente Cooler Master Elite NEX 500w 80 Plus\nMother Gigabyte A520M K\nProcesador AMD Ryzen 5 4500 6 núcleos 12 hilos 3.6GHz / 4.1GHz\nMemoria Kingston 16Gb DDR4 3200mhz 2 x 8\nDisco SSD 512Gb\nGráficos Radeon RX7600', 875.00, 3, '1', 'https://thotcomputacion.com.uy/wp-content/uploads/2023/05/4-AMD-rx-300x300.jpg', 0.00),
(27, 'Equipo AMD Ryzen 5 5600X Full Gamer – 16gb – SSD – RTX3050 8Gb', 'Gabinete Cooler Master CMP320 con lateral en cristal templado \nFuente Cooler Master Elite NEX 500w 80 Plus\nMother Gigabyte A520M K\nProcesador AMD Ryzen 5 5600X 3,7 / 4,6Ghz 6 núcleos – 12 hilos\nMemoria Kingston 16Gb DDR4 3200mhz (2 x 8Gb)\nDisco SSD 512Gb\nGráficos Geforce RTX3050 8Gb', 890.00, 11, '1', 'https://thotcomputacion.com.uy/wp-content/uploads/2023/05/5-AMD-rtx-300x300.jpg', 0.00),
(28, 'Equipo AMD Ryzen 5 5600X Full Gamer – 16gb – SSD – RTX3060 12Gb', 'Gabinete Cooler Master CMP320 con lateral en cristal templado \nFuente Cooler Master Elite NEX 600w 80 Plus / Deepcool PF650w\nMother Gigabyte A520M K\nProcesador AMD Ryzen 5 5600X 3,7 / 4,6Ghz 6 núcleos – 12 hilos\nMemoria Kingston 16Gb DDR4 3200mhz (2 x 8Gb)\nDisco SSD 512Gb\nGráficos Geforce RTX3060 12Gb', 975.00, 10, '1', 'https://thotcomputacion.com.uy/wp-content/uploads/2023/05/5-AMD-rtx-1-300x300.jpg', 0.00),
(29, 'Equipo AMD Ryzen 5 5600X Full Gamer – 16gb – SSD – RX7600', 'Gabinete Cooler Master CMP320 con lateral en cristal templado \nFuente Cooler Master Elite NEX 500w 80 Plus\nMother Gigabyte A520M K\nProcesador AMD Ryzen 5 5600X 3,7 / 4,6Ghz 6 núcleos – 12 hilos\nMemoria Kingston 16Gb DDR4 3200mhz (2 x 8Gb)\nDisco SSD 512Gb\nGráficos Radeon RX7600 8Gb', 990.00, 6, '1', 'https://thotcomputacion.com.uy/wp-content/uploads/2023/12/4-AMD-rx-300x300.jpg', 0.00),
(30, 'Notebook ASUS X515MA-BR423W Intel Dualcore N4020/4Gb/128Gb PCIe/W10', 'Color gris (slate grey).\nSistema Windows 11 Home 64bit preinstalado en español.\nProcesador Intel Celeron N4020 1.1GHz (4M Cache, hasta 2.8 GHz).\n4GB DRAM DDR4 sodimm.\n128GB M.2 NVMe PCIe 3.0 SSD. (slot SATA 2.5\" libre).\nPantalla LED 15.6 pulgadas HD 1366 x 768.\nVideo Intel UHD Graphics 600.\nTeclado en ESPAÑOL completo con teclado numérico.\nSonido integrado de alta definición.\nWiFi 5 802.11ac dual band+ Bluetooth 4.1.\nCámara web con micrófono integrada.\nBatería de 2 celdas 37WHr.\nDimensiones: 36.02 x 23.49 x 1.99cm.\nPeso: 1.80kg\n\nPuertos disponibles:\n1 HDMI \n1 USB 3.2 Tipo C\n1 USB 3.2\n2 USB 2.0\n1 combo audio jack', 279.00, 20, '2', 'https://thotcomputacion.com.uy/wp-content/uploads/2023/09/X515MA252525252520190457_4de88f5ee1d6435eb11d0020aa7e101e.webp', 0.00),
(31, 'Notebook Lenovo V4 82C4S0F8US Core i3-1005G1/8Gb/SSD 256/14″/W10', 'Color gris.\nSistema Windows 10 ´Professional 64bit pre instalado.\nProcesador Intel Core i3-1005G1 1.2GHz (4MB Caché, hasta 3.4Ghz).\n8GB DDR4-2666.\n256GB SSD M.2 2242 NVMe.\nPantalla LED 14 pulgadas Full HD 1920 x 1080.\nVideo Intel UHD Graphics.\nSonido HD Dolby con parlantes estéreo de 1.5W.\nWifi 802.11ac 2×2. Bluetooth v5.0.\nTeclado en inglés.\nCamara Web con micrófono integrado.\nBatería de litio de 2 celdas 35Wh.\nLector de memoria flash SD 4 en 1.\nDimensiones: 327.1 x 241 x 19.9mm.\nPeso: 1.5Kg.\n\nPuertos disponibles:\n1 HDMI\n2 USB 3.1\n1 USB 2.0\n1 Combo auriculares y micrófono.', 455.00, 16, '2', 'https://thotcomputacion.com.uy/wp-content/uploads/2024/07/6400_1_193d0193f666401481eaed9b918dbf00-300x300.jpg', 0.00),
(32, 'Notebook ASUS Vivobook Go 15 E1504GA-NJ008W i3-N305/8Gb/256Gb PCIe/15,6 HD/W11', 'Color negro.\nSistema Windows 11 Home 64bit preinstalado.\nProcesador Intel Core i3-N305 1.8GHz (6M Cache, 8 núcleos, hasta 3.8GHz).\n8GB DRAM DDR4 on board.\n256GB UFS 2.1 on board.\nPantalla LED IPS 15.6\" Full HD 1920 x 1080.\nVideo Intel UHD Graphics.\nTeclado en Español con teclado numérico.\nSonido HD con parlante integrado.\nWiFi 6E 802.11ax + Bluetooth 5.3.\nCámara web con micrófono integrado.\nBatería de 3 celdas 42WHr.\nDimensiones: 36.03 x 23.25 x 1.79 cm\nPeso: 1.63kg\n\nPuertos disponibles:\n1 HDMI 1.4\n1 USB 3.2 Tipo C\n1 USB 3.2\n1 USB 2.0\n1 combo audio jack', 480.00, 13, '2', 'https://thotcomputacion.com.uy/wp-content/uploads/2023/09/E1504GA25252520147509_2706edccc2014fc2b3559c7b552996ac.webp', 0.00),
(34, 'Notebook HP 15-fc0004la Ryzen 3-7320U/8Gb DDR5/512Gb SSD/15,6″/W11', 'Procesador: AMD Ryzen™ 3 7320U (aumento máximo del reloj hasta 4,1 GHz, 4 MB de caché L3, 4 núcleos, 8 subprocesos)\n\nalmacenamiento: Unidad de estado sólido de 512 GB PCIe® NVMe™ M.2\n\nmemoria ram: 8 GB de RAM LPDDR5-5500 MHz (incorporada)\n\nsistema operativo: Windows 11 Home Single Language\n\ngarantia del fabricante: 1 año de garantía limitada de hardware con soporte técnico telefónico gratuito. 90 días de soporte técnico limitado para software (a partir de la fecha de compra).\n\npantalla: Pantalla FHD (1920 x 1080), de 15,6\" (39,6 cm) en diagonal, IPS, con microbordes, antirreflejante, 250 nits, 45 % de NTSC\n\nBrillo: 250 nits\n\npuertos: 1 USB Tipo-C® con velocidad de señalización de 5 Gb/s (admite solo transferencia de datos y no admite carga o monitores externos); 2 USB Tipo-A con velocidad de señalización de 5 Gb/s; 1 conector inteligente de CA; 1 HDMI 1.4b; 1 combinación de audífonos/micrófono\n\nSoftware productividad y finanzas: 1 mes de prueba para los nuevos clientes de Microsoft 365\n\nSoftware incluido: McAfee LiveSafe™; Oferta de prueba gratuita de 1 mes de Adobe\n\nSoftware preinstalado: ExpressVPN (prueba gratuita de 30 días); LastPass Premium (prueba gratuita de 30 días)\n\nInalámbrico: Tarjeta inalámbrica Realtek Wi-Fi 6 (1×1) y Bluetooth® 5.3\n\nCámara Web: Cámara FHD HP True Vision de 1080p con reducción de ruido temporal y micrófonos digitales integrados de doble matriz\n\nColor: Azul claro de luna', 610.00, 9, '2', 'https://thotcomputacion.com.uy/wp-content/uploads/2024/03/6136_1_efe065d5c9c74bcfba8e24de01bc5d8e-300x300.jpg', 0.00),
(35, 'Notebook Acer A315-44P-R7GS Ryzen 7 5700U/16Gb/512Gb/15,6 IPS FHD/W11', 'Color plateado (Pure Silver).\nMicrosoft Windows 11 Home 64bit pre-instalado.\nProcesador AMD Ryzen 7 5700U 1.8Ghz (12M Caché, hasta 4.3Ghz).\n16GB DDR4 SDRAM. \n512GB NVMe SSD.\nPantalla LED IPS 15.6\" Full HD 1920 x 1080.\nVideo AMD Radeon Graphics.\nSonido HD c/altavoces estéreo integrados.\nWif 6 802.11ax + Bluetooth 5.1.\nRed Gigabit 10/100/1000.\nTeclado en inglés con teclado numérico.\nWebcam HD 720p con micrófono integrado.\nBatería de litio-ion de 3 celdas 50wh.\nDimensiones: 363 x 241 x 19.9mm\nPeso aprox.: 1.78kg', 624.99, 9, '2', 'https://thotcomputacion.com.uy/wp-content/uploads/2024/06/6384_1_190207503b55489da8cc595bed5dbd6f-300x300.jpg', 0.00),
(36, 'a', 'a', 123.00, 123, '4', 'https://thotcomputacion.com.uy/wp-content/uploads/2023/12/8-L-AMD-rx-300x300.jpg', 0.00);

CREATE TABLE `producto_categoria` (
  `id_producto` int(11) NOT NULL,
  `id_categoría` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `producto_categoria` (`id_producto`, `id_categoría`) VALUES
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(19, 1),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 1),
(25, 1),
(26, 1),
(27, 1),
(28, 1),
(29, 1),
(30, 2),
(31, 2),
(32, 2),
(34, 2),
(35, 2);

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `activo` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `usuario` (`id_usuario`, `email`, `nombre`, `password`, `rol`, `apellidos`, `display_name`, `fecha_creacion`, `activo`) VALUES
(23, 'lequinidylan@gmail.com', 'Dylan', '$argon2i$v=19$m=65536,t=4,p=1$YW9WTndLdTJ1UlZISHdmZQ$x1ZcSwEivy4GIvdhieufaryYUYnXudKwC3cQgvZ1F8s', 'Admin', 'Lequini', 'Dylan', '2024-11-12 09:01:02', 1);

CREATE TABLE `wishlist` (
  `id_wishlist` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `wishlist` (`id_wishlist`, `id_usuario`, `id_producto`) VALUES
(1, 23, 13),
(2, 23, 35);

ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id_carrito`),
  ADD KEY `id_usuario` (`id_usuario`);

ALTER TABLE `categoría`
  ADD PRIMARY KEY (`id_categoría`);

ALTER TABLE `detalle_carrito`
  ADD PRIMARY KEY (`id_carrito`,`id_producto`),
  ADD KEY `id_producto` (`id_producto`);

ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`);

ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`);

ALTER TABLE `producto_categoria`
  ADD PRIMARY KEY (`id_producto`,`id_categoría`),
  ADD KEY `id_categoría` (`id_categoría`);

ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id_wishlist`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_producto` (`id_producto`);

ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `carrito`
  MODIFY `id_carrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `categoría`
  MODIFY `id_categoría` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

ALTER TABLE `wishlist`
  MODIFY `id_wishlist` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

ALTER TABLE `detalle_carrito`
  ADD CONSTRAINT `detalle_carrito_ibfk_1` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id_carrito`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_carrito_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE;

ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `producto_categoria`
  ADD CONSTRAINT `producto_categoria_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `producto_categoria_ibfk_2` FOREIGN KEY (`id_categoría`) REFERENCES `categoría` (`id_categoría`);

ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE;
COMMIT;