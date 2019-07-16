package com.farukkaradeniz.isilanibackend.services;

import com.farukkaradeniz.isilanibackend.models.Candidate;
import com.farukkaradeniz.isilanibackend.repositories.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService {

    private CandidateRepository candidateRepository;

    @Autowired
    public CandidateService(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    public List<Candidate> findAll() {
        return (List<Candidate>) candidateRepository.findAll();
    }

}
