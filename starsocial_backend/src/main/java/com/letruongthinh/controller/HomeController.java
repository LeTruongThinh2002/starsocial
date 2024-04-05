package com.letruongthinh.controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HomeController {


	@GetMapping("/home")
	public String homeControllerHandler() throws IOException {

		
		return "this is home Controller";
	}
	
//	@PutMapping
//	@PostMapping
//	@DeleteMapping
}
