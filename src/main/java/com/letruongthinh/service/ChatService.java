package com.letruongthinh.service;

import java.util.List;

import com.letruongthinh.models.Chat;
import com.letruongthinh.models.User;

public interface ChatService {

    public Chat createChat(User reqUser, User user2);

    public Chat findChatById(Integer chatId) throws Exception;

    public List<Chat> findChatByUsersId(Integer userId);

}
