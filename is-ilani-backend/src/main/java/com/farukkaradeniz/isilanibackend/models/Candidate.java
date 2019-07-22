package com.farukkaradeniz.isilanibackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity(name = "candidate")
@Data
@NoArgsConstructor
public class Candidate {
    @Id
    private String userId;
    @Column(name ="fullname")
    private String fullname;
    @Column(name = "email")
    private String email;
    @Column(name = "profile_img")
    private String profileImg;
    @Column(name = "skills")
    private String skills;
    @Column(name = "in_blacklist")
    private Boolean inBlacklist;

    @Column(name = "password")
    @JsonIgnore
    private String password;

    @OneToMany(mappedBy = "candidate")
    @JsonIgnore
    @ToString.Exclude
    private List<JobApplication> applications;

    public Candidate(String fullname, String email, String profileImg, String skills, Boolean inBlacklist, List<JobApplication> jobApplications) {
        this.fullname = fullname;
        this.email = email;
        this.profileImg = profileImg;
        this.skills = skills;
        this.inBlacklist = inBlacklist;
        this.applications = jobApplications;
    }
}
