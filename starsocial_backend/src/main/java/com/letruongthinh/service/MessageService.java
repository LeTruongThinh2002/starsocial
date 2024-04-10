package com.letruongthinh.service;

import java.util.List;

import com.letruongthinh.models.Message;
import com.letruongthinh.models.User;

public interface MessageService {

    public Message createMessage(User user, Integer chatId, Message req) throws Exception;

    public List<Message> findChatsMessages(Integer chatId) throws Exception;

    public String deleteMessage(User user, Integer messageId) throws Exception;
}
