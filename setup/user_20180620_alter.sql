ALTER TABLE `user` 
ADD COLUMN `car_type` VARCHAR(20) NULL DEFAULT NULL COMMENT '车型' AFTER `driving_license`,
ADD COLUMN `production` VARCHAR(100) NULL DEFAULT NULL COMMENT '主要生产类别' AFTER `telphone3`,
ADD COLUMN `mobilephoneby` varchar(11) NULL  COMMENT '推荐人手机号码' AFTER `email`;