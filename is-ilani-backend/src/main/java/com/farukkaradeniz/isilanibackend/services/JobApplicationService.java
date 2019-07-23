package com.farukkaradeniz.isilanibackend.services;

import com.farukkaradeniz.isilanibackend.models.Candidate;
import com.farukkaradeniz.isilanibackend.models.JobApplication;
import com.farukkaradeniz.isilanibackend.models.JobPost;
import com.farukkaradeniz.isilanibackend.repositories.CandidateRepository;
import com.farukkaradeniz.isilanibackend.repositories.JobApplicationRepository;
import com.farukkaradeniz.isilanibackend.repositories.JobPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class JobApplicationService {

    private JobPostRepository jobPostRepository;
    private CandidateRepository candidateRepository;
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    public JobApplicationService(JobApplicationRepository jobApplicationRepository,
                                 CandidateRepository candidateRepository,
                                 JobPostRepository jobPostRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.candidateRepository = candidateRepository;
        this.jobPostRepository = jobPostRepository;
    }


    public List<JobApplication> findAll() {
        return (List<JobApplication>) jobApplicationRepository.findAll();
    }

    public JobApplication createJobApplication(String c_id, String j_id) {
        Candidate candidate = candidateRepository.findById(c_id).get();
        JobPost jobPost = jobPostRepository.findById(j_id).get();
        JobApplication application = new JobApplication(
                candidate,
                jobPost,
                "Değerlendirilmemiş");
        application.setApplicationId(UUID.randomUUID().toString());

        JobApplication save = jobApplicationRepository.save(application);
        List<JobApplication> applications = candidate.getApplications();
        applications.add(save);
        candidate.setApplications(applications);

        List<JobApplication> postApplications = jobPost.getApplications();
        postApplications.add(save);
        jobPost.setApplications(postApplications);
        jobPostRepository.save(jobPost);
        return save;
    }

    public JobApplication updateJobApplication(String application_id, String status) {
        if (jobApplicationRepository.findById(application_id).isPresent()) {
            JobApplication jobApplication = jobApplicationRepository.findById(application_id).get();
            jobApplication.setStatus(status);
            return jobApplicationRepository.save(jobApplication);
        }
        return null;
    }

    public boolean checkIfCandidateAppliedToJob(String candidate_id, String jobpost_id) {
        JobApplication application =
                jobApplicationRepository.findByCandidate_UserIdAndAndJobPost_JobPostId(candidate_id, jobpost_id);

        return application != null;
    }
}
