package com.letruongthinh.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private String caption;

    
    @Column(length = 20000)
    private List<String> image;

    @Column(length = 20000)
    private List<String> video;

    @JsonIgnoreProperties("savedPost")
    @ManyToOne
    private User user;

    @JsonIgnoreProperties("savedPost")
    @ManyToMany
    private List<User> liked=new ArrayList<>();

    private LocalDateTime createAt;

    @OneToMany
    private List<Comment> comments=new ArrayList<>();

}
