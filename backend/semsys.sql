-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 02-Abr-2020 às 00:04
-- Versão do servidor: 10.1.38-MariaDB
-- versão do PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `semsys`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `address`
--

INSERT INTO `address` (`id`, `complement`, `number`, `street`, `zip_code`, `city_id`, `person_id`) VALUES
(1, NULL, '165', '3947 Roosevelt Road', '67202', 1, 1),
(2, NULL, '45', '621 Lilac Circle', '90003', 6, 2),
(3, NULL, '352', '643 Hickory Ridge Drive', '89101', 7, 3),
(4, NULL, '76', '4542 Elm Drive', '10019', 9, 4),
(5, NULL, '178', '2035 Fidler Drive', '66101', 2, 5),
(6, NULL, '2265', '4060  Hickman Street', '66601', 3, 6),
(7, NULL, '10', '4007  Sherman Street', '66044', 4, 7),
(8, NULL, '10', '4007  Sherman Street', '66044', 4, 8);

-- --------------------------------------------------------

--
-- Estrutura da tabela `city`
--

CREATE TABLE `city` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `city`
--

INSERT INTO `city` (`id`, `name`, `state_id`) VALUES
(1, 'Wichita', 1),
(2, 'Kansas City', 1),
(3, 'Topeka', 1),
(4, 'Lawrence', 1),
(5, 'Beverly Hills', 2),
(6, 'Los Angeles', 2),
(7, 'Las Vegas', 3),
(8, 'Long Beach', 4),
(9, 'New York', 4),
(10, 'James Town', 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `abbreviation` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `country`
--

INSERT INTO `country` (`id`, `abbreviation`, `name`) VALUES
(1, 'US', 'United States of America');

-- --------------------------------------------------------

--
-- Estrutura da tabela `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `period` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `course`
--

INSERT INTO `course` (`id`, `name`, `period`, `type`) VALUES
(1, 'Computer Science', 1, 3),
(2, 'Information Systems', 2, 3),
(3, 'Internet of Things: Business Implications and Opportunities', 3, 1),
(4, 'Specialization in Big Data and Business Intelligence', 1, 1),
(5, 'Information Technology Management', 3, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `employee`
--

INSERT INTO `employee` (`id`) VALUES
(1),
(5),
(6),
(7),
(8);

-- --------------------------------------------------------

--
-- Estrutura da tabela `meeting_schedule`
--

CREATE TABLE `meeting_schedule` (
  `id` int(11) NOT NULL,
  `datetime` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `meeting_schedule`
--

INSERT INTO `meeting_schedule` (`id`, `datetime`, `status`, `employee_id`, `student_id`) VALUES
(1, '2019-05-20 15:00:00', 2, 1, 2),
(2, '2019-06-16 16:30:00', 3, 1, 3),
(3, '2019-07-05 18:00:00', 2, 1, 4),
(4, '2019-08-12 22:15:00', 3, 5, 4),
(5, '2019-09-25 23:30:00', 2, 5, 2),
(6, '2019-10-30 16:00:00', 2, 6, 4),
(7, '2019-12-01 18:10:00', 2, 7, 2),
(8, '2019-12-11 17:20:00', 3, 7, 3),
(9, '2020-01-20 22:00:00', 1, 7, 3),
(10, '2020-02-10 14:30:00', 1, 1, 2),
(11, '2020-03-15 16:30:00', 1, 5, 2),
(12, '2020-04-05 18:30:00', 1, 5, 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `person`
--

CREATE TABLE `person` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `social_security_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `person`
--

INSERT INTO `person` (`id`, `email`, `name`, `password`, `social_security_number`) VALUES
(1, 'iommi@email.com', 'Anthony Frank Iommi', '$2a$10$4ga28r14ar/.TZysI1EP8OUZX3OL78Sj/NLeweHRG/.17xZSFnlGq', '039-58-6788'),
(2, 'geddy@email.com', 'Gary Lee Weinrib', '$2a$10$3ik7WUmBmNmIHkQIbAzAvO45UoALPn/xteXItS5iYIpGYnQToOD3y', '500-28-0871'),
(3, 'alex@email.com', 'Alexandar Živojinovi?', '$2a$10$GvJlFv8d2Cx3Koq1AgATfuC.eomBBIyAvdbc2pzms2OlWwvcG/v.W', '097-10-6026'),
(4, 'neil@email.com', 'Neil Ellwood Peart', '$2a$10$kguKbMY1vr3i7yVqAfMUfua/wWQjVdf0UCneS5wSeMVCX9mwvYUpS', '513-70-7489'),
(5, 'butler@email.com', 'Terence Michael Joseph Butler', '$2a$10$wvI.w8kSm7XYICSME2kMS.Lk1Q4zX7zP08o2PkW1NCe66PAVQVD9y', '554-90-1122'),
(6, 'osbourne@email.com', 'John Michael Osbourne', '$2a$10$Kct0zHneux0JZmkvBJv3TOIPrMF1SfRdABEGKbk04Q8H7Y4X1Rsky', '464-38-6460'),
(7, 'ward@email.com', 'William Thomas Ward', '$2a$10$CtTJPlW.zJ/uXOGccdNq7O1ZnA.otQM1EIGxiwBRJIVp0hQVuoJoa', '426-24-7372'),
(8, 'dio@email.com', 'Ronnie James Dio', '$2a$10$qOa.RYja4fJdWsdYzEhbdehJP/7h7GI2cPzYVIaAClXKbNIUcp9vq', '517-02-6017');

-- --------------------------------------------------------

--
-- Estrutura da tabela `phone_number`
--

CREATE TABLE `phone_number` (
  `person_id` int(11) NOT NULL,
  `phone_numbers` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `phone_number`
--

INSERT INTO `phone_number` (`person_id`, `phone_numbers`) VALUES
(1, '316-202-1340'),
(1, '316-201-2184'),
(2, '213-200-1392'),
(3, '702-201-6185'),
(4, '646-388-5724'),
(5, '913-214-6938'),
(6, '785-207-0079'),
(7, '785-218-2226'),
(8, '785-218-2226');

-- --------------------------------------------------------

--
-- Estrutura da tabela `profile`
--

CREATE TABLE `profile` (
  `person_id` int(11) NOT NULL,
  `profiles` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `profile`
--

INSERT INTO `profile` (`person_id`, `profiles`) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 3),
(4, 3),
(5, 2),
(6, 2),
(7, 2),
(8, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `emission` datetime DEFAULT NULL,
  `title` varchar(30) DEFAULT NULL,
  `schedule_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `report`
--

INSERT INTO `report` (`id`, `content`, `emission`, `title`, `schedule_id`) VALUES
(1, 'Lorem ipsum dolor sit. Suspendisse nec metus tellus. Vivamus eu hendrerit nisl. Curabitur non eleifend lacus. Donec ut laoreet arcu. Sed lobortis sem ac tortor consequat vulputate. Donec in purus vehicula, sollicitudin sapien vel, sodales ipsum. Curabitur facilisis fringilla semper. Vivamus pulvinar velit ligula.', '2019-05-20 03:00:00', 'Home problems', 1),
(2, 'Lorem ipsum dolor sit. Suspendisse nec metus tellus. Vivamus eu hendrerit nisl. Curabitur non eleifend lacus. Donec ut laoreet arcu. Sed lobortis sem ac tortor consequat vulputate. Donec in purus vehicula, sollicitudin sapien vel, sodales ipsum. Curabitur facilisis fringilla semper. Vivamus pulvinar velit ligula.', '2019-07-05 03:00:00', 'Lack of Discipline', 3),
(3, 'Lorem ipsum dolor sit. Suspendisse nec metus tellus. Vivamus eu hendrerit nisl. Curabitur non eleifend lacus. Donec ut laoreet arcu. Sed lobortis sem ac tortor consequat vulputate. Donec in purus vehicula, sollicitudin sapien vel, sodales ipsum. Curabitur facilisis fringilla semper. Vivamus pulvinar velit ligula.', '2019-09-25 03:00:00', 'Domestic violence', 5),
(4, 'Lorem ipsum dolor sit. Suspendisse nec metus tellus. Vivamus eu hendrerit nisl. Curabitur non eleifend lacus. Donec ut laoreet arcu. Sed lobortis sem ac tortor consequat vulputate. Donec in purus vehicula, sollicitudin sapien vel, sodales ipsum. Curabitur facilisis fringilla semper. Vivamus pulvinar velit ligula.', '2019-10-30 02:00:00', 'Bullying', 6),
(5, 'Lorem ipsum dolor sit. Suspendisse nec metus tellus. Vivamus eu hendrerit nisl. Curabitur non eleifend lacus. Donec ut laoreet arcu. Sed lobortis sem ac tortor consequat vulputate. Donec in purus vehicula, sollicitudin sapien vel, sodales ipsum. Curabitur facilisis fringilla semper. Vivamus pulvinar velit ligula.', '2019-12-01 02:00:00', 'Drinking problems', 7);

-- --------------------------------------------------------

--
-- Estrutura da tabela `school_class`
--

CREATE TABLE `school_class` (
  `id` int(11) NOT NULL,
  `end` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `school_class`
--

INSERT INTO `school_class` (`id`, `end`, `name`, `start`, `course_id`) VALUES
(1, '2021-02-01 02:00:00', 'CS - Class01', '2018-02-01 02:00:00', 1),
(2, '2022-10-05 03:00:00', 'CS - Class02', '2019-10-05 03:00:00', 1),
(3, '2018-08-10 03:00:00', 'IS - Class01', '2015-08-10 03:00:00', 2),
(4, '2019-04-03 03:00:00', 'IS - Class02', '2016-04-03 03:00:00', 2),
(5, '2022-05-05 03:00:00', 'IS - Class03', '2019-05-05 03:00:00', 2),
(6, '2020-03-01 03:00:00', 'Iot - Class01', '2019-03-01 03:00:00', 3),
(7, '2020-08-01 03:00:00', 'BDBI - Class01', '2020-02-01 02:00:00', 4),
(8, '2022-06-05 03:00:00', 'ITM - Class01', '2020-06-05 03:00:00', 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `state`
--

CREATE TABLE `state` (
  `id` int(11) NOT NULL,
  `abbreviation` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `state`
--

INSERT INTO `state` (`id`, `abbreviation`, `name`, `country_id`) VALUES
(1, 'KS', 'Kansas', 1),
(2, 'CA', 'California', 1),
(3, 'NV', 'Nevada', 1),
(4, 'NY', 'New York', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `student`
--

CREATE TABLE `student` (
  `birthdate` datetime DEFAULT NULL,
  `id` int(11) NOT NULL,
  `class_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `student`
--

INSERT INTO `student` (`birthdate`, `id`, `class_id`) VALUES
('1998-07-29 03:00:00', 2, 1),
('2000-07-29 03:00:00', 3, 3),
('2002-07-29 03:00:00', 4, 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKpo044ng5x4gynb291cv24vtea` (`city_id`),
  ADD KEY `FK81ihijcn1kdfwffke0c0sjqeb` (`person_id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6p2u50v8fg2y0js6djc6xanit` (`state_id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meeting_schedule`
--
ALTER TABLE `meeting_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKgq320pweeqesm39qdvttyray1` (`employee_id`),
  ADD KEY `FKj1w9tn53w25ay1j22mctp95w3` (`student_id`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `phone_number`
--
ALTER TABLE `phone_number`
  ADD KEY `FK4sjbpst35alcsan1qwbdb2nyu` (`person_id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD KEY `FKj4iunefvjq13m2j5a8l8odylw` (`person_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKif9asrcufj1khpkhf29wsaprn` (`schedule_id`);

--
-- Indexes for table `school_class`
--
ALTER TABLE `school_class`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKl5ga0x3a5st9ykx4kj7ytj7bv` (`course_id`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKghic7mqjt6qb9vq7up7awu0er` (`country_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKggbojybhgj5tcobcfdt1kxe3y` (`class_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `meeting_schedule`
--
ALTER TABLE `meeting_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `school_class`
--
ALTER TABLE `school_class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `FK81ihijcn1kdfwffke0c0sjqeb` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`),
  ADD CONSTRAINT `FKpo044ng5x4gynb291cv24vtea` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`);

--
-- Limitadores para a tabela `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `FK6p2u50v8fg2y0js6djc6xanit` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`);

--
-- Limitadores para a tabela `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `FKt824vonkbw2cnqvtmscpuodj9` FOREIGN KEY (`id`) REFERENCES `person` (`id`);

--
-- Limitadores para a tabela `meeting_schedule`
--
ALTER TABLE `meeting_schedule`
  ADD CONSTRAINT `FKgq320pweeqesm39qdvttyray1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  ADD CONSTRAINT `FKj1w9tn53w25ay1j22mctp95w3` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`);

--
-- Limitadores para a tabela `phone_number`
--
ALTER TABLE `phone_number`
  ADD CONSTRAINT `FK4sjbpst35alcsan1qwbdb2nyu` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`);

--
-- Limitadores para a tabela `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `FKj4iunefvjq13m2j5a8l8odylw` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`);

--
-- Limitadores para a tabela `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `FKif9asrcufj1khpkhf29wsaprn` FOREIGN KEY (`schedule_id`) REFERENCES `meeting_schedule` (`id`);

--
-- Limitadores para a tabela `school_class`
--
ALTER TABLE `school_class`
  ADD CONSTRAINT `FKl5ga0x3a5st9ykx4kj7ytj7bv` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);

--
-- Limitadores para a tabela `state`
--
ALTER TABLE `state`
  ADD CONSTRAINT `FKghic7mqjt6qb9vq7up7awu0er` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`);

--
-- Limitadores para a tabela `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `FKggbojybhgj5tcobcfdt1kxe3y` FOREIGN KEY (`class_id`) REFERENCES `school_class` (`id`),
  ADD CONSTRAINT `FKslayvtom01idjdexcxh76k935` FOREIGN KEY (`id`) REFERENCES `person` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
