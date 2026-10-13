package com.sprintflow.dto;

import com.sprintflow.model.User;
import com.sprintflow.model.enums.Role;

import java.time.OffsetDateTime;
import java.util.UUID;

public record UserResponseDto(
        UUID id,
        String email,
        String fullName,
        Role role,
        String avatarUrl,
        OffsetDateTime createdAt
) {
    public static UserResponseDto fromEntity(User user) {
        if (user == null) return null;
        return new UserResponseDto(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getRole(),
                user.getAvatarUrl(),
                user.getCreatedAt()
        );
    }
}
