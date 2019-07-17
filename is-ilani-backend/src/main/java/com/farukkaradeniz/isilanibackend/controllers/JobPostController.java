package com.farukkaradeniz.isilanibackend.controllers;

import com.farukkaradeniz.isilanibackend.models.JobPost;
import com.farukkaradeniz.isilanibackend.models.combined.CandidateApplication;
import com.farukkaradeniz.isilanibackend.models.combined.JobPostApplication;
import com.farukkaradeniz.isilanibackend.services.JobPostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api")
public class JobPostController {

    private Logger log = LoggerFactory.getLogger(JobPostController.class);

    private JobPostService jobPostService;

    @Autowired
    public JobPostController(JobPostService jobPostService) {
        this.jobPostService = jobPostService;
    }


    // GET JOBPOST BY ID
    @GetMapping("/jobpost/{id}")
    public JobPost getJobPostDetail(
            @PathVariable("id") String id
    ) {

        JobPost jobPost = jobPostService.getJobPostById(id);
        if (jobPost == null) {
            log.info("Job post with " + id + " does not exist.");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "There are no records of Job Posts by given ID.");
        }
        log.info("Job post with given " + id + " exist." + "With the title of \"" + jobPost.getTitle() + "\".");
        return jobPost;
    }

    // GET ALL JOBPOSTS
    @GetMapping("/jobpost/all")
    public List<JobPost> getAllJobPosts() {
        List<JobPost> jobPostList = jobPostService.findAll();
        log.info("All jobposts returned with size of \"" + jobPostList.size() + "\".");
        return jobPostList;
    }


    // GET ALL JOBPOSTS BY AVAILABILITY
    @GetMapping("/jobpost")
    public List<JobPost> getAllJobPostsByAvailability(
            @RequestParam("isAvailable") boolean is_available
    ) {

        List<JobPost> allAvailableJobPosts = jobPostService.getAllAvailableJobPosts();
        List<JobPost> allNonAvailableJobPosts = jobPostService.getAllNonAvailableJobPosts();
        log.info("Parameter \"available\" passed as: " + "\"" + is_available + "\"");
        log.info("Available jobs returned with size of \"" + allAvailableJobPosts.size() + "\".");
        log.info("Non available jobs returned with size of \"" + allNonAvailableJobPosts.size() + "\".");

        return is_available ? allAvailableJobPosts : allNonAvailableJobPosts;
    }


    // ADD JOBPOST
    @PostMapping("/jobpost")
    public JobPost addJobPost(@RequestBody JobPost jobPost) {
        return jobPostService.addJobPost(jobPost);
    }

    // UPDATE JOBPOST
    @PutMapping("/jobpost/{id}")
    public JobPost setAvailability(
            @PathVariable("id") String id,
            @RequestBody JobPost jobPost
    ) {

        return jobPostService.setAvailability(id, jobPost);
    }

    // Adayın kendi sayfasına başvurduğu başvurularla ilgili küçük detayları göreceği sayfa
    @GetMapping("/jobpost/candidate/{id}")
    public List<CandidateApplication> jobPostsCandidadeApplied(
        @PathVariable("id") String candidate_id
    ){
       return jobPostService.getJobPostsCandidateApplied(candidate_id);
    }

    // HR'ın bir iş ilanına yapılan başvurularla ilgili küçük detayları göreceği sayfa
    @GetMapping("/jobpost/{id}/applications")
    public List<JobPostApplication> jobPostApplicants(
            @PathVariable("id") String job_post_id
    ) {
        return jobPostService.getJobPostApplicants(job_post_id);
    }

}
