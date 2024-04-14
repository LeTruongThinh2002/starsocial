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

import com.letruongthinh.models.Reels;
import com.letruongthinh.models.User;
import com.letruongthinh.service.ReelsService;
import com.letruongthinh.service.UserService;

@RestController
public class ReelsController {

    @Autowired
    private ReelsService reelsService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/reels")
    public Reels createReels(@RequestBody Reels reel,@RequestHeader("Authorization")String jwt){
        User reqUser = userService.findUserByJwt(jwt);
        Reels newReel=reelsService.createReel(reel, reqUser);

        return newReel;
    }

    @GetMapping("/reels")
    public List<Reels> findAllReels(){
 
        List<Reels> reels=reelsService.findAllReels();

        return reels;
    }

    @GetMapping("/reels/user/{userId}")
    public List<Reels> findUserReels(@PathVariable Integer userId) throws Exception {
 
        List<Reels> reels=reelsService.findUsersReel(userId);

        return reels;
    }

    @DeleteMapping("/api/reels/{reelId}")
    public String deleteReel(
    @RequestHeader("Authorization") String jwt,
    @PathVariable Integer reelId
    ) throws Exception{
        User user=userService.findUserByJwt(jwt);
        String msg = reelsService.deleteReel(reelId, user);

        return msg;
    }

    @PostMapping("/api/reels/{reelId}/like")
    public Reels likeReel(
    @RequestHeader("Authorization") String jwt,
    @PathVariable Integer reelId
    ) throws Exception{
        User user=userService.findUserByJwt(jwt);
        Reels newReel=reelsService.likeReel(reelId, user.getId());

        return newReel;
    }
}
