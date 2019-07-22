package com.farukkaradeniz.isilanibackend.repositories;

import com.farukkaradeniz.isilanibackend.models.Candidate;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateRepository extends CrudRepository<Candidate, String> {
    boolean existsByEmail(String email);
    boolean existsByEmailAndPassword(String email, String password);
    Candidate findByEmailEqualsAndPasswordEquals(String email, String password);
}
