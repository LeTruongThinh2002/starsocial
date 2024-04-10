package com.letruongthinh.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.letruongthinh.config.JwtProvider;
import com.letruongthinh.models.User;
import com.letruongthinh.repository.UserRepository;
import com.letruongthinh.request.LoginRequest;
import com.letruongthinh.request.SignUpRequest;
import com.letruongthinh.response.AuthResponse;
import com.letruongthinh.service.CustomerUserDetailsService;
import com.letruongthinh.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerUserDetailsService customerUserDetails;

    // /auth/signup
    @PostMapping("/signup")
	public AuthResponse createUser(@RequestBody SignUpRequest user) throws Exception {

        User isExist = userRepository.findByEmail(user.getEmail());

        if (isExist!= null) {
            throw new Exception("This email already exists");
        }


		User newUser=new User();
		// newUser.setId(user.getId());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setEmail(user.getEmail());
        newUser.setGender(user.getGender());
        newUser.setAvatar(user.getAvatar());
        newUser.setBackground("https://cdn.pixabay.com/photo/2019/10/20/14/16/milky-way-4563764_640.jpg");
		newUser.setPassword(passwordEncoder.encode(user.getPassword()));
	
		User savedUser=userRepository.save(newUser);
		
        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());

        String token = JwtProvider.generateToken(authentication);

        AuthResponse response =new AuthResponse(token,"Register successfully");
		return response;
	}

    @PostMapping("/signin")
	public AuthResponse signin(@RequestBody LoginRequest loginRequest) throws Exception {
        Authentication authentication = authenticate(loginRequest.getEmail(),loginRequest.getPassword());

        String token = JwtProvider.generateToken(authentication);

        AuthResponse response =new AuthResponse(token,"Login successfully");
		return response;
    }

   

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = customerUserDetails.loadUserByUsername(email);

        if(userDetails==null){
            throw new BadCredentialsException("invalid username");
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("password does not match!");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
    }
}
