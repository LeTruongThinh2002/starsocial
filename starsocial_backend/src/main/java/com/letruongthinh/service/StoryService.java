package com.letruongthinh.service;

import java.util.List;

import com.letruongthinh.models.Story;
import com.letruongthinh.models.User;

public interface StoryService {

    public Story createStory(Story story, User user);

    public List<Story> findStoryByUserId(Integer userId) throws Exception;

    public List<Story> getAllStories();

    public String deleteStory(Integer storyId, User user) throws Exception;

    public Story editStory(Story story, User user) throws Exception;

    public Story likeStory(Integer storyId, User user) throws Exception;
}
