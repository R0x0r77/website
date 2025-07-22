package com.kosiorek.website.modules.auth.rest;

import com.kosiorek.website.exceptions.UserAlreadyExistsException;
import com.kosiorek.website.modules.auth.model.AuthenticationRequest;
import com.kosiorek.website.modules.auth.model.AuthenticationResponse;
import com.kosiorek.website.modules.auth.model.RegisterRequest;
import com.kosiorek.website.modules.auth.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.InputMismatchException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4200"})
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody final RegisterRequest request
    ) {
        AuthenticationResponse response;
        try {
            response = authenticationService.register(request);
        } catch (UserAlreadyExistsException | InputMismatchException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(AuthenticationResponse.builder()
                            .errorMessage(e.getMessage())
                            .build());
        }
        return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(response);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody final AuthenticationRequest request
    ) {
        AuthenticationResponse response;
        try {
            response = authenticationService.authenticate(request);
        } catch (AuthenticationException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(AuthenticationResponse.builder()
                            .errorMessage("Invalid username or password")
                            .build());
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }
}
