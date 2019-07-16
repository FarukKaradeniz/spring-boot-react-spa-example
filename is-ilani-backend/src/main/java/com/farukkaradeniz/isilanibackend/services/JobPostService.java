package com.farukkaradeniz.isilanibackend.services;

import com.farukkaradeniz.isilanibackend.models.JobPost;
import com.farukkaradeniz.isilanibackend.repositories.JobPostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class JobPostService {

    private Logger log = LoggerFactory.getLogger(JobPostService.class);

    private JobPostRepository jobPostRepository;

    @Autowired
    public JobPostService(JobPostRepository jobPostRepository) {
        this.jobPostRepository = jobPostRepository;
    }

    public List<JobPost> findAll() {
        return (List<JobPost>) jobPostRepository.findAll();
    }

    public JobPost getJobPostById(String id) {
        if (jobPostRepository.findById(id).isPresent()) {
            return jobPostRepository.findById(id).get();
        }
        return null;
    }

    public List<JobPost> getAllAvailableJobPosts() {
        return jobPostRepository.getAllByIsAvailableIsTrue();
    }

    public List<JobPost> getAllNonAvailableJobPosts() {
        return jobPostRepository.getAllByIsAvailableIsFalse();
    }

    public JobPost addJobPost(JobPost jobPost) {
        jobPost.setJobPostId(UUID.randomUUID().toString());
        jobPost.setCreationDate(new Date().getTime());
        jobPost.setApplications(Collections.emptyList());
        log.info("Adding jobpost with values of: " + jobPost.toString());

        return jobPostRepository.save(jobPost);
    }

    public JobPost setAvailability(String id, JobPost jobPost) {
        log.info("Updating jobpost with id \"" + id + "\"");
        JobPost postById = getJobPostById(id);
        log.info("Old JobPost details: " + postById.toString());
        postById.setIsAvailable(jobPost.getIsAvailable());
        JobPost saved = jobPostRepository.save(postById);
        log.info("New JobPost details: " + saved.toString());
        return saved;
    }

}
