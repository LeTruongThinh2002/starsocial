package com.letruongthinh.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.letruongthinh.config.JwtProvider;
import com.letruongthinh.exceptions.UserException;
import com.letruongthinh.models.User;
import com.letruongthinh.repository.UserRepository;
import com.letruongthinh.request.ResetPassword;
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
	public User updateUser(@RequestBody User user,@RequestHeader("Authorization")String jwt) throws UserException, IOException {
		
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
	public List<User>searchUser(@RequestParam("query") String query, @RequestHeader("Authorization")String jwt){
		User reqUser=userService.findUserByJwt(jwt);
		
		List<User> users=userService.searchUser(query, reqUser.getId());
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

	@GetMapping("/api/users/suggest")
	public List<User> suggestUser(@RequestHeader("Authorization")String jwt){

		User user=userService.findUserByJwt(jwt);
		
		List<User> users=userService.suggestUsers(user);

		return users;
		
	}

	@PostMapping("/resetPassword")
	public String resetPassword(@RequestBody ResetPassword resetPwdRequest) throws Exception {
        String email = JwtProvider.getEmailFromJwtFgPwdToken(resetPwdRequest.getToken());
		if(email.contains("@")){
        	String res = userService.resetPassword(email, resetPwdRequest.getPassword(), resetPwdRequest.getConfirmPassword());
			return res;
		} else {
			return email;
		}
    }
}
