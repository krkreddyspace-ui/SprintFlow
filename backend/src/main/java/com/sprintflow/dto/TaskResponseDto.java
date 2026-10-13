package com.sprintflow.dto;

import com.sprintflow.model.Task;
import com.sprintflow.model.enums.TaskPriority;
import com.sprintflow.model.enums.TaskStatus;
import com.sprintflow.model.enums.TaskType;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

public record TaskResponseDto(
        UUID id,
        String key,
        UUID projectId,
        UUID sprintId,
        String title,
        String description,
        TaskStatus status,
        TaskPriority priority,
        TaskType type,
        Integer storyPoints,
        UserResponseDto assignee,
        UserResponseDto reporter,
        LocalDate dueDate,
        String labels,
        Long version,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {
    public static TaskResponseDto fromEntity(Task task) {
        if (task == null) return null;
        return new TaskResponseDto(
                task.getId(),
                task.getKey(),
                task.getProject().getId(),
                task.getSprint() != null ? task.getSprint().getId() : null,
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getPriority(),
                task.getType(),
                task.getStoryPoints(),
                UserResponseDto.fromEntity(task.getAssignee()),
                UserResponseDto.fromEntity(task.getReporter()),
                task.getDueDate(),
                task.getLabels(),
                task.getVersion(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }
}
