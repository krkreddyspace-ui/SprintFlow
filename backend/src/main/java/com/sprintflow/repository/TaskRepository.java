package com.sprintflow.repository;

import com.sprintflow.model.Task;
import com.sprintflow.model.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {

    List<Task> findByProjectId(UUID projectId);

    List<Task> findByProjectIdAndSprintId(UUID projectId, UUID sprintId);

    List<Task> findByProjectIdAndSprintIdIsNull(UUID projectId); // Backlog tasks

    List<Task> findByProjectIdAndStatus(UUID projectId, TaskStatus status);

    Optional<Task> findByProjectIdAndKey(UUID projectId, String key);
}
