package com.yczd.hp.web.common.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yczd.hp.web.common.dao.IAreaDao;
import com.yczd.hp.web.common.daodata.Area;

@Service("areaService")
public class AreaServiceImpl implements IAreaService {

	@Resource
	private IAreaDao areaDao;

	@Override
	public List<Area> getListOfArea(int id) {
		return areaDao.getListOfArea(id);
	}

}
