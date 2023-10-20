SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- PHP access to the database : User privileges
-- -----------------------------------------------------
REVOKE ALL PRIVILEGES ON `investdb`.* FROM 'api_access'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON `investdb`.* TO 'api_access'@'%';
FLUSH PRIVILEGES;

-- -----------------------------------------------------
-- Schema investdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `investdb` DEFAULT CHARACTER SET utf8 ;
USE `investdb` ;

-- -----------------------------------------------------
-- Table `investdb`.`financials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `investdb`.`financials` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `amount` BIGINT NOT NULL,
  `date` DATE NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `status` VARCHAR(255) NOT NULL,
  `roi` BIGINT NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `duration` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `investdb`.`estates`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `investdb`.`estates` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `amount` BIGINT NOT NULL,
  `date` DATE NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `status` VARCHAR(255) NOT NULL,
  `roi` BIGINT NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `duration` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;