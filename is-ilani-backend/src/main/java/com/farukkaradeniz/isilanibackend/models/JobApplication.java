package com.farukkaradeniz.isilanibackend.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity(name = "jobapplication")
@Data
@NoArgsConstructor
public class JobApplication {
    @GeneratedValue
    @Id
    private Long applicationId;

    @ManyToOne
    private Candidate candidate;

    @ManyToOne
    private JobPost jobPost;

    @Column(name = "status")
    private String status;

    public JobApplication(Candidate candidate, JobPost jobPost, String status) {
        this.candidate = candidate;
        this.jobPost = jobPost;
        this.status = status;
    }
}
