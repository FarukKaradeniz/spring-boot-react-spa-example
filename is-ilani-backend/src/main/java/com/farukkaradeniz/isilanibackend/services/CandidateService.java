package com.farukkaradeniz.isilanibackend.services;

import com.farukkaradeniz.isilanibackend.models.Candidate;
import com.farukkaradeniz.isilanibackend.models.JobApplication;
import com.farukkaradeniz.isilanibackend.repositories.CandidateRepository;
import com.farukkaradeniz.isilanibackend.repositories.JobApplicationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class CandidateService {
    private Logger log = LoggerFactory.getLogger(CandidateService.class);

    private CandidateRepository candidateRepository;
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    public CandidateService(CandidateRepository candidateRepository, JobApplicationRepository jobApplicationRepository) {
        this.candidateRepository = candidateRepository;
        this.jobApplicationRepository = jobApplicationRepository;
    }

    public List<Candidate> findAll() {
        return (List<Candidate>) candidateRepository.findAll();
    }

    public Candidate getCandidateById(String id) {
        if (candidateRepository.findById(id).isPresent()) {
            return candidateRepository.findById(id).get();
        }
        return null;
    }

    public Candidate addCandidate(Candidate candidate) {
        candidate.setUserId(UUID.randomUUID().toString());
        candidate.setApplications(Collections.emptyList());
        candidate.setInBlacklist(false);
        log.info("Adding candidate with values of: " + candidate.toString());
        return candidateRepository.save(candidate);
    }

    public Candidate blacklistCandidate(String id, Candidate candidate) {
        log.info("Updating candidate with id of: " + id);
        Candidate candidateById = getCandidateById(id);
        boolean added2Blacklist = !candidateById.getInBlacklist() && candidate.getInBlacklist();
        log.info("Old candidate details: " + candidateById.toString());
        candidateById.setInBlacklist(candidate.getInBlacklist());
        Candidate saved = candidateRepository.save(candidateById);
        log.info("New candidate details: " + saved.toString());

        if (added2Blacklist) { // kişi daha önceden blacklistte değil ve blackliste eklendiyse çalışcak blok
            log.info("Candidate added to blacklist");
            List<JobApplication> jobApplications = jobApplicationRepository.findAllByCandidate_UserId(id);
            jobApplications.forEach(
                    jobApplication -> {
                        jobApplication.setStatus("RED");
                        jobApplicationRepository.save(jobApplication);
                    }
            );
        }
        return saved;
    }
}
