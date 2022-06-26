-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: euprava
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `criminal_proceeding`
--

DROP TABLE IF EXISTS `criminal_proceeding`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `criminal_proceeding` (
  `id` int NOT NULL AUTO_INCREMENT,
  `beginDate` datetime NOT NULL,
  `endDate` datetime DEFAULT NULL,
  `accusation` varchar(255) NOT NULL,
  `judgment` varchar(255) DEFAULT NULL,
  `convicted` tinyint NOT NULL DEFAULT '0',
  `severity` int NOT NULL DEFAULT '0',
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_de1df851857fbb16e445bbd6265` (`userId`),
  CONSTRAINT `FK_de1df851857fbb16e445bbd6265` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criminal_proceeding`
--

LOCK TABLES `criminal_proceeding` WRITE;
/*!40000 ALTER TABLE `criminal_proceeding` DISABLE KEYS */;
INSERT INTO `criminal_proceeding` VALUES (3,'2022-06-09 02:25:25','2022-06-14 00:56:32','optuxbabsa23','osudjen novcano 400000',0,5,3),(5,'2022-06-06 02:31:52',NULL,'nova greska',NULL,0,0,4),(6,'2022-06-06 02:31:52',NULL,'nova greska','kriv',0,4214,4),(7,'2022-06-09 02:25:25','2022-06-14 00:56:32','optuxbabsa23safasgasgagsags','osudjen novcano 400000',0,5,3);
/*!40000 ALTER TABLE `criminal_proceeding` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `id_card`
--

DROP TABLE IF EXISTS `id_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `id_card` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `duration` int NOT NULL,
  `placeIfIssue` varchar(255) NOT NULL,
  `dateOfIssue` datetime NOT NULL,
  `lostOrStolen` tinyint NOT NULL DEFAULT '0',
  `city` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1a242b1783ab7420f4ae891a7d5` (`userId`),
  CONSTRAINT `FK_1a242b1783ab7420f4ae891a7d5` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `id_card`
--

LOCK TABLES `id_card` WRITE;
/*!40000 ALTER TABLE `id_card` DISABLE KEYS */;
/*!40000 ALTER TABLE `id_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint NOT NULL DEFAULT '0',
  `blocked` tinyint NOT NULL DEFAULT '0',
  `jmbg` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `idCardNumber` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'fil','fil','pet@ptest.com','/1rBkZBCSx2I+UGe+UmuVrfj6nLPFxllj0t82K72B94=',1,0,2810996793418,NULL,NULL,0),(3,'Filip','Petric','petricf96@gmail.com','/1rBkZBCSx2I+UGe+UmuVkgxEEo92X6RYAi650Gw808=',0,0,2810996,NULL,NULL,0),(4,'Filip','Petric','petricf996@gmail.com','/1rBkZBCSx2I+UGe+UmuVrfj6nLPFxllj0t82K72B94=',0,0,28100967,NULL,NULL,0),(5,'Admin','Admin','admin@test.com','/1rBkZBCSx2I+UGe+UmuVkgxEEo92X6RYAi650Gw808=',1,0,2810996,NULL,NULL,0),(6,'Filip','Petric','p2@test.com','/1rBkZBCSx2I+UGe+UmuVkgxEEo92X6RYAi650Gw808=',0,0,2810996793418,NULL,NULL,2810996793418),(7,'butro','gali','butros@gmail.com','/1rBkZBCSx2I+UGe+UmuVkgxEEo92X6RYAi650Gw808=',0,0,921905109529,NULL,NULL,NULL),(8,'petri','svetar','svet@gmail.com','/1rBkZBCSx2I+UGe+UmuVkgxEEo92X6RYAi650Gw808=',0,0,2810925091019,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccine`
--

DROP TABLE IF EXISTS `vaccine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccine` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateOfVaccintaion` datetime NOT NULL,
  `disease` varchar(255) NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_52ddcf5fd9c977edfd4b386fc45` (`userId`),
  CONSTRAINT `FK_52ddcf5fd9c977edfd4b386fc45` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccine`
--

LOCK TABLES `vaccine` WRITE;
/*!40000 ALTER TABLE `vaccine` DISABLE KEYS */;
INSERT INTO `vaccine` VALUES (2,'2022-03-22 01:04:51',' male boginje',5),(3,'2022-06-12 02:22:53','boginje 2 ',3);
/*!40000 ALTER TABLE `vaccine` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-16 11:16:48
