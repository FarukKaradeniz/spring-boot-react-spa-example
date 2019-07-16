package com.farukkaradeniz.isilanibackend.repositories;

import com.farukkaradeniz.isilanibackend.models.JobPost;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobPostRepository extends CrudRepository<JobPost, String> {
    List<JobPost> getAllByIsAvailableIsTrue();
    List<JobPost> getAllByIsAvailableIsFalse();
}
