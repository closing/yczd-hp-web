package com.yczd.hp.web.sample.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import com.yczd.hp.web.sample.daodata.User;

@Repository
@Scope("prototype")
public class UserDao implements IUserDao {

	@Resource
	NamedParameterJdbcOperations jdbcTemplate;

	// 查询SQL
	private static final String QUERY_SQL = "select username as username,id as id,email as email from user where id =:id";
	private static final String UPDATE_SQL = "update user set  username =:username, email = :email, password = :passowrd  where id = :id where id =:id";
	private static final String INSERT_SQL = "insert into user (id, username, email, password) values(:id, :userName, :email,:password)";
	private static final String DELETE_SQL = "delete from  user where id = :id";
	private static final String COUNT_SQL = "select count(id) as count from user where id = :id";

	//
	// 插入SQL
	// 更新SQL
	// 删除SQL
	// 查询件数
	@Override
	public User selectByPrimaryKey(int id) {
		Map<String, Integer> paramMap = new HashMap<>();
		paramMap.put("id", id);
		try {

			return jdbcTemplate.queryForObject(QUERY_SQL, paramMap, this::mapUser);
		} catch (EmptyResultDataAccessException ex) {
			return new User();
		}
	}

	@Override
	public int insert(User user) {
		return jdbcTemplate.update(INSERT_SQL, new BeanPropertySqlParameterSource(user));
	}

	private User mapUser(ResultSet rs, int row) throws SQLException {
		User user = new User();
		user.setId(rs.getInt("id"));
		user.setUserName(rs.getString("username"));
		return user;

	}

	@Override
	public int update(User user) {
		return jdbcTemplate.update(UPDATE_SQL, new BeanPropertySqlParameterSource(user));

	}

	@Override
	public int delete(User user) {

		return jdbcTemplate.update(DELETE_SQL, new BeanPropertySqlParameterSource(user));
	}

	@Override
	public int count(int id) {
		Map<String, Integer> paramMap = new HashMap<>();
		paramMap.put("id", id);
		return jdbcTemplate.queryForObject(COUNT_SQL, paramMap, Integer.class);
	}
}
