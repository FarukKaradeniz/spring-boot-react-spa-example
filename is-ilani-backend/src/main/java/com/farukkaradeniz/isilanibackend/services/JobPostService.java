package com.farukkaradeniz.isilanibackend.services;

import com.farukkaradeniz.isilanibackend.models.JobPost;
import com.farukkaradeniz.isilanibackend.repositories.JobPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobPostService {

    private JobPostRepository jobPostRepository;

    @Autowired
    public JobPostService(JobPostRepository jobPostRepository) {
        this.jobPostRepository = jobPostRepository;
    }

    public List<JobPost> findAll() {
        return (List<JobPost>) jobPostRepository.findAll();
    }

}
