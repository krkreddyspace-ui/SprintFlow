package com.sprintflow.repository;

import com.sprintflow.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {

    List<Project> findByWorkspaceId(UUID workspaceId);

    Optional<Project> findByWorkspaceIdAndKey(UUID workspaceId, String key);

    boolean existsByWorkspaceIdAndKey(UUID workspaceId, String key);
}
