// ==========================================
// User & Role Domain Models
// ==========================================
export type Role = 'ADMIN' | 'PROJECT_MANAGER' | 'DEVELOPER' | 'VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: Role;
  createdAt: string;
}

// ==========================================
// Workspace & Project Domain Models
// ==========================================
export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string;
  ownerId: string;
  membersCount: number;
}

export interface Project {
  id: string;
  workspaceId: string;
  key: string; // e.g. "SF" for SprintFlow
  name: string;
  description: string;
  leadId: string;
  leadName: string;
  taskCount: number;
  completedTaskCount: number;
  createdAt: string;
}

// ==========================================
// Sprint Domain Models
// ==========================================
export type SprintStatus = 'PLANNED' | 'ACTIVE' | 'COMPLETED';

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  goal?: string;
  status: SprintStatus;
  startDate: string;
  endDate: string;
  totalStoryPoints: number;
  completedStoryPoints: number;
}

// ==========================================
// Task Domain Models
// ==========================================
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type TaskType = 'STORY' | 'BUG' | 'TASK' | 'EPIC';

export interface Comment {
  id: string;
  taskId: string;
  author: User;
  content: string;
  createdAt: string;
}

export interface Task {
  id: string;
  key: string; // e.g., "SF-101"
  projectId: string;
  sprintId?: string | null;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  type: TaskType;
  storyPoints?: number;
  assignee?: User | null;
  reporter: User;
  dueDate?: string;
  labels: string[];
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// Analytics & Dashboard Metrics
// ==========================================
export interface ProjectMetrics {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  velocity: number; // Avg story points per sprint
  completionRate: number; // percentage (0-100)
}

// ==========================================
// Activity & Notification Models
// ==========================================
export interface ActivityLog {
  id: string;
  taskId?: string;
  taskKey?: string;
  user: User;
  action: string; // e.g. "moved SF-101 to Done", "created sprint Sprint 2"
  timestamp: string;
}
