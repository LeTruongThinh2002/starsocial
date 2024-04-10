package com.letruongthinh.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.letruongthinh.config.JwtProvider;
import com.letruongthinh.exceptions.UserException;
import com.letruongthinh.models.User;
import com.letruongthinh.repository.PostRepository;
import com.letruongthinh.repository.UserRepository;

import io.jsonwebtoken.lang.Collections;

@Service
public class UserServiceImplementation implements UserService {

	private Cloudinary cloudinary;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PostRepository postRepository;

	@Autowired
    private PasswordEncoder passwordEncoder;
	
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
	public User updateUser(User user, Integer userId) throws UserException, IOException {
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
			if(user.getGender()!=null) {
				oldUser.setGender(user.getGender());
			}
			if(!oldUser.getAvatar().equals("https://cdn.pixabay.com/animation/2022/12/05/15/23/15-23-06-837_512.gif")&&
			!oldUser.getAvatar().equals("https://cdn.pixabay.com/animation/2023/12/01/11/58/11-58-39-702_512.gif")){
				String avatar = oldUser.getAvatar();
				String[] parts = avatar.split("/");
            	String fileName = parts[parts.length - 1];
            	String publicId = fileName.split("\\.")[0];
				try {
				cloudinary = new Cloudinary(ObjectUtils.asMap(
					"cloud_name", "dd0tbhnzl",
        "api_key", "234868554266692",
        "api_secret", "fy7mChtdmnKGQ6MVOxldJdSyqAI"
				));
				cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", "image"));
			} catch (IOException e) {
				// Handle Cloudinary IO exception
				e.printStackTrace(); // Or log the error
			}
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

	@Override
	public String resetPassword(String email, String password, String confirmPassword) throws UserException {
		User user = userRepository.findByEmail(email);

		if(user==null){
			throw new UserException("Could not find user with email " + email);
		}
		if(!password.equals(confirmPassword)){
			throw new UserException("Passwords do not match "+ password+" and " +confirmPassword);
		}
		
        user.setPassword(passwordEncoder.encode(password));
		userRepository.save(user);
		
        return "Password reset successfully with email: "+email+" !";
	}

	@Override
	public List<User> suggestUsers(User user) {
		List<User> topUsers = userRepository.findAllByOrderByFollowersDesc();
		topUsers.removeIf(u->u.getId().equals(user.getId()));

		List<User> suggestUsers = topUsers.stream()
		.limit(5)
		.collect(Collectors.toList());

		return suggestUsers;
	}
}
