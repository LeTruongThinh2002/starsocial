package com.letruongthinh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.letruongthinh.models.Comment;
import com.letruongthinh.models.User;
import com.letruongthinh.service.CommentService;
import com.letruongthinh.service.UserService;


@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/comments/post/{postId}")
    public Comment createComment(@RequestBody Comment comment, @PathVariable Integer postId, @RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserByJwt(jwt);

        Comment newComment = commentService.createComment(comment,postId, user.getId());

        return newComment;
    }

    @GetMapping("/api/comments/post/{postId}")
    public List<Comment> findCommentByPostId(@PathVariable Integer postId, @RequestHeader("Authorization") String jwt) throws Exception{
        User user=userService.findUserByJwt(jwt);
        
        List<Comment> newComment = commentService.findCommentByPostId(postId);

        return newComment;
    }

    @PutMapping("/api/comments/like/{commentId}")
    public Comment likeComment(@PathVariable Integer commentId, @RequestHeader("Authorization") String jwt) throws Exception {
        User user=userService.findUserByJwt(jwt);
        Comment likedComment = commentService.likeComment(commentId, user.getId());
        
        return likedComment;
    }

}
