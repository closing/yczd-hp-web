ALTER TABLE `user` 
ADD COLUMN `car_type` VARCHAR(10) NULL DEFAULT NULL COMMENT '驾驶证' AFTER `driving_license`,
ADD COLUMN `carry_capacity` DECIMAL(5,2) NULL DEFAULT 0.00 COMMENT '载重' AFTER `car_type`;
ADD COLUMN `production` VARCHAR(20) NULL DEFAULT NULL COMMENT '主要生产类别' AFTER `telphone3`;