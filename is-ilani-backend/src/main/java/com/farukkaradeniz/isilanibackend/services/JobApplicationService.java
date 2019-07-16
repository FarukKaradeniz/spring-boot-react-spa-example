package com.farukkaradeniz.isilanibackend.services;

import com.farukkaradeniz.isilanibackend.models.JobApplication;
import com.farukkaradeniz.isilanibackend.repositories.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobApplicationService {

    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    public JobApplicationService(JobApplicationRepository jobApplicationRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
    }


    public List<JobApplication> findAll() {
        return (List<JobApplication>) jobApplicationRepository.findAll();
    }
}
