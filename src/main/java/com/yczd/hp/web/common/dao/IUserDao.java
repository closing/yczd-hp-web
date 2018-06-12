package com.yczd.hp.web.common.dao;

import com.yczd.hp.web.common.daodata.User;

public interface IUserDao {
	public User selectByPrimaryKey(int id);

	public int insert(User user);

	public int update(User user);

	public int delete(User user);

	public int count(int id);
}
