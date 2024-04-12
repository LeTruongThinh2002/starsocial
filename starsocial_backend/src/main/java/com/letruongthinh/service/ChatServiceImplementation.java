package com.letruongthinh.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.letruongthinh.models.Chat;
import com.letruongthinh.models.Message;
import com.letruongthinh.models.User;
import com.letruongthinh.repository.ChatRepository;
import com.letruongthinh.repository.MessageRepository;
import com.letruongthinh.request.EditChatImage;

@Service
public class ChatServiceImplementation implements ChatService {

    private Cloudinary cloudinary;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private MessageRepository messageRepository;

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

    @Override
    public String deleteChat(Integer chatId, User reqUser) {
            Optional<Chat> chat= chatRepository.findById(chatId);

            if(chat.isPresent()){
                Chat chats = chat.get();
                List<User> usersInChat = chats.getUsers();
                if(usersInChat.contains(reqUser)){
                    List<Message> messages = chats.getMessages();
                    messageRepository.deleteAll(messages);
                    chatRepository.delete(chats);
                    return "delete chat successfully!";
                }else{
                    return "You do not exist in this chat!";
                }
            }else{
                return "chat not found for id " + chatId;
            }
    }

    @Override
    public Chat editChatImage(EditChatImage reqChat, User reqUser) throws Exception {
        
        Optional<Chat> chatOpt = chatRepository.findById(reqChat.getChatId());

        if(chatOpt.isPresent()){
            Chat chat = chatOpt.get();
            List<User> users = chat.getUsers();
            if(users.contains(reqUser)){

                if(chat.getChat_image()==null){
                    chat.setChat_image(reqChat.getChat_image());
                    chatRepository.save(chat);
                    return chat;
                } else {
                    String[] parts = chat.getChat_image().split("/");
                    String fileName = parts[parts.length - 1];
                    String publicId = fileName.split("\\.")[0]; // Lấy phần trước dấu chấm là public ID

                    cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", "dd0tbhnzl",
                    "api_key", "234868554266692",
                    "api_secret", "fy7mChtdmnKGQ6MVOxldJdSyqAI"
                    ));

                    if(!publicId.isEmpty()){
                        cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", "image"));
                    }

                    chat.setChat_image(reqChat.getChat_image());
                    chatRepository.save(chat);
                    return chat;
                }
            }else {
                throw new Exception("You do not have permission to edit this chat.");
            }
        }else{
            throw new Exception("chat not found for id " + reqChat.getChatId());
        }   
    }

    

}
