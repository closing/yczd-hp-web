package com.yczd.hp.web.common.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;
import org.springframework.stereotype.Repository;

import com.yczd.hp.web.common.daodata.Area;

@Repository
@Scope("prototype")
public class AreaDao implements IAreaDao {

	@Resource
	NamedParameterJdbcOperations jdbcTemplate;

	// 查询SQL
	private static final String QUERY_SQL = "select base_areaid as code,name as name from base_area where parentid = :id and delflg = false order by vieworder";

	@Override
	public List<Area> getListOfArea(int id) {
		Map<String, Integer> paramMap = new HashMap<>();
		paramMap.put("id", id);
		try {
			return jdbcTemplate.query(QUERY_SQL, paramMap, new BeanPropertyRowMapper<Area>(Area.class));
		} catch (EmptyResultDataAccessException ex) {
			return null;
		}
	}

}
