package com.farukkaradeniz.isilanibackend.controllers;

import com.farukkaradeniz.isilanibackend.models.JobApplication;
import com.farukkaradeniz.isilanibackend.services.JobApplicationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api")
public class JobApplicationController {
    private Logger log = LoggerFactory.getLogger(JobApplicationController.class);
    private JobApplicationService jobApplicationService;

    @Autowired
    public JobApplicationController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    // Aday bir JobPost'a başvuru yaptığında çağırılacak olan method
    @PostMapping("/jobapplication/add")
    public JobApplication createJobApplication(
            @RequestParam("candidate_id") String candidate_id,
            @RequestParam("jobpost_id") String jobpost_id) {
        if (jobApplicationService.checkIfCandidateAppliedToJob(candidate_id, jobpost_id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "You've already applied to this job");
        }
        JobApplication application = jobApplicationService.createJobApplication(candidate_id, jobpost_id);
        if (application == null) {
            log.error("Could not create job application with given candidate_id and jobpost_id.");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Error creating application");

        }

        return application;
    }

    // HR bir adayın başvuru durumunu güncellemek istediğinde çağırılacak method
    @PutMapping("/jobapplication")
    public JobApplication applicationStatusUpdate(
            @RequestParam("application_id") String application_id,
            @RequestParam("status") String status
    ) {
        JobApplication application = jobApplicationService.updateJobApplication(application_id, status);
        if (application == null) {
                log.info("Job application with " + application_id + " does not exist.");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "There are no records of Job application by given ID.");

        }
        return application;
    }


    // Test amaçlı veritabanındaki bütün başvuruları getiren method
    @GetMapping("/jobapplication/all")
    public List<JobApplication> allApplications() {
        return jobApplicationService.findAll();
    }
}
