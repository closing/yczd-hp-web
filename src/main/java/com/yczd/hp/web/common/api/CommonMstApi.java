package com.yczd.hp.web.common.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yczd.hp.web.common.daodata.Area;
import com.yczd.hp.web.common.formdata.AreaForm;
import com.yczd.hp.web.common.service.IAreaService;

@Controller
@RequestMapping("/commonapi")
public class CommonMstApi {

	@Resource
	IAreaService areaService;

	/**
	 * ajax异步请求， 请求格式是json
	 */
	@RequestMapping(value = "/listArea", method = { RequestMethod.POST })
	@ResponseBody
	public List<AreaForm> listArea(String id) {
		// 返回数据的Map集合
		List<Area> list = areaService.getListOfArea(Integer.parseInt(id));
		List<AreaForm> items = new ArrayList<AreaForm>();
		AreaForm item;
		for (Area area : list) {
			item = new AreaForm();
			BeanUtils.copyProperties(area, item);
			items.add(item);
		}
		return items;
	}

}
