package com.farukkaradeniz.isilanibackend.controllers;

import com.farukkaradeniz.isilanibackend.models.Candidate;
import com.farukkaradeniz.isilanibackend.models.JobApplication;
import com.farukkaradeniz.isilanibackend.services.CandidateService;
import com.farukkaradeniz.isilanibackend.services.JobApplicationService;
import com.farukkaradeniz.isilanibackend.services.MailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api")
public class JobApplicationController {
    private Logger log = LoggerFactory.getLogger(JobApplicationController.class);
    private JobApplicationService jobApplicationService;
    private MailService mailService;
    private CandidateService candidateService;

    @Autowired
    public JobApplicationController(JobApplicationService jobApplicationService, MailService mailService, CandidateService candidateService) {
        this.jobApplicationService = jobApplicationService;
        this.mailService = mailService;
        this.candidateService = candidateService;
    }

    // Aday bir JobPost'a başvuru yaptığında çağırılacak olan method
    @PostMapping("/jobapplication/add")
    @PreAuthorize(value = "hasAnyAuthority('ROLE_USER')")
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
    @PreAuthorize(value = "hasAnyAuthority('ROLE_ADMIN')")
    public JobApplication applicationStatusUpdate(
            @RequestParam("application_id") String application_id,
            @RequestParam("status") String status
    ) {
        JobApplication currentApplication = jobApplicationService.getJobApplicationById(application_id);
        String oldStatus = currentApplication.getStatus();
        Candidate candidate = candidateService.getCandidateById(currentApplication.candidateId());
        String candidateEmail = candidate.getEmail();

        JobApplication application = jobApplicationService.updateJobApplication(application_id, status);
        if (application == null) {
                log.info("Job application with " + application_id + " does not exist.");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "There are no records of Job application by given ID.");

        }
        mailService.sendMail(candidateEmail,
                String.format("Dear %s,\n Your job application status has changed from \"%s\" to \"%s\".\n" +
                        "To see the job details please check this link \n%s",
                        candidate.getFullname(), oldStatus, status, "http://localhost:3000/jobdetail/"+application.jobPostId()));
        return application;
    }


    // Test amaçlı veritabanındaki bütün başvuruları getiren method
    @GetMapping("/jobapplication/all")
    public List<JobApplication> allApplications() {
        return jobApplicationService.findAll();
    }
}
