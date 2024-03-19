package com.letruongthinh.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.letruongthinh.models.User;
import com.letruongthinh.repository.UserRepository;
import com.letruongthinh.service.UserService;

@RestController
public class UserController {
	
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserService userService;
	
	@PostMapping("/users")
	public User createUser(@RequestBody User user) {
		
		User savedUser=userService.registerUser(user);
		
		return savedUser;
	}
	
	@GetMapping("/users")
	public List<User> getUsers() {
		
		List<User> users =userRepository.findAll();
		
		return users;
	}
	
	@GetMapping("/users/{userId}")
	public User getUserById(@PathVariable("userId") Integer id) throws Exception {
		User user =	userService.findUserById(id);
		return user;
	}
	
	
	
	@PutMapping("/users/{userId}")
	public User updateUser(@RequestBody User user, @PathVariable Integer userId) throws Exception {
		User updatedUser = userService.updateUser(user, userId);
		return updatedUser;
	}
	
	@PutMapping("/users/follow/{userId1}/{userId2}")
	public User followUserHandler(@PathVariable Integer userId1, @PathVariable Integer userId2) throws Exception {
		User user=userService.followUser(userId1, userId2);
		return user;
	}
	
	@GetMapping("/users/search")
	public List<User>searchUser(@RequestParam("query") String query){
		List<User> users=userService.searchUser(query);
		return users;
	}
	
	@DeleteMapping("users/{userId}")
	public String deleteUser(@PathVariable("userId") Integer userId) throws Exception {
		Optional<User> user=userRepository.findById(userId);
		if(user.isEmpty()) {
			throw new Exception("user not exists with id: "+userId);
		}
		userRepository.delete(user.get());
		
		return "user deleted successfully with id="+userId+" !";
	}
}
