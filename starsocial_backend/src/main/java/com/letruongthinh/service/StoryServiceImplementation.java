package com.letruongthinh.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.letruongthinh.models.Story;
import com.letruongthinh.models.User;
import com.letruongthinh.repository.StoryRepository;

@Service
public class StoryServiceImplementation implements StoryService {

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private UserService userService;

    @Override
    public Story createStory(Story story, User user) {
        Story createdStory=new Story();

        createdStory.setTitle(story.getTitle());
        createdStory.setBody(story.getBody());
        createdStory.setImage(story.getImage());
        createdStory.setUser(user);
        createdStory.setCreatedAt(LocalDateTime.now());

        return storyRepository.save(createdStory);
    }

    @Override
    public List<Story> findStoryByUserId(Integer userId) throws Exception {
        User user=userService.findUserById(userId);

        return storyRepository.findByUserId(user.getId());
    }

    @Override
    public List<Story> getAllStories() {
        List<Story> stories = storyRepository.findAll();

        return stories;
    }

    @Override
    public String deleteStory(Integer storyId, User user) throws Exception {
        
        Optional<Story> story = storyRepository.findById(storyId);
        if(!story.isPresent()) {
            throw new Exception("Story not exists with id: "+storyId);
        }
        Story stor = story.get();
        if(!stor.getUser().getId().equals(user.getId())) {
            throw new Exception("You are not the owner of this story");
        }
        storyRepository.delete(story.get());
        return "Story deleted!";
    }

    @Override
    public Story editStory(Story story, User user) throws Exception {
       
        Optional<Story> OldStory = storyRepository.findById(story.getId());
        if(!OldStory.isPresent()) {
            throw new Exception("Story not exists with id: "+story.getId());
        }
        Story oldStor = OldStory.get();
        if (!oldStor.getUser().getId().equals(user.getId())) {
            throw new Exception("You are not the owner of this story");
        }

        oldStor.setTitle(story.getTitle());
        oldStor.setBody(story.getBody());
        oldStor.setImage(story.getImage());

        return storyRepository.save(oldStor);
    }

    @Override
    public Story likeStory(Integer storyId, User user) throws Exception {
        
        Optional<Story> story = storyRepository.findById(storyId);
        if(!story.isPresent()) {
            throw new Exception("Story not exists with id: "+storyId);
        }

        Story stor = story.get();
        if(stor.getLiked().contains(user.getId())){
            stor.getLiked().remove(user.getId());
        }else {
            stor.getLiked().add(user.getId());
        }
        return storyRepository.save(stor);
    }

}
