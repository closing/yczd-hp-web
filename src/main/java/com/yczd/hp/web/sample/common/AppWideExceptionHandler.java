package com.yczd.hp.web.sample.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;

@ControllerAdvice
@RequestMapping("exception")
public class AppWideExceptionHandler {

	@ExceptionHandler(Throwable.class)
	public String ExceptionHandler(Exception e) {
		Logger log = LoggerFactory.getLogger(AppWideExceptionHandler.class);
		log.error(e.getMessage());
		return "error";
	}

}
