package com.farukkaradeniz.isilanibackend.controllers;

import com.farukkaradeniz.isilanibackend.models.Candidate;
import com.farukkaradeniz.isilanibackend.models.EmailPasswordModel;
import com.farukkaradeniz.isilanibackend.services.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ProfilController {
    private CandidateService candidateService;

    @Autowired
    public ProfilController(CandidateService candidateService){
        this.candidateService = candidateService;
    }

    @GetMapping("/myprofil")
    public ResponseEntity<Candidate> getMyProfil() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getPrincipal().toString();
        String password = authentication.getCredentials().toString();

        Candidate candidate = candidateService
                .findCandidateByEmailAndPassword(new EmailPasswordModel(email, password));

        return new ResponseEntity<>(candidate, HttpStatus.OK);
    }

    @PutMapping("/myprofil")
    public ResponseEntity<Candidate> updateProfil(
            @RequestBody Candidate candidate
    ) {
        Candidate candidateById = candidateService.getCandidateById(candidate.getUserId());
        candidateById.setSkills(candidate.getSkills());
        candidateById.setProfileImg(candidate.getProfileImg());
        Candidate savedCandidate = candidateService.saveCandidate(candidateById);
        return new ResponseEntity<>(savedCandidate, HttpStatus.OK);
    }

}