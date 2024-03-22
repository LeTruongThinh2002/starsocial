package com.letruongthinh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.letruongthinh.models.Story;
import com.letruongthinh.models.User;
import com.letruongthinh.service.StoryService;
import com.letruongthinh.service.UserService;

@RestController
public class StoryController {

    @Autowired
    private StoryService storyService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/story")
    public Story createStory(@RequestBody Story story, @RequestHeader("Authorization")String jwt) {
        
        User reqUser=userService.findUserByJwt(jwt);
        Story createdStory=storyService.createStory(story, reqUser);
        return createdStory;
    }

    @PostMapping("/story/user/{userId}")
    public List<Story> findUsersStory(@PathVariable Integer userId) throws Exception {
        
        List<Story> stories=storyService.findStoryByUserId(userId);
        return stories;
    }
}
