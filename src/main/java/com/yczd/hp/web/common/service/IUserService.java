package com.yczd.hp.web.common.service;

import com.yczd.hp.web.common.daodata.User;

public interface IUserService {
	public User getUserById(int id);

	public int insert(User user);

	public int update(User user);


}
