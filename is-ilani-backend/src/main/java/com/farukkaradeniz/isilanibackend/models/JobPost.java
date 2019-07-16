package com.farukkaradeniz.isilanibackend.models;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity(name = "jobpost")
@NoArgsConstructor
public class JobPost {
    @Id
    @GeneratedValue
    private Long jobPostId;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "requirements")
    private String requirements;
    @Column(name = "is_available")
    private Boolean isAvailable;
    @Column(name = "creation_date")
    private Date creationDate;
    @Column(name = "deadline")
    private Date deadline;

    @OneToMany(mappedBy = "jobPost")
    private List<JobApplication> applications;

    public JobPost(String title, String description, String requirements, Boolean isAvailable, Date creationDate, Date deadline, List<JobApplication> jobApplications) {
        this.title = title;
        this.description = description;
        this.requirements = requirements;
        this.isAvailable = isAvailable;
        this.creationDate = creationDate;
        this.deadline = deadline;
        this.applications = jobApplications;
    }
}

