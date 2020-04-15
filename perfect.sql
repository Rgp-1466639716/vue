SET NAMES UTF8;
DROP DATABASE IF EXISTS perfect;
CREATE DATABASE perfect CHARSET=UTF8;
USE perfect;

CREATE TABLE perfect_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	phone VARCHAR(16),
	email VARCHAR(32),
	upwd VARCHAR(32),
	user_name VARCHAR(32),
	userID_num VARCHAR(18)
);
/**用户信息**/
INSERT INTO perfect_user VALUES
(NULL, '13501234567', NULL, '123123', '丁伟', '14062419940318201X'),
(NULL, '13501234568', NULL, '123456', '林当', '140624198540318201X'),
(NULL, '13501234569', NULL, '123321', '窦志强', '14062419630318201X'),
(NULL, '13501234560', NULL, '654321', '秦小雅', '140624197344328201X');


CREATE TABLE `perfect_product` (
  `pid` int(11) NOT NULL,
  `title` varchar(64) DEFAULT NULL,
  `details` varchar(128) DEFAULT NULL,
  `pic` varchar(128) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `discount` int(64) DEFAULT NULL,
  `href` varchar(128) DEFAULT NULL,
  `seq_recommended` tinyint(4) DEFAULT NULL,
  `seq_new_arrival` tinyint(4) DEFAULT NULL,
  `seq_top_sale` tinyint(4) DEFAULT NULL
);

INSERT INTO `perfect_product` (`pid`, `title`, `details`, `pic`, `price`, `discount`, `href`, `seq_recommended`, `seq_new_arrival`, `seq_top_sale`) VALUES
(1, '赛睿 Apex M500 专业游戏背光机械键盘有线104cherry樱桃红轴青轴', '赛睿 Apex M500 专业游戏背光机械键盘有线104cherry樱桃红轴青轴', 'e1dde6d7d1e849d7b735a5436b1e5638_160.jpg', '819.00', 96, 'product_details.html?lid=1', 1, 1, 1),
(2, 'steelseries/赛睿 Arctis 3寒冰3 RGB游戏耳机7.1', 'steelseries/赛睿 Arctis 3寒冰3 RGB游戏耳机7.1', '321e90c6749c4ee2806dc475df3a7002_160.jpg', '629.00', 97, 'product_details.html?lid=5', 2, 2, 2),
(3, 'steelseries/赛睿 Arctis 7寒冰7 头戴式无线游戏耳机麦', 'steelseries/赛睿 Arctis 7寒冰7 头戴式无线游戏耳机麦', 'b19d1b26b1134dab954e63ac927c38e3_160.jpg', '1349.00', 96, 'product_details.html?lid=9', 3, 3, 3),
(4, 'teelseries/赛睿 Arctis Pro 寒冰 Pro 头戴式 游戏耳机耳麦', 'teelseries/赛睿 Arctis Pro 寒冰 Pro 头戴式 游戏耳机耳麦', 'e280710b9faa4432b4e7f951103b5c80_160.jpg', '1499.00', 94, 'product_details.html?lid=13', 4, 4, 4),
(5, '赛睿 rival 600 有线游戏鼠标rgb宏编程双传感防滑侧裙配重', '赛睿 rival 600 有线游戏鼠标rgb宏编程双传感防滑侧裙配重', 'd4dca05806744e368b07e1bd45041933_160.jpg', '659.00', NULL, 'product_details.html?lid=17', 5, 5, 5),
(6, 'SteelSeries赛睿 Rival 700 有线游戏鼠标rgb幻彩呼吸灯', 'SteelSeries赛睿 Rival 700 有线游戏鼠标rgb幻彩呼吸灯', '1f081573f16f4c89af51b29931acec93_160.jpg', '699.00', NULL, 'product_details.html?lid=19', 6, 6, 6),
(7, 'SteelSeries赛睿 rival 100 光学有线电竞游戏鼠标 RGB呼吸灯', 'SteelSeries赛睿 rival 100 光学有线电竞游戏鼠标 RGB呼吸灯', 'da24ca0d6a0843d086f8c7c79e125975_160.jpg', '199.00', 67, 'product_details.html?lid=38', 0, 0, 0),
(8, '赛睿 Rival 300s 有线RGB游戏鼠标  csgo', '赛睿 Rival 300s 有线RGB游戏鼠标  csgo', '15b0aefece3543b8be54b011ad64b5f9_160.jpg', '5799.00', NULL, 'product_details.html?lid=38', 0, 0, 0);

CREATE TABLE perfect_cart(
 id  INT PRIMARY KEY AUTO_INCREMENT,
 lid INT,
 price DECIMAL(10,2),
 count INT,
 lname VARCHAR(255),
 uid   INT
);




