package com.letruongthinh.service;

import java.util.List;

import com.letruongthinh.models.Reels;
import com.letruongthinh.models.User;


public interface ReelsService {

    public Reels createReel(Reels reel, User user);

    public List<Reels> findAllReels();

    public List<Reels> findUsersReel(Integer userId) throws Exception;


}