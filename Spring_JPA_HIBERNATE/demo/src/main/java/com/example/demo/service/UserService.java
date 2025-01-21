package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Lấy tất cả người dùng
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Lấy người dùng theo id
    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    // Thêm người dùng mới
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Cập nhật thông tin người dùng
    public Optional<User> updateUser(int id, User user) {
        if (userRepository.existsById(id)) {
            user.setId(id);  // Cập nhật id của user
            return Optional.of(userRepository.save(user));
        }
        return Optional.empty();
    }

    // Xóa người dùng
    public boolean deleteUser(int id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}