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
        // Kiểm tra xem user1 (reqUser) có theo dõi user2 không và ngược lại
        boolean user1FollowsUser2 = user.getFollowers().contains(reqUser.getId());
        boolean user2FollowsUser1 = reqUser.getFollowers().contains(user.getId());

        if (!user1FollowsUser2 || !user2FollowsUser1) {
            // Nếu không có mối quan hệ theo dõi lẫn nhau, không tạo cuộc trò chuyện
            throw new IllegalArgumentException("Both users must follow each other to create a chat.");
        }
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
