package com.yczd.hp.web.sample.service;

import com.yczd.hp.web.sample.daodata.User;

public interface IUserService {
	public User getUserById(int id);

	public int insert(User user);

	public int update(User user);
 

}
