DROP TABLE IF EXISTS `user`;  
CREATE TABLE `user` (  
  	`id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',  
  	`user_type` char(2) NOT NULL  COMMENT '用户类型 个人:10 商户:20 企业:21 服务站:30 配送员:40',
  	`user_name` varchar(20) NOT NULL COMMENT '系统登陆用户名',
	`mobilephone`  varchar(11) NOT NULL  COMMENT '手机号码',
	`email` varchar(40)  COMMENT '邮箱',
	`driving_license_type` varchar(2)  COMMENT '驾驶证类型',
	`name` varchar(30) COMMENT '用户真实姓名',
	`sex` char(1) NOT NULL DEFAULT '9' COMMENT '用户性别 1:male 0:femail 9:unknown', 
	`birthday` date  COMMENT '出生年月日',
	`address1` mediumint(8) unsigned  COMMENT '用户地址:省',
	`address2` mediumint(8) unsigned  COMMENT '用户地址:市',
	`address3` mediumint(8) unsigned COMMENT '用户地址:区',
	`address4` varchar(100)  COMMENT'用户详细地址',
	`contact` varchar(30) COMMENT '公司联系人姓名',
	`company_name` varchar(30) COMMENT '公司名称',
	`telphone1` varchar(4) COMMENT '公司固定电话区号',
	`telphone2` varchar(8) COMMENT '公司固定电话座机号',
	`telphone3` varchar(8) COMMENT '公司固定电话分机号',
	`subscribe` boolean default true COMMENT '订阅',
	`delflg` boolean NOT NULL DEFAULT false COMMENT '删除FLG',
	`version_number` mediumint(8)  unsigned not null DEFAULT 0 COMMENT '版本',
	`create_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册日期',
	`create_user` varchar(20) NOT NULL DEFAULT 'advertising' COMMENT '注册用户',
	`update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  ON UPDATE CURRENT_TIMESTAMP COMMENT '修改日期',
	`update_user` varchar(20) NOT NULL DEFAULT 'advertising' COMMENT '修改用户'
	
  PRIMARY KEY (`id`),  
  UNIQUE KEY `idx_name` (`name`),  
  UNIQUE KEY `idx_mobilephone` (`mobilephone`)，
  UNIQUE KEY `idx_email` (`email`)   
) ENGINE=MyISAM AUTO_INCREMENT=820792 DEFAULT CHARSET=gbk COMMENT='用户信息收集表';  
  