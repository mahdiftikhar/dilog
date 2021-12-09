-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: dilog
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `userName` varchar(255) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userName`),
  UNIQUE KEY `username_UNIQUE` (`userName`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('admin','admin@gmail.com','$2a$12$8de9CVtL4sfuaUG66S5Lq.9EHt3OlLpsFuA91U0PCnw.Ypcqifj4W');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bannedusers`
--

DROP TABLE IF EXISTS `bannedusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bannedusers` (
  `adminId` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userEmail` varchar(320) NOT NULL,
  PRIMARY KEY (`userName`),
  UNIQUE KEY `userEmail_UNIQUE` (`userEmail`),
  UNIQUE KEY `userName_UNIQUE` (`userName`),
  KEY `admin_id_idx` (`adminId`),
  CONSTRAINT `adminId` FOREIGN KEY (`adminId`) REFERENCES `admin` (`userName`),
  CONSTRAINT `userName_banned` FOREIGN KEY (`userName`) REFERENCES `user` (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bannedusers`
--

LOCK TABLES `bannedusers` WRITE;
/*!40000 ALTER TABLE `bannedusers` DISABLE KEYS */;
/*!40000 ALTER TABLE `bannedusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `postId` int NOT NULL,
  `reacts` int NOT NULL,
  `creationTime` datetime NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `postid1_idx` (`postId`),
  CONSTRAINT `postid1` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (16,'user',8,0,'2021-11-29 01:37:55','mujhay bhee aa raha hay. ao mill ke chalain'),(18,'user',9,0,'2021-11-29 19:24:36','adding a test comment');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentmentions`
--

DROP TABLE IF EXISTS `commentmentions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentmentions` (
  `commentId` int NOT NULL,
  `userName` varchar(255) NOT NULL,
  PRIMARY KEY (`commentId`,`userName`),
  KEY `user_name_idx` (`userName`),
  CONSTRAINT `commentid1` FOREIGN KEY (`commentId`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_name` FOREIGN KEY (`userName`) REFERENCES `user` (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentmentions`
--

LOCK TABLES `commentmentions` WRITE;
/*!40000 ALTER TABLE `commentmentions` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentmentions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentreacts`
--

DROP TABLE IF EXISTS `commentreacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentreacts` (
  `commentId` int NOT NULL,
  `userName` varchar(255) NOT NULL,
  PRIMARY KEY (`commentId`,`userName`),
  KEY `user_id_idx` (`userName`),
  CONSTRAINT `comment_id` FOREIGN KEY (`commentId`) REFERENCES `comment` (`id`),
  CONSTRAINT `user_id2` FOREIGN KEY (`userName`) REFERENCES `user` (`userName`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentreacts`
--

LOCK TABLES `commentreacts` WRITE;
/*!40000 ALTER TABLE `commentreacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentreacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follows` (
  `followerId` varchar(255) NOT NULL,
  `followingId` varchar(255) NOT NULL,
  PRIMARY KEY (`followerId`,`followingId`),
  KEY `followerId_idx` (`followingId`),
  CONSTRAINT `followerId` FOREIGN KEY (`followingId`) REFERENCES `user` (`userName`),
  CONSTRAINT `followId` FOREIGN KEY (`followerId`) REFERENCES `user` (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `text` varchar(999) NOT NULL,
  `image` blob,
  `reacts` int DEFAULT '0',
  `creationTime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userName_idx` (`userName`),
  CONSTRAINT `userName` FOREIGN KEY (`userName`) REFERENCES `user` (`userName`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'umair14040','firstpost happy','Hello this is my first post',_binary '0',0,'2021-11-16 09:44:00'),(3,'sjc','firstpost happy','Hello this is my first post',_binary '0',0,'2021-11-16 09:44:00'),(4,'antonnio','firstpost happy','lorem ipsum',_binary '0',0,'2021-11-16 09:44:00'),(5,'nullptr','firstpost happy','mujhay maar do',_binary '0',0,'2021-11-16 09:44:00'),(6,'nullptr','firstpost happy','mujhay maar do please',_binary '0',0,'2021-11-16 09:44:00'),(7,'umair14040','lol','what is this? i am tired. DB sucks',_binary '0',0,'2021-11-18 09:11:00'),(8,'nullptr','music','jaldee karo mujhay susu aa raha hay. khalee glass me doodh kyun para hay????',NULL,1,'2021-11-18 09:11:15'),(9,'sjc','music','menay masqurade ball pe jaana tha yaar. me db kyun kar raha hoon',NULL,2,'2021-11-18 09:11:16');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postmentions`
--

DROP TABLE IF EXISTS `postmentions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postmentions` (
  `postId` int NOT NULL,
  `userName` varchar(255) NOT NULL,
  PRIMARY KEY (`postId`,`userName`),
  KEY `user_name_idx` (`userName`),
  CONSTRAINT `postid2` FOREIGN KEY (`postId`) REFERENCES `post` (`id`),
  CONSTRAINT `user_name1` FOREIGN KEY (`userName`) REFERENCES `user` (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postmentions`
--

LOCK TABLES `postmentions` WRITE;
/*!40000 ALTER TABLE `postmentions` DISABLE KEYS */;
/*!40000 ALTER TABLE `postmentions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postreacts`
--

DROP TABLE IF EXISTS `postreacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postreacts` (
  `postId` int NOT NULL,
  `userName` varchar(255) NOT NULL,
  PRIMARY KEY (`postId`,`userName`),
  KEY `userName_idx` (`userName`),
  CONSTRAINT `post_id` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`userName`) REFERENCES `user` (`userName`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postreacts`
--

LOCK TABLES `postreacts` WRITE;
/*!40000 ALTER TABLE `postreacts` DISABLE KEYS */;
INSERT INTO `postreacts` VALUES (9,'test'),(9,'test_new'),(8,'user');
/*!40000 ALTER TABLE `postreacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportcomments`
--

DROP TABLE IF EXISTS `reportcomments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportcomments` (
  `reportId` int NOT NULL AUTO_INCREMENT,
  `commentId` int NOT NULL,
  `creationTime` datetime NOT NULL,
  `reportReason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`reportId`),
  UNIQUE KEY `reportId_UNIQUE` (`reportId`),
  KEY `commentid2_idx` (`commentId`),
  CONSTRAINT `commentid2` FOREIGN KEY (`commentId`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportcomments`
--

LOCK TABLES `reportcomments` WRITE;
/*!40000 ALTER TABLE `reportcomments` DISABLE KEYS */;
/*!40000 ALTER TABLE `reportcomments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportposts`
--

DROP TABLE IF EXISTS `reportposts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportposts` (
  `reportId` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `creationTime` datetime NOT NULL,
  `reportReason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`reportId`),
  UNIQUE KEY `reportId_UNIQUE` (`reportId`),
  KEY `postid3_idx` (`postId`),
  CONSTRAINT `postid3` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportposts`
--

LOCK TABLES `reportposts` WRITE;
/*!40000 ALTER TABLE `reportposts` DISABLE KEYS */;
INSERT INTO `reportposts` VALUES (1,9,'2021-11-29 23:48:03','spam'),(2,9,'2021-12-04 02:27:24','spam');
/*!40000 ALTER TABLE `reportposts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suspendedusers`
--

DROP TABLE IF EXISTS `suspendedusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suspendedusers` (
  `adminId` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `endTime` datetime NOT NULL,
  PRIMARY KEY (`userName`),
  UNIQUE KEY `userName_UNIQUE` (`userName`),
  KEY `adminID_idx` (`adminId`),
  CONSTRAINT `adminId_suspend` FOREIGN KEY (`adminId`) REFERENCES `admin` (`userName`),
  CONSTRAINT `userName_suspend` FOREIGN KEY (`userName`) REFERENCES `user` (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suspendedusers`
--

LOCK TABLES `suspendedusers` WRITE;
/*!40000 ALTER TABLE `suspendedusers` DISABLE KEYS */;
/*!40000 ALTER TABLE `suspendedusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userName` varchar(255) NOT NULL,
  `email` varchar(320) NOT NULL,
  `displayPicture` blob,
  `dateOfBirth` date NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userName`),
  UNIQUE KEY `userName_UNIQUE` (`userName`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('antonnio','antonnio@gmail.com',_binary '0','1999-06-19','my name is afaq','password12345'),('beanbunny','beanbunny@gmail.com',_binary '0','2001-09-20','my name is ahmad','password12345'),('newUser','newUser@gmail.com',NULL,'2021-11-16',NULL,'test'),('nullptr','nullptr@gmail.com',_binary '0','1999-10-19','my name is mahd','password12345'),('sjc','jamilshayaan@gmail.com',_binary '0','2000-10-09','my name is shayaan','password12345'),('test','test@gmail.com',NULL,'2021-12-25',NULL,'$2a$12$8oFiJYNtxGi17UeRMd7Pv.gliBkP/4iJL8Q2Vrfg68yI2u1xGMB26'),('test_new','new@gmail.com',NULL,'2021-11-30',NULL,'$2a$12$JpVVnQjjZh9LoiUiJqhEp.NUPydOQUxXxYptYnM4VlS2rNS8aqGie'),('umair14040','umair2000yousaf@gmail.com',_binary '0','2000-12-30','my name is umair','password123'),('user','user@gmai.com',NULL,'2021-11-02','Hello. I am a test user. I like to suck cock!','$2a$12$SF/5hxCP//4BLg7oWzywwubl1NA1oRXEHRVPEDbkuGdvpCNBJb7Eq'),('user2','uasdf.afasd@fgmad.com',NULL,'2021-11-04',NULL,'$2a$12$XqEXCYqd2kGnoWW122swBOKGOeX3kwy6Sd8ki2r1Ig5CFGVyItrLO');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-05 19:48:59
