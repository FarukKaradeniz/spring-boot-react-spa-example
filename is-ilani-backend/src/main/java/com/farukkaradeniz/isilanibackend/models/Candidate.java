package com.farukkaradeniz.isilanibackend.models;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.List;

@Entity(name = "candidate")
@Data
@NoArgsConstructor
public class Candidate {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long userId;
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

    @OneToMany(mappedBy = "candidate")
    @Nullable
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
