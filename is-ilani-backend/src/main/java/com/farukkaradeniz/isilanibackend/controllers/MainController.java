package com.farukkaradeniz.isilanibackend.controllers;

import com.farukkaradeniz.isilanibackend.models.Candidate;
import com.farukkaradeniz.isilanibackend.models.EmailPasswordModel;
import com.farukkaradeniz.isilanibackend.services.CandidateService;
import com.farukkaradeniz.isilanibackend.utils.BasicUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
public class MainController {
    private static Logger log = LoggerFactory.getLogger(MainController.class);
    private CandidateService candidateService;

    @Autowired
    public MainController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @GetMapping(value = "/")
    public String home() {
        return "Home";
    }

    @PostMapping(value = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> signup(
            @RequestBody EmailPasswordModel model,
            @RequestParam("fullname") String fullname
            ) {
        boolean ifExist = candidateService.isCandidateExist(model.getEmail());
        if (ifExist) {
            return new ResponseEntity<>("This email is already in use", HttpStatus.CONFLICT);
        }

        Candidate candidate = new Candidate(fullname,
                model.getEmail(), "", "",
                false, Collections.emptyList());
        candidate.setPassword(model.getPassword());

        candidateService.addCandidate(candidate);

        return new ResponseEntity<>("Success", HttpStatus.CREATED);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<String> test(
            @RequestBody EmailPasswordModel model
    ) {

        HttpHeaders headers = new HttpHeaders();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof LdapUserDetails) {

            String username = ((LdapUserDetails) authentication.getPrincipal()).getUsername();
            String password = ((LdapUserDetails) authentication.getPrincipal()).getPassword();
            log.info("LDAP AUTH-" + username + "::" + password);
            headers.set("Authorization", "Basic " + BasicUtil.encodeBase64(username, password));
            headers.set("Role", "ADMIN");
            return ResponseEntity.ok().headers(headers).body("Success");
        }
        else if (authentication instanceof UsernamePasswordAuthenticationToken) {
            String email = authentication.getPrincipal().toString();
            String password = authentication.getCredentials().toString();
            log.info("JDBC AUTH-" + email + "::" + password);
            headers.set("Authorization", "Basic " + BasicUtil.encodeBase64(email, password));
            headers.set("Role", "USER");
            headers.set("USER_ID",
                    candidateService.findCandidateByEmailAndPassword(
                            new EmailPasswordModel(email, password)).getUserId());
            return ResponseEntity.ok().headers(headers).body("Success");
        }

        log.error("Failure authentication");
        return new ResponseEntity<>("Failure", HttpStatus.BAD_REQUEST);
    }
}
