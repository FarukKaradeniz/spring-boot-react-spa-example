package com.farukkaradeniz.isilanibackend.services;

import com.farukkaradeniz.isilanibackend.models.Candidate;
import com.farukkaradeniz.isilanibackend.models.JobApplication;
import com.farukkaradeniz.isilanibackend.models.JobPost;
import com.farukkaradeniz.isilanibackend.models.combined.CandidateApplication;
import com.farukkaradeniz.isilanibackend.models.combined.JobPostApplication;
import com.farukkaradeniz.isilanibackend.repositories.CandidateRepository;
import com.farukkaradeniz.isilanibackend.repositories.JobApplicationRepository;
import com.farukkaradeniz.isilanibackend.repositories.JobPostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class JobPostService {

    private Logger log = LoggerFactory.getLogger(JobPostService.class);

    private JobPostRepository jobPostRepository;
    private JobApplicationRepository jobApplicationRepository;
    private CandidateRepository candidateRepository;

    @Autowired
    public JobPostService(JobPostRepository jobPostRepository, JobApplicationRepository jobApplicationRepository, CandidateRepository candidateRepository) {
        this.jobPostRepository = jobPostRepository;
        this.jobApplicationRepository = jobApplicationRepository;
        this.candidateRepository = candidateRepository;
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

    public List<CandidateApplication> getJobPostsCandidateApplied(String candidate_id) {
        List<CandidateApplication> resultList = new ArrayList<>();
        List<JobApplication> allByCandidate_userId = jobApplicationRepository.findAllByCandidate_UserId(candidate_id);
        List<JobPost> allByApplicationsByCandidate = new ArrayList<>();
        allByCandidate_userId.forEach(jobApplication -> allByApplicationsByCandidate.add(jobPostRepository.findById(jobApplication.jobPostId()).get()));
        allByApplicationsByCandidate.forEach(jobPost -> resultList.add(new CandidateApplication(jobPost.getJobPostId(), jobPost.getTitle(), jobApplicationRepository.findByCandidate_UserIdAndAndJobPost_JobPostId(candidate_id, jobPost.getJobPostId()).getStatus())));

        return resultList;

    }

    public List<JobPostApplication> getJobPostApplicants(String job_post_id) {
        List<JobPostApplication> resultList = new ArrayList<>();
        List<JobApplication> allByJobPost_jobPostId = jobApplicationRepository.findAllByJobPost_JobPostId(job_post_id);

        allByJobPost_jobPostId.forEach(jobApplication -> {
            Candidate candidate = candidateRepository.findById(jobApplication.candidateId()).get();
            resultList.add(new JobPostApplication(jobApplication.getApplicationId(),
                    candidate.getFullname(), candidate.getUserId(), candidate.getEmail()));
        });
        return resultList;
    }
}
