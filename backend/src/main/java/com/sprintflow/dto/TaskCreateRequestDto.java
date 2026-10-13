package com.sprintflow.dto;

import com.sprintflow.model.enums.TaskPriority;
import com.sprintflow.model.enums.TaskStatus;
import com.sprintflow.model.enums.TaskType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

public record TaskCreateRequestDto(
        @NotNull(message = "Project ID is required")
        UUID projectId,

        UUID sprintId,

        @NotBlank(message = "Task title is required")
        @Size(min = 3, max = 255, message = "Task title must be between 3 and 255 characters")
        String title,

        String description,

        @NotNull(message = "Status is required")
        TaskStatus status,

        @NotNull(message = "Priority is required")
        TaskPriority priority,

        @NotNull(message = "Type is required")
        TaskType type,

        @Min(value = 1, message = "Story points must be at least 1")
        @Max(value = 100, message = "Story points cannot exceed 100")
        Integer storyPoints,

        UUID assigneeId,

        LocalDate dueDate,

        String labels
) {
}
