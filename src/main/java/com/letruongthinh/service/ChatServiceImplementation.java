package com.letruongthinh.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.letruongthinh.models.Chat;
import com.letruongthinh.models.User;
import com.letruongthinh.repository.ChatRepository;

@Service
public class ChatServiceImplementation implements ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Override
    public Chat createChat(User reqUser, User user) {
        Chat isExist = chatRepository.findChatByUsersId(user, reqUser);

        if(isExist!=null) {
            return isExist;
        }

        Chat chat=new Chat();
        chat.getUsers().add(user);
        chat.getUsers().add(reqUser);
        chat.setTimestamp(LocalDateTime.now());

        return chatRepository.save(chat);
    }

    @Override
    public Chat findChatById(Integer chatId) throws Exception {
        Optional<Chat> opt=chatRepository.findById(chatId);

        if(opt.isEmpty()){
            throw new Exception("chat not found for id " + chatId);
        }
        
        return opt.get();
    }

    @Override
    public List<Chat> findChatByUsersId(Integer userId) {
        
        return chatRepository.findByUsersId(userId);
    }

}
