package com.kosiorek.website.exceptions.custom_exceptions;

public class UserAlreadyExistsException
        extends RuntimeException {
    public UserAlreadyExistsException(String errorMessage) {
        super(errorMessage);
    }
}
