package com.yczd.hp.web.signup.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.yczd.hp.web.common.daodata.Area;
import com.yczd.hp.web.common.formdata.AreaForm;
import com.yczd.hp.web.common.service.IAreaService;

@Controller
@RequestMapping("/signup")
public class SignupController {

	@Resource
	IAreaService areaService;

	@RequestMapping(value = { "/", "" }, method = RequestMethod.GET)
	public String signupForm(Model model, HttpServletRequest req) {
		model.addAttribute("contextPath", req.getContextPath());
		List<Area> list = areaService.getListOfArea(0);
		List<AreaForm> items = new ArrayList<AreaForm>();
		AreaForm item;
		for (Area area : list) {
			item = new AreaForm();
			BeanUtils.copyProperties(area, item);
			items.add(item);
		}
		model.addAttribute("areaList", items);
		return "/signup";

	}

	@RequestMapping(method = RequestMethod.POST)
	public String signup(Model model) {
		return "/signupsuccess";

	}
}
