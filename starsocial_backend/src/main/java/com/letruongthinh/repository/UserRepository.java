package com.letruongthinh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.letruongthinh.models.User;

public interface UserRepository extends JpaRepository<User,Integer> {
	public User findByEmail(String email);
	
	@Query("SELECT u FROM User u WHERE u.id != :userId AND (u.firstName LIKE %:query% OR u.lastName LIKE %:query%)")
	public List<User>searchUser(@Param(value = "query") String query,@Param("userId") Integer userId);
	
}
