package com.letruongthinh.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.letruongthinh.config.JwtProvider;
import com.letruongthinh.models.User;
import com.letruongthinh.request.EmailRequest;
import com.letruongthinh.request.FgPwdEmail;
import com.letruongthinh.service.EmailService;
import com.letruongthinh.service.UserService;

import jakarta.mail.MessagingException;

@RestController
public class EmailController {

    @Autowired
    EmailService emailService;

    @Autowired
    UserService userService;

    @PostMapping("/api/sendEmail")
    public void sendEmail(@RequestBody EmailRequest request) throws MessagingException {
        emailService.sendEmail(request.getTo(), request.getSubject(), request.getText());
    }

    @PostMapping("/forgotPassword")
    public String forgotPassword(@RequestBody FgPwdEmail email) throws Exception {
        User user = userService.findUserByEmail(email.getEmail());
        if(user==null){
            throw new Exception("User not found!"+email);
        }
        String token = JwtProvider.generateTokenFgPwd(user);

        // Prepare HTML content with the token
    String emailContent = "<!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "<head>\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
    "    <title>Password Reset</title>\n" +
    "</head>\n" +
    "<body style=\"font-family: Arial, sans-serif;\">\n" +
    "    <div style=\"max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;\">\n" +
    "        <h2 style=\"text-align: center; color: #333;\">Password Reset Request</h2>\n" +
    "        <p>Hello,</p>\n" +
    "        <p>You have requested to reset your password for your account.</p>\n" +
    "        <p>Please click the link below to reset your password:</p>\n" +
    "        <p><a href=\"http://localhost:5173/resetPassword/" + token + "\" style=\"display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;\">Reset Password</a></p>\n" +
    "        <p>If you did not request a password reset, you can safely ignore this email.</p>\n" +
    "        <p>Thank you!</p>\n" +
    "    </div>\n" +
    "</body>\n" +
    "</html>";
    String subject = "✨Starsocial - Forgot password!";

        emailService.sendEmail(
            user.getEmail(), 
            subject,
            emailContent
            );
        return "Send a successful password change request, please check your email!";
    }

}
