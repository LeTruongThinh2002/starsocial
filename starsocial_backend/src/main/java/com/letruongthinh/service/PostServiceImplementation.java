package com.letruongthinh.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.letruongthinh.models.Post;
import com.letruongthinh.models.User;
import com.letruongthinh.repository.CommentRepository;
import com.letruongthinh.repository.PostRepository;
import com.letruongthinh.repository.UserRepository;

@Service
public class PostServiceImplementation implements PostService{

    private Cloudinary cloudinary;
    
    @Autowired
    PostRepository postRepository;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CommentRepository commentRepository;

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

    // Kiểm tra quyền sở hữu
    if (!post.getUser().getId().equals(userId)) {
        throw new Exception("You are not the owner of this post");
    }

    // Tìm tất cả người dùng đã lưu bài đăng và loại bỏ bài đăng khỏi danh sách savedPost của họ
    List<User> users = userRepository.findBySavedPostContains(post);
    for (User userSearch : users) {
        userSearch.getSavedPost().remove(post);
    }
    userRepository.saveAll(users);

    // Xóa hình ảnh và video từ Cloudinary
    List<String> images = new ArrayList<>(post.getImage());
    List<String> videos = new ArrayList<>(post.getVideo());
    List<String> publicIdImages = new ArrayList<>();
    List<String> publicIdVideos = new ArrayList<>();
    if(!images.isEmpty()){
        for (String url : images) {
            if (url != null) {
            String[] parts = url.split("/");
            String fileName = parts[parts.length - 1];
            String publicId = fileName.split("\\.")[0]; // Lấy phần trước dấu chấm là public ID
            publicIdImages.add(publicId);
            }
        }
    }
    if(!videos.isEmpty()){
        for (String url : videos) {
            if (url != null) {
            String[] parts = url.split("/");
            String fileName = parts[parts.length - 1];
            String publicId = fileName.split("\\.")[0]; // Lấy phần trước dấu chấm là public ID
            publicIdVideos.add(publicId);
            }
        }
    }

    cloudinary = new Cloudinary(ObjectUtils.asMap(
        "cloud_name", "dd0tbhnzl",
        "api_key", "234868554266692",
        "api_secret", "fy7mChtdmnKGQ6MVOxldJdSyqAI"
    ));
    if(!publicIdImages.isEmpty()){
        for (String file : publicIdImages) {
            cloudinary.uploader().destroy(file, ObjectUtils.asMap("resource_type", "image"));
        }
    }
    if(!publicIdVideos.isEmpty()){
        for (String file : publicIdVideos) {
            cloudinary.uploader().destroy(file, ObjectUtils.asMap("resource_type", "video"));
        }
    }

    // Xóa bài đăng
    postRepository.delete(post);

    return "Post deleted successfully!";
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

    @Override
    public Post editPost(Post post, Integer userId) throws Exception {
        Post OldPost = findPostById(post.getId());
        if (!OldPost.getUser().getId().equals(userId)) {
            throw new Exception("You are not the owner of this post");
        }

        OldPost.setCaption(post.getCaption());
        postRepository.save(OldPost);

        return OldPost;
    }

    
    
}
