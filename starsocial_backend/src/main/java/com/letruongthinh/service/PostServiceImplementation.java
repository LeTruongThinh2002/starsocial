package com.letruongthinh.service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.letruongthinh.models.Post;
import com.letruongthinh.models.User;
import com.letruongthinh.repository.PostRepository;
import com.letruongthinh.repository.UserRepository;

@Service
public class PostServiceImplementation implements PostService{

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Override
    public Post createNewPost(Post post, Integer userId) throws Exception {
        
        User user=userService.findUserById(userId);

        Post newPost = new Post();
        newPost.setCaption(post.getCaption());
        
        newPost.setImage(post.getImage());
        newPost.setCreateAt(LocalDateTime.now());
        newPost.setVideo(post.getVideo());
        newPost.setUser(user);

        postRepository.save(newPost);

        return newPost;
    }

    @Override
    public String deletePost(Integer postId, Integer userId) throws Exception {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        if(post.getUser().getId()!=user.getId()){
            throw new Exception("you are not the owner of this post");
        }
        
        postRepository.delete(post);

        return "post deleted successfully!";
    }

    @Override
    public List<Post> findAllPost() {
       List<Post> posts = postRepository.findAll();
       Collections.reverse(posts);
        return posts;
    }

    @Override
    public Post findPostById(Integer postId) throws Exception {
        Optional<Post> otp=postRepository.findById(postId);

        if(otp.isEmpty()){
            throw new Exception("post not founded with id: "+postId);
        }

        return otp.get();
    }

    @Override
    public List<Post> findPostByUserId(Integer userId) {
        List<Post> posts = postRepository.findPostByUserId(userId);
        return posts;
    }

    @Override
    public Post likePost(Integer postId, Integer userId) throws Exception {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        if(post.getLiked().contains(user)){
            post.getLiked().remove(user);
        }else{
            post.getLiked().add(user);
        }

        return postRepository.save(post);
    }

    @Override
    public Post savedPost(Integer postId, Integer userId) throws Exception {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        if(user.getSavedPost().contains(post)){
            user.getSavedPost().remove(post);
        }else{
            user.getSavedPost().add(post);
        }
        userRepository.save(user);

        return post;
    }
    
}
