package com.letruongthinh.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.letruongthinh.config.JwtProvider;
import com.letruongthinh.exceptions.UserException;
import com.letruongthinh.models.User;
import com.letruongthinh.repository.PostRepository;
import com.letruongthinh.repository.UserRepository;

import io.jsonwebtoken.lang.Collections;

@Service
public class UserServiceImplementation implements UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	PostRepository postRepository;
	
	@Override
	public User registerUser(User user) {
		User newUser=new User();
		newUser.setId(user.getId());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setEmail(user.getEmail());
		newUser.setPassword(user.getPassword());
	
		User savedUser=userRepository.save(newUser);
		
		return savedUser;
	}

	@Override
	public User findUserById(Integer userId) throws UserException {
		Optional<User> user=userRepository.findById(userId);
		
		if(user.isPresent()) {
			return user.get();
		}
		
		throw new UserException("user not exists with userId: "+userId);
	}

	@Override
	public User findUserByEmail(String email) {
		User user=userRepository.findByEmail(email);
		
		return user;
	}

	@Override
	public User followUser(Integer reqUserId, Integer userId2) throws UserException {

		User reqUser = findUserById(reqUserId);
		
		User user2 = findUserById(userId2);

		if(reqUser==user2){
			return reqUser;
		}
		
		if(!user2.getFollowers().contains(reqUser.getId())&&!reqUser.getFollowings().contains(user2.getId())) {
			user2.getFollowers().add(reqUser.getId());
			reqUser.getFollowings().add(user2.getId());
		}else {
			user2.getFollowers().remove(reqUser.getId());
			reqUser.getFollowings().remove(user2.getId());
		}
		userRepository.save(reqUser);
		userRepository.save(user2);
		
		return reqUser;
	}

	@Override
	public User updateUser(User user, Integer userId) throws UserException {
			Optional<User> user1 = userRepository.findById(userId);
			
			if(user1.isEmpty()) {
				throw new UserException("user not exists with id: "+userId);
			}
			
			User oldUser = user1.get();
			
			if(user.getFirstName()!=null) {
				oldUser.setFirstName(user.getFirstName());
			}
			if(user.getLastName()!=null) {
				oldUser.setLastName(user.getLastName());
			}
			if(user.getEmail()!=null) {
				oldUser.setEmail(user.getEmail());
			}
			if(user.getGender()!=null) {
				oldUser.setGender(user.getGender());
			}
			if(user.getAvatar()!=null) {
				oldUser.setAvatar(user.getAvatar());
			}
			
			User updated= userRepository.save(oldUser);
			
			return updated;
	}

	@Override
	public List<User> searchUser(String query, Integer userId) {
		if(StringUtils.hasText(query.trim())){
		return userRepository.searchUser(query, userId);
	}
		else{
			return Collections.emptyList();
		}
	}

	@Override
	public String deleteUser(Integer userId) throws UserException{
		Optional<User> user=userRepository.findById(userId);
		if(user.isEmpty()) {
			throw new UserException("user not exists with id: "+userId);
		}
		
		userRepository.delete(user.get());
		
		return "user deleted successfully with id="+userId+" !";
	}

	@Override
	public User findUserByJwt(String jwt) {
		String email = JwtProvider.getEmailFromJwtToken(jwt);
		
		User user=userRepository.findByEmail(email);
		
		return user;
	}
}
