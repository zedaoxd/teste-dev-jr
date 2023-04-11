package br.com.bruno.services.exceptions;

public class DatabaseException extends RuntimeException {
    public DatabaseException(String s) {
        super(s);
    }
}
