package com.letruongthinh.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
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

@Service
public class MessageServiceImplementation implements MessageService{

    private Cloudinary cloudinary;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatRepository chatRepository;

    @Override
    public Message createMessage(User user, Integer chatId, Message req) throws Exception {
        Message message=new Message();

        Chat chat=chatService.findChatById(chatId);

        message.setChat(chat);
        message.setContent(req.getContent());
        message.setImage(req.getImage());
        message.setVideo(req.getVideo());
        message.setUser(user);
        message.setTimestamp(LocalDateTime.now());

        Message savedMessage=messageRepository.save(message);

        chat.getMessages().add(message);
        chatRepository.save(chat);
        return savedMessage;
    }

    @Override
    public List<Message> findChatsMessages(Integer chatId) throws Exception {
        Chat chat=chatService.findChatById(chatId);
        return messageRepository.findByChatId(chat.getId());
    }

    @Override
    public String deleteMessage(User user, Integer messageId) throws Exception {
        
        Optional<Message> message = messageRepository.findById(messageId);

        if(message.isPresent()){
            Message msg = message.get();
            if(msg.getUser().equals(user)){

                // Xóa hình ảnh và video từ Cloudinary
                List<String> images = new ArrayList<>(msg.getImage());
                String videos = msg.getVideo();
                List<String> publicIdImages = new ArrayList<>();
                String publicIdVideos = null;
                if(!images.isEmpty()){
                    for (String url : images) {
                        if (url != null) {
                        String[] parts = url.split("/");
                        String fileName = parts[parts.length - 1];
                        String publicId = fileName.split("\\.")[0]; // Lấy phần trước dấu chấm là public ID
                        publicIdImages.add(publicId);
                        }
                    }
                }
                if(!videos.isEmpty()){
                    if (videos != null) {
                    String[] parts = videos.split("/");
                    String fileName = parts[parts.length - 1];
                    String publicId = fileName.split("\\.")[0]; // Lấy phần trước dấu chấm là public ID
                    publicIdVideos = publicId;
                    }
                }

                cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", "dd0tbhnzl",
                    "api_key", "234868554266692",
                    "api_secret", "fy7mChtdmnKGQ6MVOxldJdSyqAI"
                ));
                if(!publicIdImages.isEmpty()){
                    for (String file : publicIdImages) {
                        cloudinary.uploader().destroy(file, ObjectUtils.asMap("resource_type", "image"));
                    }
                }
                if(!publicIdVideos.isEmpty()){
                    cloudinary.uploader().destroy(publicIdVideos, ObjectUtils.asMap("resource_type", "video"));
                }
                messageRepository.delete(msg);

            } else {
                throw new Exception("You are not the owner of this message!");
            }
        } else {
            throw new Exception("Message not found!");
        }

        return "Message deleted!";

    }

}
