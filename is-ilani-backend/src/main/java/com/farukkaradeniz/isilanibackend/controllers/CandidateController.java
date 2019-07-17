package com.farukkaradeniz.isilanibackend.controllers;

import com.farukkaradeniz.isilanibackend.models.Candidate;
import com.farukkaradeniz.isilanibackend.services.CandidateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api")
public class CandidateController {
    private Logger log = LoggerFactory.getLogger(CandidateController.class);

    private CandidateService candidateService;

    @Autowired
    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }


    @GetMapping("/candidate/{id}")
    public Candidate getCandidate(
            @PathVariable("id") String id
    ) {
        Candidate candidate = candidateService.getCandidateById(id);
        if (candidate == null) {
            log.info("Candidate with " + id + " does not exist.");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "There are no records of Candidates by given ID.");
        }
        log.info("Candidate with given " + id + " exist." + "With the fullname of \"" + candidate.getFullname() + "\".");
        return candidate;


    }

    @PostMapping("/candidate")
    @ResponseStatus(HttpStatus.CREATED)
    public Candidate addCandidate(
            @RequestBody Candidate candidate
    ) {
        return candidateService.addCandidate(candidate);
    }

    @PutMapping("/candidate/{id}")
    public Candidate blacklistCandidate(
            @PathVariable("id") String id,
            @RequestBody Candidate candidate
    ) {
        return candidateService.blacklistCandidate(id, candidate);
    }





    //TODO myprofile sayfası authorizedclient falan alacak parametre olarak   ve profilecontroller sınıfında olacak


}
