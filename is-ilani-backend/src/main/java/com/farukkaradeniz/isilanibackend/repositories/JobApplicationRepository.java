package com.farukkaradeniz.isilanibackend.repositories;

import com.farukkaradeniz.isilanibackend.models.JobApplication;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends CrudRepository<JobApplication, String> {
    List<JobApplication> findAllByCandidate_UserId(String id);
    List<JobApplication> findAllByCandidate_UserIdAndAndStatus(String id, String status);
    List<JobApplication> findAllByJobPost_JobPostId(String id);
    JobApplication findAllByCandidate_UserIdAndAndJobPost_JobPostId(String candidate_id, String jobPost_id);
}
