package com.farukkaradeniz.isilanibackend.repositories;

import com.farukkaradeniz.isilanibackend.models.Candidate;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateRepository extends CrudRepository<Candidate, Long> {

}
