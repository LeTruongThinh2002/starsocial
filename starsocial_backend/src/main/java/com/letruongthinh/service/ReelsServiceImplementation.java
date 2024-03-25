package com.letruongthinh.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.letruongthinh.models.Reels;
import com.letruongthinh.models.User;
import com.letruongthinh.repository.ReelsRepository;

@Service
public class ReelsServiceImplementation implements ReelsService {

    @Autowired
    private ReelsRepository reelsRepository;

    @Autowired
    private UserService userService;

    @Override
    public Reels createReel(Reels reel, User user) {
        Reels newReel=new Reels();
        
        newReel.setTitle(reel.getTitle());
        newReel.setUser(user);
        newReel.setVideo(reel.getVideo());

        return reelsRepository.save(newReel);
        
    }

    @Override
    public List<Reels> findAllReels() {
        List<Reels> reels = reelsRepository.findAll();

        return reels;
    }

    @Override
    public List<Reels> findUsersReel(Integer userId) throws Exception {
        userService.findUserById(userId);
        return reelsRepository.findByUserId(userId);
    }

}
