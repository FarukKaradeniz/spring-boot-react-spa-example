package com.farukkaradeniz.isilanibackend.models.combined;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JobPostApplication {
    private String application_id;
    private String fullname;
    private String candidate_id;
    private String email;
}
