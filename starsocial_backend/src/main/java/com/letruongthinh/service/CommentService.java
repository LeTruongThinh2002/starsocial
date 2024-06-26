package com.letruongthinh.service;

import java.util.List;

import com.letruongthinh.models.Comment;

public interface CommentService {
    public Comment createComment(Comment comment, Integer postId, Integer userId) throws Exception;

    public Comment findCommentById(Integer commentId) throws Exception;

    public List<Comment> findCommentByPostId(Integer postId) throws Exception;

    public Comment likeComment(Integer commentId, Integer UserId) throws Exception;

    public Comment deleteComment(Integer commentId, Integer UserId);
}
