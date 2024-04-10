package com.letruongthinh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.letruongthinh.models.Chat;
import com.letruongthinh.models.User;
import com.letruongthinh.request.CreateChatRequest;
import com.letruongthinh.service.ChatService;
import com.letruongthinh.service.UserService;

@RestController
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/chats")
    public Chat createChat(@RequestHeader("Authorization") String jwt,@RequestBody CreateChatRequest req) throws Exception{
        User reqUser=userService.findUserByJwt(jwt);
        User user2=userService.findUserById(req.getUserId());
        
        Chat chat=chatService.createChat(reqUser, user2);
        return chat;
    }

    @GetMapping("/api/chats")
    public List<Chat> findUsersChat(@RequestHeader("Authorization") String jwt){
        User user= userService.findUserByJwt(jwt);
       
        List<Chat> chats=chatService.findChatByUsersId(user.getId());
        return chats;
    }

    @DeleteMapping("/api/chats/{chatId}")
    public String deleteChat(@RequestHeader("Authorization") String jwt,@PathVariable Integer chatId) throws Exception{
        User reqUser=userService.findUserByJwt(jwt);
        
        String message=chatService.deleteChat(chatId, reqUser);
        return message;
    }
}
