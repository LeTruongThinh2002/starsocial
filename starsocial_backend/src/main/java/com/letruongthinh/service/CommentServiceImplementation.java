package com.letruongthinh.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.letruongthinh.models.Comment;
import com.letruongthinh.models.Post;
import com.letruongthinh.models.User;
import com.letruongthinh.repository.CommentRepository;
import com.letruongthinh.repository.PostRepository;

@Service
public class CommentServiceImplementation implements CommentService {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Override
    public Comment createComment(Comment comment, Integer postId, Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        Post post = postService.findPostById(postId);
        
        comment.setUser(user);
        comment.setContent(comment.getContent());
        comment.setCreatedAt(LocalDateTime.now());

        Comment savedComment = commentRepository.save(comment);
        post.getComments().add(savedComment);
        postRepository.save(post);

        return savedComment;
    }

    @Override
    public Comment deleteComment(Integer commentId, Integer UserId) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Comment findCommentById(Integer commentId) throws Exception {
        Optional<Comment> opt=commentRepository.findById(commentId);

        if(opt.isEmpty()) {
            throw new Exception("comment not exist");
        }

        return opt.get();
    }

    @Override
    public List<Comment> findCommentByPostId(Integer postId) throws Exception {
        List<Comment> opt=commentRepository.findCommentByPostId(postId);

        if(opt.isEmpty()) {
            throw new Exception("comment not exist");
        }

        return opt;
    }

    @Override
    public Comment likeComment(Integer commentId, Integer UserId) throws Exception {
        Comment comment=findCommentById(commentId);

        User user=userService.findUserById(UserId);
        if(!comment.getLiked().contains(user)){
            comment.getLiked().add(user);
        }else{
            comment.getLiked().remove(user);
        }
        return commentRepository.save(comment);
    }
    
}
