package org.example.repo;

import org.example.entity.Summary;
import org.springframework.data.jpa.repository.JpaRepository;



public interface SummaryRepo extends JpaRepository<Summary,Long> {

}
