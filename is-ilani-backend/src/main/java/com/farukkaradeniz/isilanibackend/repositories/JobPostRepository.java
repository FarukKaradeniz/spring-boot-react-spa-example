package com.farukkaradeniz.isilanibackend.repositories;

import com.farukkaradeniz.isilanibackend.models.JobPost;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostRepository extends CrudRepository<JobPost, Long> {
    JobPost findByTitle(String title);
}
