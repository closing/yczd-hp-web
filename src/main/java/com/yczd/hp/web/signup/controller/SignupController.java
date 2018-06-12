package com.yczd.hp.web.signup.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.thymeleaf.util.StringUtils;

import com.yczd.hp.web.common.daodata.Area;
import com.yczd.hp.web.common.formdata.AreaForm;
import com.yczd.hp.web.common.formdata.UserForm;
import com.yczd.hp.web.common.service.IAreaService;
import com.yczd.hp.web.common.service.IUserService;

@Controller
@RequestMapping("/signup")
public class SignupController {

	@Resource
	IAreaService areaService;
	@Resource
	IUserService userService;

	@RequestMapping(value = { "/{type}" }, method = RequestMethod.GET)
	public String signup(Model model, HttpServletRequest req, @PathVariable("type") String type) {

		model.addAttribute("contextPath", req.getContextPath());
		model.addAttribute("user", new UserForm());
		// DropdownList
		List<Area> list = areaService.getListOfArea(0);
		List<AreaForm> items = new ArrayList<AreaForm>();
		AreaForm item;
		for (Area area : list) {
			item = new AreaForm();
			BeanUtils.copyProperties(area, item);
			items.add(item);
		}
		model.addAttribute("areaList", items);

		// person  :10
		// supplyer:20
		// company :21
		// station :30
		// courier :40

		if (StringUtils.isEmpty(type) ||
				(!"company".equals(type) && !"person".equals(type) && !"courier".equals(type)
						&& !"station".equals(type) && !"supplyer".equals(type))) {

			type = "person";
		}
		return "wechat/signup_" + type;

	}

	@RequestMapping(value = "/{type}", method = RequestMethod.POST)
	public String signup(@Valid UserForm form, Errors error, Model model, @PathVariable("type") String type) {
		// Type
		if (StringUtils.isEmpty(type) ||
				(!"company".equals(type) && !"person".equals(type) && !"courier".equals(type)
						&& !"station".equals(type) && !"supplyer".equals(type))) {

			return "redirect:/signup/person";
		}

		return "wechat/signup_success";

	}
}
