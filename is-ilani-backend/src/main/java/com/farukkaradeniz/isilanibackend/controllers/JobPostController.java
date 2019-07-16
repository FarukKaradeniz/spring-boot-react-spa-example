package com.farukkaradeniz.isilanibackend.controllers;

import com.farukkaradeniz.isilanibackend.services.JobPostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class JobPostController {

    Logger log = LoggerFactory.getLogger(JobPostController.class);

    private JobPostService jobPostService;

    @Autowired
    public JobPostController(JobPostService jobPostService) {
        this.jobPostService = jobPostService;
    }


//    @GetMapping("/posts")
//    public String getJobPosts(@RequestParam("title") String title) {
//        log.info("getJobPosts", "just got here");
//
//        JobPost jobPost = jobPostRepository.findByTitle(title);
//        log.info("bu", jobPost.getTitle());
//
//
//        return "here";
//    }

}
