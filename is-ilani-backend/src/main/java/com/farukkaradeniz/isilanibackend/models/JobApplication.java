package com.farukkaradeniz.isilanibackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonIgnore
    private Candidate candidate;

    @ManyToOne
    @JsonIgnore
    private JobPost jobPost;

    @Column(name = "status")
    private String status;

    public JobApplication(Candidate candidate, JobPost jobPost, String status) {
        this.candidate = candidate;
        this.jobPost = jobPost;
        this.status = status;
    }

    @JsonProperty
    public String candidateId() {
        return candidate.getUserId();
    }

    @JsonProperty
    public String jobPostId(){
        return jobPost.getJobPostId();
    }

}
