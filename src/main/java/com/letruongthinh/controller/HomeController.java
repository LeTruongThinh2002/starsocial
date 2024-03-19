package com.letruongthinh.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@SuppressWarnings("unused")
@RestController
public class HomeController {

	@GetMapping("/home")
	public String homeControllerHandler() {
		return "this is home Controller";
	}
	
//	@PutMapping
//	@PostMapping
//	@DeleteMapping
}
