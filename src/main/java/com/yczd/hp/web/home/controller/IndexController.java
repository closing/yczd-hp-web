package com.yczd.hp.web.home.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class IndexController {
	@RequestMapping(value = { "", "index" }, method = { RequestMethod.GET, RequestMethod.POST })
	public String input(Model model) {
		return "signup/signup_person";
	}
}
