package com.yczd.hp.web.sample.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("exception")
public class ExceptionHandlerController {

	@RequestMapping(method = RequestMethod.GET)
	public String uploadForm() {
		return "uploadForm";
	}

}
