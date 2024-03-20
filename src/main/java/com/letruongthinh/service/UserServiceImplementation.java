package com.letruongthinh.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.letruongthinh.models.User;
import com.letruongthinh.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService {

	@Autowired
	UserRepository userRepository;
	
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
	public User findUserById(Integer userId) throws Exception {
		Optional<User> user=userRepository.findById(userId);
		
		if(user.isPresent()) {
			return user.get();
		}
		
		throw new Exception("user not exists with userId: "+userId);
	}

	@Override
	public User findUserByEmail(String email) {
		User user=userRepository.findByEmail(email);
		
		return user;
	}

	@Override
	public User followUser(Integer userId1, Integer userId2) throws Exception {

		User user1 = findUserById(userId1);
		
		User user2 = findUserById(userId2);

		if(user1==user2){
			return user1;
		}
		
		if(!user2.getFollowers().contains(user1.getId())&&!user1.getFollowings().contains(user2.getId())) {
			user2.getFollowers().add(user1.getId());
			user1.getFollowings().add(user2.getId());
		}else {
			user2.getFollowers().remove(user1.getId());
			user1.getFollowings().remove(user2.getId());
		}
		userRepository.save(user1);
		userRepository.save(user2);
		
		return user1;
	}

	@Override
	public User updateUser(User user, Integer userId) throws Exception {
			Optional<User> user1 = userRepository.findById(userId);
			
			if(user1.isEmpty()) {
				throw new Exception("user not exists with id: "+userId);
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
			
			User updated= userRepository.save(oldUser);
			
			return updated;
	}

	@Override
	public List<User> searchUser(String query) {
		return userRepository.searchUser(query);
	}

	@Override
	public String deleteUser(Integer userId) throws Exception{
		Optional<User> user=userRepository.findById(userId);
		if(user.isEmpty()) {
			throw new Exception("user not exists with id: "+userId);
		}
		userRepository.delete(user.get());
		
		return "user deleted successfully with id="+userId+" !";
	}
}
