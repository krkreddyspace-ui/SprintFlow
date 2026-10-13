# SprintFlow — Enterprise Project & Sprint Management Platform

SprintFlow is an enterprise-grade Agile project management platform inspired by Jira and Linear. It empowers modern software engineering teams to manage workspaces, track sprints, prioritize tasks across real-time Kanban boards, and monitor delivery velocity with end-to-end security and multi-tenant isolation.

---

## 🛠️ Architecture & Tech Stack

```
SprintFlow (Modular Monolith)
├── Client Tier:       React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, React Router
├── Application Tier:  Spring Boot 3, Java 21, Spring Security (Stateless JWT), Spring Data JPA, Hibernate, Bean Validation
├── Persistence Tier:  PostgreSQL, Flyway Database Migrations
└── DevOps & Tooling:  Docker Compose, Maven, JUnit 5, Mockito, GitHub Actions
```

---

## 📁 Repository Structure

```
SprintFlow _JFS/
├── .gitignore               # Comprehensive Git ignore rules for Java & Node
├── README.md                # System documentation & setup guide
├── frontend/                # React 19 + TypeScript SPA
│   ├── src/
│   │   ├── components/      # Reusable UI Primitives (Badge, Button, Input, Modal)
│   │   ├── layouts/         # AppShell, Collapsible Sidebar, TopNav
│   │   ├── mock/            # Domain-realistic sample datasets for Phase 1
│   │   ├── pages/           # Dashboard, Projects, Kanban Board, Backlog, Analytics, Login
│   │   ├── types/           # TypeScript domain contracts (Task, Sprint, User, Role)
│   │   ├── utils/           # Helper utilities (cn tailwind-merge)
│   │   ├── App.tsx          # Client-side route declarations
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── backend/                 # Spring Boot application (Phase 2)
```

---

## 🚀 Getting Started (Frontend)

### Prerequisites
- **Node.js**: v18+ (tested on Node v24)
- **npm**: v9+

### Run Locally
```bash
# Navigate to the frontend directory
cd frontend

# Start the Vite development server with HMR
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧭 Product Development Roadmap

- [x] **Phase 0: Workspace & Toolchain Inspection**
- [x] **Phase 1: UI/UX Design and Frontend Foundation**
  - [x] Scaffolding with Vite + React 19 + TypeScript + Tailwind CSS
  - [x] Reusable Design System Components (`Button`, `Badge`, `Modal`, `Input`)
  - [x] Collapsible Sidebar & Top Navigation App Shell
  - [x] KPI Dashboard with Active Sprint Progress & Audit Stream
  - [x] Kanban Board with 4 Status Columns & Task Detail Dialog
  - [x] Sprint Backlog with Story Point aggregations
  - [x] Velocity & Delivery Analytics
  - [x] Authentication & Demo Persona Switcher View
- [ ] **Phase 2: Backend Foundation & Database (Spring Boot + PostgreSQL + Flyway)**
- [ ] **Phase 3: Authentication & Authorization (Spring Security + JWT)**
- [ ] **Phase 4: Workspace and Project Management APIs**
- [ ] **Phase 5: Task Management & Kanban Backend Integration**
- [ ] **Phase 6: Sprint Planning & Analytics Backend**
- [ ] **Phase 7: Real-Time Updates & Notifications**
- [ ] **Phase 8: Automated Testing & Code Quality**
- [ ] **Phase 9: Docker, CI/CD & Deployment**
