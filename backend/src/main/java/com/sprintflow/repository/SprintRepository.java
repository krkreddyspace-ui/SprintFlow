package com.sprintflow.repository;

import com.sprintflow.model.Sprint;
import com.sprintflow.model.enums.SprintStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SprintRepository extends JpaRepository<Sprint, UUID> {

    List<Sprint> findByProjectId(UUID projectId);

    List<Sprint> findByProjectIdAndStatus(UUID projectId, SprintStatus status);
}
