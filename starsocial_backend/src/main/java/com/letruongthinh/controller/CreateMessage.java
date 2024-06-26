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

import com.letruongthinh.models.Message;
import com.letruongthinh.models.User;
import com.letruongthinh.service.MessageService;
import com.letruongthinh.service.UserService;

@RestController
public class CreateMessage {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/messages/chat/{chatId}")
    public Message createMessage(@RequestBody Message req,
    @RequestHeader("Authorization") String jwt,
    @PathVariable Integer chatId
    ) throws Exception{

        User user=userService.findUserByJwt(jwt);
        Message message = messageService.createMessage(user,chatId, req);

        return message;
    }

    @GetMapping("/api/messages/chat/{chatId}")
    public List<Message> findChatsMessage(
    @RequestHeader("Authorization") String jwt,
    @PathVariable Integer chatId
    ) throws Exception{

        User user=userService.findUserByJwt(jwt);
        List<Message> message = messageService.findChatsMessages(chatId);

        return message;
    }

    @DeleteMapping("/api/messages/{messageId}")
    public String deleteMessage(
    @RequestHeader("Authorization") String jwt,
    @PathVariable Integer messageId
    ) throws Exception{

        User user=userService.findUserByJwt(jwt);
        String msg = messageService.deleteMessage(user, messageId);

        return msg;
    }
}
