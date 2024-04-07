package com.letruongthinh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.letruongthinh.models.Post;
import com.letruongthinh.models.User;
import com.letruongthinh.response.ApiResponse;
import com.letruongthinh.service.PostService;
import com.letruongthinh.service.UserService;

@RestController
public class PostController {

    @Autowired
    PostService postService;

    @Autowired
    UserService userService;
    

    @PostMapping("/api/posts")
    public ResponseEntity<Post>createPost(@RequestBody Post post,@RequestHeader("Authorization")String jwt) throws Exception{

        User user=userService.findUserByJwt(jwt);
        Post createdpost=postService.createNewPost(post, user.getId());

        return new ResponseEntity<>(createdpost,HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/api/posts/{postId}")
    public ResponseEntity<ApiResponse>deletePost(@PathVariable Integer postId,@RequestHeader("Authorization")String jwt) throws Exception{
        
        User user=userService.findUserByJwt(jwt);
        String message = postService.deletePost(postId, user.getId());
        ApiResponse res=new ApiResponse(message,true);
        return new ResponseEntity<ApiResponse>(res,HttpStatus.OK);
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<Post>findPostByIdHandler(@PathVariable Integer postId) throws Exception{
        
        Post post=postService.findPostById(postId);
        return new ResponseEntity<Post>(post,HttpStatus.ACCEPTED);
    }

    @GetMapping("/api/posts/user/{userId}")
    public ResponseEntity<List<Post>>findUsersPost(@PathVariable Integer userId){

        List<Post>posts=postService.findPostByUserId(userId);
        return new ResponseEntity<List<Post>>(posts,HttpStatus.OK);
    }

    @GetMapping("/api/posts")
    public ResponseEntity<List<Post>>findAllPost(){

        List<Post>posts=postService.findAllPost();
        return new ResponseEntity<List<Post>>(posts,HttpStatus.OK);
    }

    @PutMapping("/api/posts/save/{postId}")
    public ResponseEntity<Post>savedPostHandler(@PathVariable Integer postId,@RequestHeader("Authorization")String jwt) throws Exception{
        
        User user=userService.findUserByJwt(jwt);
        Post post=postService.savedPost(postId, user.getId());
        return new ResponseEntity<Post>(post,HttpStatus.ACCEPTED);
    }

    @PutMapping("/api/posts/like/{postId}")
    public ResponseEntity<Post>likedPostHandler(@PathVariable Integer postId,@RequestHeader("Authorization")String jwt) throws Exception{
        
        User user=userService.findUserByJwt(jwt);
        Post post=postService.likePost(postId, user.getId());
        return new ResponseEntity<Post>(post,HttpStatus.ACCEPTED);
    }

    @PostMapping("/api/posts/edit")
    public ResponseEntity<Post>editPost(@RequestBody Post post,@RequestHeader("Authorization")String jwt) throws Exception{
        User user=userService.findUserByJwt(jwt);
        Post newPost=postService.editPost(post, user.getId());
        return new ResponseEntity<Post>(newPost,HttpStatus.ACCEPTED);
    }

}
