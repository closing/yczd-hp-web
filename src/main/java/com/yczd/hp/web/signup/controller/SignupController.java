package com.yczd.hp.web.signup.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/signup")
public class SignupController {

	@RequestMapping(value = { "/", "" }, method = RequestMethod.GET)
	public String signupForm(Model model, HttpServletRequest req) {
		model.addAttribute("contextPath", req.getContextPath());
		return "/signup";

	}

	@RequestMapping(method = RequestMethod.POST)
	public String signup(Model model) {
		return "/signupsuccess";

	}
}
