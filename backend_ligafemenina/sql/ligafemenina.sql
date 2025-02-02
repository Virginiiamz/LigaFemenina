-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 02-02-2025 a las 13:12:32
-- Versión del servidor: 8.0.39
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ligafemenina`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `idequipo` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `urlimagen` varchar(1000) NOT NULL,
  `esta_federado` tinyint(1) NOT NULL,
  `dinero_transferencias` float NOT NULL,
  `fechacreacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `equipo`
--

INSERT INTO `equipo` (`idequipo`, `nombre`, `ciudad`, `urlimagen`, `esta_federado`, `dinero_transferencias`, `fechacreacion`) VALUES
(1, 'Rabesa Femenino', 'Alcala de Guadaira', 'https://footballlogosandkits.com/images_esc3/ESPA/ANDALUC%CDA/SEVILLA/escudos_min/MIN_ESC_C.D.%20RABESA.png', 1, 2000, '2022-01-01'),
(7, 'Betis', 'Sevilla', '', 1, 5000, '2018-02-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadora`
--

CREATE TABLE `jugadora` (
  `idjugadora` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `posicion` varchar(50) NOT NULL,
  `sueldo` float NOT NULL,
  `disponible_jugar` tinyint(1) NOT NULL,
  `fechainscripcion` date NOT NULL,
  `idequipo` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `jugadora`
--

INSERT INTO `jugadora` (`idjugadora`, `nombre`, `apellidos`, `posicion`, `sueldo`, `disponible_jugar`, `fechainscripcion`, `idequipo`) VALUES
(1, 'Virginia', 'Castro', 'Delantera', 200, 1, '2025-02-01', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`idequipo`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `jugadora`
--
ALTER TABLE `jugadora`
  ADD PRIMARY KEY (`idjugadora`),
  ADD KEY `idequipo` (`idequipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `idequipo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `jugadora`
--
ALTER TABLE `jugadora`
  MODIFY `idjugadora` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `jugadora`
--
ALTER TABLE `jugadora`
  ADD CONSTRAINT `jugadora_ibfk_1` FOREIGN KEY (`idequipo`) REFERENCES `equipo` (`idequipo`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
