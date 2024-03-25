package com.letruongthinh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.letruongthinh.models.Comment;

public interface CommentRepository extends JpaRepository<Comment,Integer> {

    
} 
