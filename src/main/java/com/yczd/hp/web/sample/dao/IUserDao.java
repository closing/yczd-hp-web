package com.yczd.hp.web.sample.dao;

import com.yczd.hp.web.sample.daodata.User;

public interface IUserDao {
	public User selectByPrimaryKey(int id);

	public int insert(User user);

	public int update(User user);

	public int delete(User user);

	public int count(int id);
}
