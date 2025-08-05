package com.kosiorek.website.modules.user.rest;

import com.kosiorek.website.modules.auth.model.AuthenticationResponse;
import com.kosiorek.website.modules.auth.service.AuthenticationService;
import com.kosiorek.website.modules.user.model.User;
import com.kosiorek.website.modules.user.model.dto.LevelUpDto;
import com.kosiorek.website.modules.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final AuthenticationService authenticationService;

    public UserController(UserService userService, AuthenticationService authenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> list = userService.findList();
        if (list == null || list.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        User user = userService.findById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AuthenticationResponse> updateUser(
            @PathVariable Integer id,
            @RequestBody User user
    ) throws IllegalAccessException {
        User modifiedUser = userService.modify(id, user);
        AuthenticationResponse authResponse = authenticationService.refreshAuthentication(modifiedUser);
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/{id}/levelup")
    public ResponseEntity<Integer> levelUpUser(
            @PathVariable Integer id,
            @RequestBody LevelUpDto request
    ) throws IllegalAccessException {
        Integer level = userService.answerAndIncreaseLevel(id, request);
        return ResponseEntity.ok(level);
    }
}
