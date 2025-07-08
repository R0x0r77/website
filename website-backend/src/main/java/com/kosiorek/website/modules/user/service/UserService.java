package com.kosiorek.website.modules.user.service;

import com.kosiorek.website.exceptions.UserAlreadyExistsException;
import com.kosiorek.website.modules.user.dao.UserRepository;
import com.kosiorek.website.modules.user.model.User;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.InputMismatchException;
import java.util.List;


@Service
public class UserService {

    private final UserRepository userRepository;

    private void validateUserInputs(User user) {
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new InputMismatchException("Username can not be empty");
        }
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new InputMismatchException("Email can not be empty");
        }
    }

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public List<User> findList() {
        return userRepository.findAll();
    }

    @Transactional
    public User findById(Integer id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) throw new UsernameNotFoundException("User not found");
        return user;
    }

    @Transactional
    public User findByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
        if (user == null) throw new UsernameNotFoundException("User not found");
        return user;
    }

    @Transactional
    public void create(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent())
            throw new UserAlreadyExistsException("User with this username already exists");
        if (userRepository.findByEmail(user.getEmail()).isPresent())
            throw new UserAlreadyExistsException("User with this email already exists");
        validateUserInputs(user);
        user.setCreatedTimestamp(Instant.now());
        user.setModifiedTimestamp(Instant.now());
        userRepository.save(user);
    }

    @Transactional
    public void modify(User user) {
        if (userRepository.findByUsername(user.getUsername()).isEmpty())
            throw new UsernameNotFoundException(user.getUsername());
        if (userRepository.findByUsername(user.getUsername()).isPresent())
            throw new UserAlreadyExistsException("User with this username already exists");
        if (userRepository.findByEmail(user.getEmail()).isPresent())
            throw new UserAlreadyExistsException("User with this email already exists");
        user.setModifiedTimestamp(Instant.now());
        userRepository.save(user);
    }

}
