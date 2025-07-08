package com.kosiorek.website.exceptions;

public class UserAlreadyExistsException
        extends RuntimeException {
    public UserAlreadyExistsException(String errorMessage) {
        super(errorMessage);
    }
}
