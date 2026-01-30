# Implementation Plan: SmartMate AI

> Generated on: 2026-01-30
> Status: Phase 1 (Planning)

---

## 📋 Pre-Implementation Checklist

- [x] Signup redirect issue fixed [Phase 0]
- [x] Firebase Authentication working
- [x] Firestore connected
- [ ] PRD analyzed and understood
- [ ] This plan reviewed and approved by user

---

## 🎯 Project Overview

**Application:** SmartMate AI
**Type:** Personal AI Assistant (Productivity & Wellbeing)
**Description:** A voice-first, conversation-driven personal assistant that helps users reduce stress, manage tasks, and plan daily routines.

---

## 👥 User Roles & Permissions

### Role 1: User
- **Description:** Standard user accessing personal assistant features.
- **Can Access:** Dashboard, Task Management, AI Chat, Routine Planner, Settings.
- **Cannot Access:** System-wide admin settings, other users' data.

### Role 2: Admin
- **Description:** System administrator managing platform health and policies.
- **Can Access:** System metrics, User management (safely), Security settings.
- **Cannot Access:** Personal user conversations (privacy first).

---

## 🗃️ Database Schema

### Collection: `users`
```javascript
{
  uid: string,              // Firebase Auth UID
  email: string,            // User email
  name: string,             // Display name
  role: string,             // 'user' | 'admin'
  preferences: {
    voiceEnabled: boolean,
    theme: string,
    notifications: boolean
  },
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Collection: `tasks`
```javascript
{
  id: string,
  userId: string,           // Owner
  title: string,
  description: string,
  status: string,           // 'pending' | 'completed' | 'deferred'
  dueDate: timestamp,
  priority: string,         // 'low' | 'medium' | 'high'
  createdAt: timestamp
}
```

### Collection: `routines`
```javascript
{
  id: string,
  userId: string,
  name: string,             // e.g., "Morning Routine"
  steps: array,             // [{ task: "Wake up", time: "07:00" }, ...]
  isActive: boolean,
  createdAt: timestamp
}
```

### Collection: `chat_sessions`
```javascript
{
  id: string,
  userId: string,
  title: string,            // Auto-generated or custom
  lastMessageAt: timestamp,
  createdAt: timestamp
}
```

### Collection: `messages` (Sub-collection of chat_sessions)
```javascript
{
  id: string,
  role: string,             // 'user' | 'assistant' | 'system'
  content: string,
  timestamp: timestamp,
  metadata: object          // Optional: context, attachments
}
```

---

## 🚀 Implementation Tasks

### Phase A: Foundation (Tasks A1-A2)

#### Task A1: User Profile & Preferences
- **Priority:** HIGH
- **Description:** Enhance AuthContext to handle user profiles and preferences.
- **Files:** `src/context/AuthContext.tsx`, `src/services/userService.ts`
- **Acceptance Criteria:**
  - [ ] User document created with default preferences on signup
  - [ ] Users can update their display name and settings

#### Task A2: Role-Based Routing
- **Priority:** HIGH
- **Description:** Implement `AdminRoute` and role checks.
- **Files:** `src/components/RoleBasedRoute.tsx`
- **Acceptance Criteria:**
  - [ ] Users redirected to Dashboard
  - [ ] Admins redirected to Admin Panel (placeholder)

---

### Phase B: Core Features (Tasks B1-B3)

#### Task B1: Task Management System
- **Priority:** HIGH
- **Description:** CRUD operations for individual tasks.
- **Files:** `src/services/taskService.ts`, `src/components/TaskBoard.tsx`
- **Acceptance Criteria:**
  - [ ] Create, Read, Update, Delete tasks
  - [ ] Filter by status and priority

#### Task B2: Routine Planner
- **Priority:** MEDIUM
- **Description:** Interface to create and manage daily routines.
- **Files:** `src/services/routineService.ts`, `src/components/RoutineBuilder.tsx`
- **Acceptance Criteria:**
  - [ ] Create multi-step routines
  - [ ] View active routines

#### Task B3: Chat Interface (UI Only)
- **Priority:** HIGH
- **Description:** Build the chat UI for interacting with SmartMate.
- **Files:** `src/components/ChatInterface.tsx`
- **Acceptance Criteria:**
  - [ ] Responsive chat window
  - [ ] Message history display (mock/local first)

---

### Phase C: Polish & Security

#### Task C1: Security Rules
- **Priority:** HIGH
- **Description:** Deploy Firestore rules for data isolation.
- **Acceptance Criteria:**
  - [ ] Users only access their own data
  - [ ] Admins have oversight where permitted

---

## ⚠️ AI Features (Requires Explicit Approval)

| Feature | Description | Implementation Complexity | Approved? |
|---------|-------------|---------------------------|-----------|
| **AI Chat Bot** | Connect Chat Interface to Gemini/OpenAI API | High | ⏳ Pending |
| **Voice Interaction** | Text-to-Speech and Speech-to-Text integration | Medium | ⏳ Pending |
| **Smart Suggestions** | Analyze tasks to suggest priorities | Medium | ⏳ Pending |

---

## 📊 Progress Tracker

| Task | Status | Committed |
|------|--------|-----------|
| Phase 0 | ✅ Complete | Yes |
| A1 | ⏳ Pending | - |
| A2 | ⏳ Pending | - |
| B1 | ⏳ Pending | - |
| B2 | ⏳ Pending | - |
| B3 | ⏳ Pending | - |
