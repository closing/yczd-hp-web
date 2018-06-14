package com.yczd.hp.web.signup.controller;

import java.sql.Date;
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
import com.yczd.hp.web.common.daodata.User;
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

		// person :10
		// supplyer:20
		// company :21
		// station :30
		// courier :40

		if (StringUtils.isEmpty(type) || (!"company".equals(type) && !"person".equals(type) && !"courier".equals(type)
				&& !"station".equals(type) && !"supplyer".equals(type))) {

			type = "person";
		}
		return "wechat/signup_" + type;

	}

	@RequestMapping(value = "/{type}", method = RequestMethod.POST)
	public String signup(@Valid UserForm form, Errors error, Model model, @PathVariable("type") String type) {
		// Type
		if (StringUtils.isEmpty(type) || (!"company".equals(type) && !"person".equals(type) && !"courier".equals(type)
				&& !"station".equals(type) && !"supplyer".equals(type))) {
			return "redirect:/signup/person";
		}
		User user = new User();
		BeanUtils.copyProperties(form, user);
		if ("company".equals(type)) {
			user.setUserType("21");// 企业:21
		} else if ("supplyer".equals(type)) {
			user.setUserType("20");// 个人商户:20
		} else if ("station".equals(type)) {
			user.setUserType("30");// 服务站:30
		} else if ("courier".equals(type)) {
			user.setUserType("40");// 配送员:40
		} else {
			user.setUserType("10"); // 个人:10
		}
		user.setEmail(StringUtils.isEmpty(form.getEmail()) ? null : form.getEmail());
		user.setName(StringUtils.isEmpty(form.getName()) ? null : form.getName());
		user.setBirthday(StringUtils.isEmpty(form.getBirthday()) ? null : Date.valueOf(form.getBirthday()));
		user.setAddress1(StringUtils.isEmpty(form.getAddress1()) ? null : Integer.valueOf(form.getAddress1()));
		user.setAddress2(StringUtils.isEmpty(form.getAddress2()) ? null : Integer.valueOf(form.getAddress2()));
		user.setAddress3(StringUtils.isEmpty(form.getAddress3()) ? null : Integer.valueOf(form.getAddress3()));
		user.setAddress4(StringUtils.isEmpty(form.getAddress4()) ? null : form.getAddress4());
		user.setSubscribe(StringUtils.isEmpty(form.getSubscribe()) ? false : Boolean.valueOf(form.getSubscribe()));

		userService.insert(user);
		return "wechat/signup_success";
	}
}
