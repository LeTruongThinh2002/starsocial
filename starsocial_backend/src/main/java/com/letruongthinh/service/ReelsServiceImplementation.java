package com.letruongthinh.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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
        newReel.setCreateAt(LocalDateTime.now());

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

    @Override
    public String deleteReel(Integer reelId, User user) throws Exception {
    
        Optional<Reels> reel = reelsRepository.findById(reelId);
        if (!reel.isPresent()) {
            throw new Exception("Reel not exists with id: " + reelId);
        }
        Reels oldReel= reel.get();
        if (!oldReel.getUser().equals(user)) {
            throw new Exception("you are not the owner of this reel");
        }
        reelsRepository.delete(oldReel);
            return "reel deleted";

    }

    @Override
    public Reels likeReel(Integer reelId, Integer userId) throws Exception {
        Optional<Reels> reel = reelsRepository.findById(reelId);
        if(!reel.isPresent()){
            throw new Exception("Reel not exists with id: " + reelId);
        }
        Reels rel = reel.get();

        if(rel.getLiked().contains(userId)){
            rel.getLiked().remove(userId);
        }else{
            rel.getLiked().add(userId);
        }

        return reelsRepository.save(rel);
    }

}
