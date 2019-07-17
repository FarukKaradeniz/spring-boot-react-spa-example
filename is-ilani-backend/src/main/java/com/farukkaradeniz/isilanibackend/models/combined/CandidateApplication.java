package com.farukkaradeniz.isilanibackend.models.combined;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CandidateApplication {
    private String jobPostId;
    private String jobPostTitle;
    private String status;
}
