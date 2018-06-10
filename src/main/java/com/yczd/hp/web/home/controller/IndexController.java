package com.yczd.hp.web.home.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 首页
 * @author zhu
 *
 */
@Controller
@RequestMapping("/")
public class IndexController {

	@RequestMapping(value = { "index", "" }, method = GET)
	public String index() {
		return "index";
	}
}
