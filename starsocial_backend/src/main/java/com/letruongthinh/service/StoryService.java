package com.letruongthinh.service;

import java.util.List;

import com.letruongthinh.models.Story;
import com.letruongthinh.models.User;

public interface StoryService {

    public Story createStory(Story story, User user);

    public List<Story> findStoryByUserId(Integer userId) throws Exception;
}
