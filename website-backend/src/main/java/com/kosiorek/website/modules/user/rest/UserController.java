package com.kosiorek.website.modules.user.rest;

import com.kosiorek.website.exceptions.UserAlreadyExistsException;
import com.kosiorek.website.modules.auth.model.AuthenticationResponse;
import com.kosiorek.website.modules.auth.service.AuthenticationService;
import com.kosiorek.website.modules.user.model.User;
import com.kosiorek.website.modules.user.model.dto.LevelUpDto;
import com.kosiorek.website.modules.user.service.UserService;
import com.kosiorek.website.response.IntegerResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.InputMismatchException;
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

    @GetMapping("/test")
    public String test() {
        return "test";
    }


//    testing
//    @GetMapping("/principal")
//    public String testPrincipal() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = authentication.getName();
//        UserDetails user = (UserDetails) authentication.getPrincipal();
//        return "User: " + user.getUsername() + ", Authorities: " + user.getAuthorities();
//    }

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
    public ResponseEntity<AuthenticationResponse> updateUser(@PathVariable Integer id, @RequestBody User user) {
        AuthenticationResponse authResponse;
        try {
            User modifiedUser = userService.modify(id, user);
            authResponse = this.authenticationService.refreshAuthentication(modifiedUser);
        } catch (IllegalAccessException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.unprocessableEntity().build();
        }
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/{id}/levelup")
    public ResponseEntity<IntegerResponse> levelUpUser(@PathVariable Integer id, @RequestBody LevelUpDto request) {
        IntegerResponse response = new IntegerResponse();
        try {
            Integer level = userService.answerAndIncreaseLevel(id, request);
            response.setResponse(level);
            return ResponseEntity.ok(response);
        } catch (IllegalAccessException e) {
            response.setErrorMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        } catch (InputMismatchException e) {
            response.setErrorMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (IllegalArgumentException e) {
            response.setErrorMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
