-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 20 2023 г., 22:41
-- Версия сервера: 8.0.30
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `catalog`
--

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `price`, `description`) VALUES
(1, 'Толстовка', 'product1.png', 2599, 'Сезон: На любой сезон\r\nМатериал: Хлопок\r\nСостав материала: 100% Хлопок'),
(2, 'Брюки ', 'product2.png', 1999, 'Сезон: На любой сезон\r\nМатериал: Хлопок\r\nСостав материала: хлопок 98%, спандекс 2%; подкл.:хлопок 100%\r\n'),
(3, 'Джинсы', 'product3.png', 2499, 'Сезон: На любой сезон\r\nМатериал: Хлопок\r\nСостав материала: 99% Хлопок 1% Эластан\r\n');

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `id` int NOT NULL,
  `productId` int NOT NULL,
  `nameAuthor` varchar(255) NOT NULL,
  `review` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `reviews`
--

INSERT INTO `reviews` (`id`, `productId`, `nameAuthor`, `review`) VALUES
(1, 1, 'Москвин Роман Миронович', 'Достоинства\r\nХорошая ,хлопковая  '),
(2, 1, 'Григорьев Матвей Робертович', 'Недостатки\r\nне аккуратно и неровно сзади прострочена горловина \r\n'),
(3, 2, 'Басов Фёдор Вячеславович', 'Достоинства\r\nВ размер с первого раза  \r\nНедостатки\r\nКачество \r\nКомментарий\r\nЕсть торчащие нитки, но это мелочь. Закинул в стирку на 30 градусов. Появились полосы. Качество явно оставляет желать лучшего'),
(4, 2, 'Ковалев Артём Матвеевич', 'Достоинства\r\nудобные, стрейчевые, цвет \r\nНедостатки\r\nдо этого брал тоже размер 34 только другого цвета и они были свободные. эти приталенные. обе модели слим ыит стрейч \r\nКомментарий\r\nклассные. \r\n'),
(5, 3, 'Поляков Пётр Александрович', 'Достоинства\r\nКачество хорошее \r\nНедостатки\r\nПочти не тянутся \r\nКомментарий\r\nВсе супер , с размером тоже 30/30 - 44/46 \r\n'),
(6, 3, 'Козлов Максим Иванович', 'Удобные!');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
