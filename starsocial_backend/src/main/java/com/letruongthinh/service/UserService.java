package com.letruongthinh.service;

import java.io.IOException;
import java.util.List;

import com.letruongthinh.exceptions.UserException;
import com.letruongthinh.models.User;

public interface UserService {
	
	public User registerUser(User user);
	
	public User findUserById(Integer userId) throws UserException;
	
	public User findUserByEmail(String email);
	
	public User followUser(Integer reqUser, Integer userId2) throws UserException;
	
	public User updateUser(User user, Integer userId) throws UserException, IOException;

	public User updateEmail(User user, Integer userId) throws UserException, IOException;
	
	public List<User>searchUser(String query, Integer userId);

	public String deleteUser(Integer userId) throws UserException;
	
	public User findUserByJwt(String jwt);

	public String resetPassword(String email, String password, String confirmPassword) throws UserException;

	public List<User> suggestUsers(User user);
}
