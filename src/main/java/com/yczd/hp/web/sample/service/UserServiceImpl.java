package com.yczd.hp.web.sample.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yczd.hp.web.sample.dao.IUserDao;
import com.yczd.hp.web.sample.daodata.User;

@Service("userService")
public class UserServiceImpl implements IUserService {

	@Resource
	private IUserDao userDao;

	@Override
	public User getUserById(int id) {
		return this.userDao.selectByPrimaryKey(id);

	}

	@Override
	public int insert(User user) {
		return userDao.insert(user);
	}

	@Override
	public int update(User user) {
		return userDao.update(user);
	}

}
