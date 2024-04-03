package com.letruongthinh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.letruongthinh.models.Comment;

public interface CommentRepository extends JpaRepository<Comment,Integer> {

    @Query("select p.comments from Post p where p.id =:postId")
    List<Comment>findCommentByPostId(Integer postId);
} 
