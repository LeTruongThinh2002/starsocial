package com.letruongthinh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.letruongthinh.exceptions.UserException;
import com.letruongthinh.models.User;
import com.letruongthinh.repository.UserRepository;
import com.letruongthinh.service.UserService;

@RestController
public class UserController {
	
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserService userService;
	
	@GetMapping("/api/users")
	public List<User> getUsers() {
		
		List<User> users =userRepository.findAll();
		
		return users;
	}
	
	@GetMapping("/api/users/{userId}")
	public User getUserById(@PathVariable("userId") Integer id) throws UserException {
		User user =	userService.findUserById(id);
		return user;
	}
	
	
	
	@PutMapping("/api/users")
	public User updateUser(@RequestBody User user,@RequestHeader("Authorization")String jwt) throws UserException {
		
		User reqUser=userService.findUserByJwt(jwt);
		
		User updatedUser = userService.updateUser(user, reqUser.getId());

		return updatedUser;
	}
	
	@PutMapping("/api/users/follow/{userId2}")
	public User followUserHandler(@RequestHeader("Authorization")String jwt, @PathVariable Integer userId2) throws UserException {
		
		User reqUser=userService.findUserByJwt(jwt);
		
		User user=userService.followUser(reqUser.getId(), userId2);
		return user;
	}
	
	@GetMapping("/api/users/search")
	public List<User>searchUser(@RequestParam("query") String query){
		List<User> users=userService.searchUser(query);
		return users;
	}
	
	@DeleteMapping("/api/users/{userId}")
	public String deleteUser(@PathVariable("userId") Integer userId) throws UserException {
		String message = userService.deleteUser(userId);
		return message;
	}

	@GetMapping("/api/users/profile")
	public User getUserFromToken(@RequestHeader("Authorization")String jwt){

		User user=userService.findUserByJwt(jwt);

		user.setPassword(null);

		return user;
	}
}
