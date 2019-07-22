package com.farukkaradeniz.isilanibackend.utils;

import java.util.Base64;

public class BasicUtil {
    public static String encodeBase64(String email, String password) {
        String willBeEncoded = new StringBuilder()
                .append(email)
                .append(':')
                .append(password)
                .toString();
        return Base64.getEncoder().encodeToString(willBeEncoded.getBytes());
    }
}
