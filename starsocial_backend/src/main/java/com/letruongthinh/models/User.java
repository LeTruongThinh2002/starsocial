package com.letruongthinh.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
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
@Table(name="users")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String avatar;
	private String background;
	
	private String gender;
	private List<Integer>followers =new ArrayList<>();
	private List<Integer>followings =new ArrayList<>();
	
	@JsonIgnore
	@ManyToMany
	private List<Post>savedPost=new ArrayList<>();

}
