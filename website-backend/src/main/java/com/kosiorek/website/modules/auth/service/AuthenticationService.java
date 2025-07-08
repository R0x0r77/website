package com.kosiorek.website.modules.auth.service;

import com.kosiorek.website.config.JwtService;
import com.kosiorek.website.enums.Role;
import com.kosiorek.website.exceptions.UserAlreadyExistsException;
import com.kosiorek.website.modules.auth.model.AuthenticationRequest;
import com.kosiorek.website.modules.auth.model.AuthenticationResponse;
import com.kosiorek.website.modules.auth.model.RegisterRequest;
import com.kosiorek.website.modules.user.model.User;
import com.kosiorek.website.modules.user.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;


    @Transactional
    public AuthenticationResponse register(RegisterRequest request) throws UserAlreadyExistsException {
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userService.create(user);
        return AuthenticationResponse.builder()
                .build();
    }

    @Transactional
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        User user = userService.findByUsername(request.getUsername());
        String jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwt)
                .build();
    }


}
