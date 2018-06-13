package com.yczd.hp.web.common.api;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yczd.hp.web.common.dao.IUserDao;

@Controller
@RequestMapping("/commonapi")
public class CommonUserApi {
	@Resource
	IUserDao userDao;

	/**
	 * ajax异步请求， 请求格式是json
	 * @param key
	 * @return true:OK false:NG
	 */
	@RequestMapping(value = "/checkUser", method = { RequestMethod.POST })
	@ResponseBody
	public boolean checkUser(String key) {
		return userDao.check(key);
	}

}
