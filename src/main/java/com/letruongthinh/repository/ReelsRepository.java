package com.letruongthinh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.letruongthinh.models.Reels;

public interface ReelsRepository extends JpaRepository<Reels,Integer>{

    public List<Reels>findByUserId(Integer userId);
}
