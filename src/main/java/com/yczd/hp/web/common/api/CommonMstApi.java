package com.yczd.hp.web.common.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/commonapi")
public class CommonMstApi {

	/**
	 * ajax异步请求， 请求格式是json
	 */
	@RequestMapping(value = "/listState", method = { RequestMethod.POST })
	@ResponseBody
	public Map<String, Map<String, String>> listState(@RequestBody String id) {
		// 返回数据的Map集合
		Map<String, Map<String, String>> result = new HashMap<String, Map<String, String>>();
		Map<String, String> items = new HashMap<String, String>();
		items.put("id", "id1");
		items.put("text", "text1");
		// 返回请求的username
		result.put("item", items);
		return result;
	}

}
