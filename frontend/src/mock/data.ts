import type { User, Workspace, Project, Sprint, Task, ActivityLog, ProjectMetrics } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u-1',
    name: 'Sarah Connor',
    email: 'sarah.connor@sprintflow.dev',
    role: 'ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    createdAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'u-2',
    name: 'Alex Rivera',
    email: 'alex.rivera@sprintflow.dev',
    role: 'PROJECT_MANAGER',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    createdAt: '2026-01-16T10:30:00Z',
  },
  {
    id: 'u-3',
    name: 'Marcus Vance',
    email: 'marcus.v@sprintflow.dev',
    role: 'DEVELOPER',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    createdAt: '2026-02-01T14:10:00Z',
  },
  {
    id: 'u-4',
    name: 'Priya Sharma',
    email: 'priya.sharma@sprintflow.dev',
    role: 'DEVELOPER',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    createdAt: '2026-02-03T11:45:00Z',
  },
];

export const currentMockUser = mockUsers[0];

export const mockWorkspace: Workspace = {
  id: 'ws-100',
  name: 'Acme Cloud Engineering',
  slug: 'acme-cloud',
  description: 'Enterprise production systems and developer platform',
  ownerId: 'u-1',
  membersCount: 14,
};

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    workspaceId: 'ws-100',
    key: 'SF',
    name: 'SprintFlow Platform Core',
    description: 'Enterprise project tracking platform with Spring Boot backend & React UI',
    leadId: 'u-2',
    leadName: 'Alex Rivera',
    taskCount: 32,
    completedTaskCount: 18,
    createdAt: '2026-02-10T08:00:00Z',
  },
  {
    id: 'proj-2',
    workspaceId: 'ws-100',
    key: 'PAY',
    name: 'Global Payment Gateway',
    description: 'PCI-DSS compliant payment processing and recurring billing engine',
    leadId: 'u-1',
    leadName: 'Sarah Connor',
    taskCount: 24,
    completedTaskCount: 12,
    createdAt: '2026-02-15T09:30:00Z',
  },
];

export const mockSprints: Sprint[] = [
  {
    id: 'sp-14',
    projectId: 'proj-1',
    name: 'Sprint 14: Security & Multi-Tenancy',
    goal: 'Deliver JWT authentication, workspace boundary protection, and Kanban MVP',
    status: 'ACTIVE',
    startDate: '2026-10-01T00:00:00Z',
    endDate: '2026-10-15T23:59:59Z',
    totalStoryPoints: 34,
    completedStoryPoints: 21,
  },
  {
    id: 'sp-15',
    projectId: 'proj-1',
    name: 'Sprint 15: Velocity Analytics & Real-Time',
    goal: 'Complete burndown calculations and WebSocket live board updates',
    status: 'PLANNED',
    startDate: '2026-10-16T00:00:00Z',
    endDate: '2026-10-30T23:59:59Z',
    totalStoryPoints: 28,
    completedStoryPoints: 0,
  },
];

export const mockTasks: Task[] = [
  {
    id: 'task-101',
    key: 'SF-101',
    projectId: 'proj-1',
    sprintId: 'sp-14',
    title: 'Implement Spring Security JwtAuthenticationFilter',
    description: 'Intercept incoming requests, parse Authorization Bearer header, validate signature using HMAC-SHA256, and populate SecurityContextHolder.',
    status: 'DONE',
    priority: 'CRITICAL',
    type: 'TASK',
    storyPoints: 5,
    assignee: mockUsers[2], // Marcus Vance
    reporter: mockUsers[1], // Alex Rivera
    dueDate: '2026-10-08',
    labels: ['backend', 'security', 'jwt'],
    commentsCount: 4,
    createdAt: '2026-10-02T10:00:00Z',
    updatedAt: '2026-10-08T16:30:00Z',
  },
  {
    id: 'task-102',
    key: 'SF-102',
    projectId: 'proj-1',
    sprintId: 'sp-14',
    title: 'Implement multi-tenant workspace isolation queries in JPA',
    description: 'Ensure all findById queries verify workspace_id to strictly prevent cross-tenant data leaks and unauthorized ID enumeration.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    type: 'STORY',
    storyPoints: 8,
    assignee: mockUsers[3], // Priya Sharma
    reporter: mockUsers[0], // Sarah Connor
    dueDate: '2026-10-14',
    labels: ['backend', 'database', 'multi-tenancy'],
    commentsCount: 2,
    createdAt: '2026-10-03T11:00:00Z',
    updatedAt: '2026-10-12T09:15:00Z',
  },
  {
    id: 'task-103',
    key: 'SF-103',
    projectId: 'proj-1',
    sprintId: 'sp-14',
    title: 'Interactive drag-and-drop Kanban state transitions',
    description: 'Allow moving tasks across columns with optimistic UI updates and server rollback on HTTP 409 or network failure.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    type: 'STORY',
    storyPoints: 8,
    assignee: mockUsers[2], // Marcus Vance
    reporter: mockUsers[1], // Alex Rivera
    dueDate: '2026-10-15',
    labels: ['frontend', 'kanban', 'ui/ux'],
    commentsCount: 5,
    createdAt: '2026-10-04T13:20:00Z',
    updatedAt: '2026-10-12T14:40:00Z',
  },
  {
    id: 'task-104',
    key: 'SF-104',
    projectId: 'proj-1',
    sprintId: 'sp-14',
    title: 'Add Flyway migration for tasks and sprint story points',
    description: 'Create V1__init_schema.sql and V2__add_sprint_points.sql with foreign keys, cascading rules, and composite indexes.',
    status: 'DONE',
    priority: 'MEDIUM',
    type: 'TASK',
    storyPoints: 3,
    assignee: mockUsers[3], // Priya Sharma
    reporter: mockUsers[1], // Alex Rivera
    dueDate: '2026-10-06',
    labels: ['database', 'flyway', 'sql'],
    commentsCount: 1,
    createdAt: '2026-10-02T15:00:00Z',
    updatedAt: '2026-10-05T18:00:00Z',
  },
  {
    id: 'task-105',
    key: 'SF-105',
    projectId: 'proj-1',
    sprintId: 'sp-14',
    title: 'Review CORS preflight handling for custom headers',
    description: 'Ensure Spring Web CorsConfiguration permits Authorization header and OPTIONS preflights without 403 Forbidden.',
    status: 'IN_REVIEW',
    priority: 'MEDIUM',
    type: 'BUG',
    storyPoints: 2,
    assignee: mockUsers[0], // Sarah Connor
    reporter: mockUsers[2], // Marcus Vance
    dueDate: '2026-10-13',
    labels: ['security', 'cors', 'spring-boot'],
    commentsCount: 3,
    createdAt: '2026-10-07T09:40:00Z',
    updatedAt: '2026-10-12T16:20:00Z',
  },
  {
    id: 'task-106',
    key: 'SF-106',
    projectId: 'proj-1',
    sprintId: 'sp-14',
    title: 'Implement optimistic locking with @Version on Task entity',
    description: 'Prevent lost updates when multiple developers modify task descriptions or assignees simultaneously.',
    status: 'TODO',
    priority: 'HIGH',
    type: 'STORY',
    storyPoints: 5,
    assignee: null, // Unassigned
    reporter: mockUsers[1],
    dueDate: '2026-10-15',
    labels: ['backend', 'concurrency', 'jpa'],
    commentsCount: 0,
    createdAt: '2026-10-10T11:00:00Z',
    updatedAt: '2026-10-10T11:00:00Z',
  },
  {
    id: 'task-107',
    key: 'SF-107',
    projectId: 'proj-1',
    sprintId: null, // In Backlog
    title: 'Design burndown chart calculation logic',
    description: 'Aggregate remaining story points per day across the sprint timeline to render ideal vs. actual burndown curve.',
    status: 'TODO',
    priority: 'LOW',
    type: 'STORY',
    storyPoints: 5,
    assignee: null,
    reporter: mockUsers[1],
    dueDate: '2026-10-25',
    labels: ['analytics', 'charts', 'backend'],
    commentsCount: 1,
    createdAt: '2026-10-11T14:30:00Z',
    updatedAt: '2026-10-11T14:30:00Z',
  },
];

export const mockMetrics: ProjectMetrics = {
  totalTasks: 32,
  completedTasks: 18,
  inProgressTasks: 9,
  overdueTasks: 2,
  velocity: 28, // avg story points completed
  completionRate: 56.25,
};

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'act-1',
    taskKey: 'SF-105',
    user: mockUsers[0],
    action: 'submitted code review on CORS preflight handling',
    timestamp: '15 minutes ago',
  },
  {
    id: 'act-2',
    taskKey: 'SF-103',
    user: mockUsers[2],
    action: 'moved task from To Do to In Progress',
    timestamp: '2 hours ago',
  },
  {
    id: 'act-3',
    taskKey: 'SF-101',
    user: mockUsers[2],
    action: 'marked task as Done',
    timestamp: 'Yesterday at 4:30 PM',
  },
  {
    id: 'act-4',
    user: mockUsers[1],
    action: 'started Sprint 14: Security & Multi-Tenancy',
    timestamp: 'Oct 1, 2026',
  },
];
