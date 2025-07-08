package com.kosiorek.website.modules.auth.rest;

import com.kosiorek.website.exceptions.UserAlreadyExistsException;
import com.kosiorek.website.modules.auth.model.AuthenticationRequest;
import com.kosiorek.website.modules.auth.model.AuthenticationResponse;
import com.kosiorek.website.modules.auth.model.RegisterRequest;
import com.kosiorek.website.modules.auth.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody final AuthenticationRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(authenticationService.authenticate(request));
    }
}
