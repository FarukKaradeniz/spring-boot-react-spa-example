package com.farukkaradeniz.isilanibackend.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity(name = "jobapplication")
@Data
@NoArgsConstructor
public class JobApplication {
    @Id
    private String applicationId;

    @ManyToOne
    private Candidate candidate;

    @ManyToOne
    private JobPost jobPost;

    @Column(name = "status")
    private String status;

    public JobApplication(String applicationId, Candidate candidate, JobPost jobPost, String status) {
        this.applicationId = applicationId;
        this.candidate = candidate;
        this.jobPost = jobPost;
        this.status = status;
    }
}
