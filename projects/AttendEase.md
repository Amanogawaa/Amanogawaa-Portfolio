# AttendEase

AttendEase is a role-based event management and attendance tracking platform for academic organizations.

At a high level, it supports three user types:
- **Students**: register for events, submit attendance proof, and answer feedback forms
- **Organizers**: create and manage events, review participants, and generate reports/certificates
- **Admins**: approve/reject events, monitor attendance and feedback, and view analytics

## Repository status

This repository currently contains **two application tracks**:

1. **Root app (`/`)** – a new Next.js 15 codebase (currently scaffold-level, not yet feature-complete)
2. **Legacy full implementation (`/transitioning...`)** – Angular frontend + PHP API backend + MySQL schema used for the complete AttendEase workflow.  
   > Note: `transitioning...` is the repository’s current literal folder name.

If you want to understand the full business functionality today, focus on `transitioning...`.

## Core capabilities (implemented in legacy app)

- Authentication and role-based access (student, organizer, admin)
- Event lifecycle management (create, edit, approve, reject, cancel, end)
- Event registration and unregistration
- Attendance submission and marking (including uploaded attendance images)
- Event feedback collection and per-user feedback review
- Organizer and admin dashboards with analytics (courses, year levels, blocks, totals, activity logs)
- Organizer/admin reports for upcoming, ongoing, and done events
- Certificate-related event/user retrieval
- Basic in-app messaging/conversations endpoints
- Organizer account activation and profile update workflows

## Architecture overview

### 1) Next.js app (root)
- **Framework**: Next.js 15 + React 19 + TypeScript
- **Styling/UI**: Tailwind CSS v4, shadcn-style UI utilities
- **Purpose**: migration target / modern frontend foundation

### 2) Legacy frontend
- **Path**: `transitioning.../AttendEase`
- **Framework**: Angular 17
- **Notable modules**:
  - `auth` (login, student signup, organizer signup)
  - `modules/user` (dashboard, events, attendance, feedback, profile, history)
  - `modules/organizer` (dashboard, events, reports, attendance submissions, feedback views)
  - `modules/admin` (dashboard, approvals, attendance lists, feedback review, analytics)

### 3) Legacy backend API
- **Path**: `transitioning.../backend/api`
- **Stack**: PHP + PDO + MySQL
- **Entry/router**: `routes.php`
- **Main API modules**:
  - `Student.php` / `GetStudent.php`
  - `Event.php` / `GetEvent.php`
  - `Approval.php`
  - `Analytics.php`
  - `post.php` / `get.php`
  - `Notification.php`

### 4) Database
- **Schema dump**: `transitioning.../attendease (4).sql`
- **Key tables**:
  - `user`, `roles`
  - `events`, `event_approval`, `event_registration`
  - `attendance`, `feedback`
  - `conversations`, `conversation_messages`
  - `profile_update_requests`

## Project structure

```text
.
├── app/                         # Next.js app router pages (new track)
├── components/                  # Shared React UI components
├── lib/                         # Utility functions
├── transitioning.../
│   ├── AttendEase/              # Legacy Angular frontend
│   ├── backend/                 # Legacy PHP backend + Composer deps
│   ├── attendease (4).sql       # MySQL schema/data dump
│   └── README.md                # Placeholder file
└── README.md
```

## Getting started

### A) Run the Next.js app (root)

```bash
cd <project-root>
npm install
npm run dev
```

Open `http://localhost:3000`.

#### Available root scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
```

### B) Run the legacy full app

#### 1. Angular frontend

```bash
cd <project-root>/transitioning.../AttendEase
npm install
npm start
```

Default URL: `http://localhost:4200`

#### 2. PHP backend API

- Backend expects API base path: `http://localhost/attendease/backend/api/`
- Database config is in:
  - `<project-root>/transitioning.../backend/api/config/database.php`
- Environment key is read from:
  - `<project-root>/transitioning.../backend/api/.env`

Typical local setup is Apache/Nginx + PHP serving the `backend/api` directory, with MySQL database named `attendease`.

#### 3. Import database

Import:
- `<project-root>/transitioning.../attendease (4).sql`

## API surface (legacy)

Endpoints are routed in:
- `<project-root>/transitioning.../backend/api/routes.php`

Main endpoint groups include:
- Auth/users: `login`, `adduser`, `users`, `roles`, `edituser`, `edituserrole`
- Events: `events`, `allevents`, `addevent`, `editevent`, `deleteevent`, `register`, `unregister`, `cancelevent`, `endevent`
- Approval/admin: `approveevent`, `rejectevent`, `updatetime`, attendance and feedback retrieval endpoints
- Analytics: `getcoursecount`, `getyearlevelcount`, `getblockcount`, `getdashboarddata`, report endpoints
- Messaging: conversation/message retrieval and `sendmessage`

## Development notes

- The root Next.js app is currently mostly scaffold code from `create-next-app` and is likely the migration direction.
- The legacy Angular + PHP stack contains the production-style feature set today.
- API URLs in Angular services are currently hardcoded to localhost paths and may need environment-based configuration for deployment.

## Validation snapshot

From baseline checks in this repository:
- `npm run lint` (root) currently fails due existing non-JSON content inside `transitioning.../userdata.json`
- `npm run build` (root) currently fails in this environment because Google Fonts fetch for `Geist`/`Geist Mono` is blocked

These are pre-existing/environmental issues and not caused by README changes.
