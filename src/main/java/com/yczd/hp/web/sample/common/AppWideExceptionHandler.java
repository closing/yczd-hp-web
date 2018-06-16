package com.yczd.hp.web.sample.common;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;

@ControllerAdvice

@RequestMapping("exception")
public class AppWideExceptionHandler {

	@ExceptionHandler(Throwable.class)
	public String ExceptionHandler() {
		return "error";
	}

}
