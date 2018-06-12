package com.yczd.hp.web.sample.controller;

import javax.annotation.Resource;
//import javax.validation.Valid;
import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.yczd.hp.web.common.daodata.User;
import com.yczd.hp.web.common.formdata.UserForm;
import com.yczd.hp.web.common.service.IUserService;

@Controller
@RequestMapping("/user")
public class UserController {

	@Resource
	IUserService userService;

	@RequestMapping(value = { "/input", "" }, method = { RequestMethod.GET, RequestMethod.POST })
	public String input(Model model) {
		model.addAttribute("user", new UserForm());
		return "/input";

	}

	@RequestMapping(value = "/output", method = { RequestMethod.GET, RequestMethod.POST })
	public String output(@Valid UserForm form, Errors error, Model model) {
		if (error.hasErrors()) {
			model.addAttribute("user", form);
			return "/input";
		}
		User user = new User();
		BeanUtils.copyProperties(form, user);
		user.setId(Integer.parseInt(form.getId()));
		userService.insert(user);

		model.addAttribute("user", form);
		return "/output";
	}
}
