package com.farukkaradeniz.isilanibackend.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmailPasswordModel {
    private String email;
    private String password;
}
