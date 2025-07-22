package com.kosiorek.website.modules.user.service;

import com.kosiorek.website.exceptions.UserAlreadyExistsException;
import com.kosiorek.website.modules.riddle.dao.RiddleRepository;
import com.kosiorek.website.modules.riddle.model.Riddle;
import com.kosiorek.website.modules.user.dao.UserRepository;
import com.kosiorek.website.modules.user.model.User;
import com.kosiorek.website.modules.user.model.dto.LevelUpDto;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.InputMismatchException;
import java.util.List;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final RiddleRepository riddleRepository;

    public UserService(UserRepository userRepository, RiddleRepository riddleRepository) {
        this.userRepository = userRepository;
        this.riddleRepository = riddleRepository;
    }

    private void validateUserInputs(User user) {
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new InputMismatchException("Username can not be empty");
        }
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new InputMismatchException("Email can not be empty");
        }
    }

    @Transactional
    public User authorizeUserModification(Integer userId) throws IllegalAccessException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails loggedInUser = (UserDetails) authentication.getPrincipal();
        User existingUser = findById(userId);
        if (!loggedInUser.getUsername().equals(existingUser.getUsername())) {
            throw new IllegalAccessException("User is not authorized to modify this account");
        }
        return existingUser;
    }

    @Transactional
    public List<User> findList() {
        return userRepository.findAll();
    }

    @Transactional
    public User findById(Integer id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) throw new UsernameNotFoundException("User with ID " + id + " not found.");
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
    public User modify(Integer userId, User updatedData) throws IllegalAccessException {

        User existingUser = authorizeUserModification(userId);

        if (updatedData.getUsername() != null && !updatedData.getUsername().equals(existingUser.getUsername())) {
            if (userRepository.findByUsername(updatedData.getUsername()).isPresent()) {
                throw new UserAlreadyExistsException("User with this username already exists");
            }
            existingUser.setUsername(updatedData.getUsername());
        }

        if (updatedData.getEmail() != null && !updatedData.getEmail().equals(existingUser.getEmail())) {
            if (userRepository.findByEmail(updatedData.getEmail()).isPresent()) {
                throw new UserAlreadyExistsException("User with this email already exists");
            }
            existingUser.setEmail(updatedData.getEmail());
        }

        existingUser.setFirstName(updatedData.getFirstName());
        existingUser.setLastName(updatedData.getLastName());
        existingUser.setModifiedTimestamp(Instant.now());

        return existingUser;
    }

    private boolean validateLevel(Riddle riddle, Integer currentLevel, User currentUser) {
        if (currentLevel != riddle.getLevelReward() - 1)
            return false;
        return currentUser.getLevel().equals(currentLevel) && currentUser.getLevel().equals(riddle.getLevelReward() - 1);
    }

    @Transactional
    public Integer answerAndIncreaseLevel(Integer userId, LevelUpDto levelUpDto) throws IllegalAccessException {
        String key = levelUpDto.getKey();
        String answer = levelUpDto.getAnswer();
        Integer currentLevel = levelUpDto.getCurrentLevel();
        User currentUser = authorizeUserModification(userId);
        riddleRepository.findByKey(key).ifPresentOrElse(
                riddle -> {
                    if (validateLevel(riddle, currentLevel, currentUser)) {
                        if (key.equals(riddle.getKey()) && answer.equals(riddle.getAnswer()))
                            currentUser.setLevel(riddle.getLevelReward());
                        else
                            throw new IllegalArgumentException("Incorrect answer for the riddle: " + riddle.getDescription());
                    } else {
                        throw new IllegalArgumentException("Level mismatch for the riddle: current level is " + currentUser.getLevel() +
                                ", but the riddle requires level " + (riddle.getLevelReward() - 1));
                    }
                },
                () -> {
                    throw new IllegalArgumentException("Riddle not found.");
                }
        );
        return currentUser.getLevel();
    }

}
