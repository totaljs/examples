CREATE TABLE `tbl_user` (
  `id` VARCHAR(255) NOT NULL,
  `gender` ENUM('male', 'female') NOT NULL,
  `firstname` VARCHAR(40) NOT NULL,
  `lastname` VARCHAR(40) NOT NULL,
  `role` ENUM('collector', 'buyer') NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `pincode` INT NOT NULL,
  `photo` TEXT,
  `isremoved` BOOLEAN DEFAULT FALSE,
  `dtcreated` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `dtupdated` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  `countlogin` INT DEFAULT 0,
  `isonline` BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;