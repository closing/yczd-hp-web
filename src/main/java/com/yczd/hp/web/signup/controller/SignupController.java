package com.yczd.hp.web.signup.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/signup")
public class SignupController {

	@RequestMapping(method = RequestMethod.GET)
	public String signupForm(Model model) {
		return "/signup";

	}

	@RequestMapping(method = RequestMethod.POST)
	public String signup(Model model) {
		return "/signup";

	}
}
