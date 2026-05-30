# CommunityCare

CommunityCare is a full-stack community census and mapping project.  
It combines:

- a **Django REST API** for managing household and resident census records, and
- a **React + Leaflet web app** for visualizing barangay locations on an interactive map.

The project appears focused on local government/community profiling use cases (for example, barangay-level demographic and household data collection).

## What this project is for

This repository is designed to support community data management by:

- storing structured census records (families, members, location, civil-status reference data),
- exposing CRUD APIs with JWT authentication,
- enabling filtered/searchable/paginated access to records,
- providing a map-based frontend for geographic context.

## Repository structure

```text
CommunityCare/
├── backend/
│   ├── README.md
│   └── CommunityCare/              # Django project root
│       ├── CommunityCare/          # settings, urls, app config
│       ├── core/                   # census models, serializers, API viewsets
│       ├── templates/docs.html     # built-in API docs page
│       ├── manage.py
│       └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/GapoMap.jsx  # Leaflet map UI
    │   ├── components/Popup.jsx
    │   └── data/barangays.json     # static barangay coordinates
    ├── package.json
    └── vite.config.js
```

## Backend (Django REST API)

### Main capabilities

- JWT authentication endpoints (`/api/token/`, `/api/token/refresh/`)
- Djoser auth routes (`/auth/`)
- CRUD endpoints under `/api/` for:
  - locations
  - families
  - citizenships
  - educational attainments
  - employment statuses
  - marital statuses
  - members
- Search, ordering, and pagination support
- API documentation page at `/docs/`

### Core data model

- **Location**: coordinates + address
- **Family**: title, members count, total income, duration of residence, linked location
- **Member**: person-level profile (age, contact, income, gender, birth info, status refs), linked to one or more families
- **Reference tables**: citizenship, educational attainment, employment status, marital status

### Backend setup

1. Go to backend:
   ```bash
   cd backend/CommunityCare
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create a MySQL database.
4. Create `.env` with:
   ```env
   DB_NAME=yourdatabasename
   DB_USER=yourusername
   DB_PASSWORD=yourpassword
   DB_HOST=yourdatabasehost
   DB_PORT=yourdatabaseport
   SECRET_KEY=yoursecretkey
   ```
5. Run migrations and server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

## Frontend (React + Vite + Leaflet)

### Main capabilities

- Interactive map centered on Olongapo area coordinates
- Multiple base map modes (street, hybrid, terrain, traffic)
- Barangay markers loaded from local JSON data
- Popup display per marker (name + coordinates)
- User geolocation marker support

### Frontend setup

1. Go to frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Build production assets:
   ```bash
   npm run build
   ```

## Current state and notes

- The frontend currently visualizes static barangay coordinate data from `src/data/barangays.json`.
- Backend APIs are protected with JWT authentication.
- Frontend linting currently reports existing issues in the repository; build succeeds.
- Backend test execution requires valid environment configuration (including `SECRET_KEY` and database settings).

## Quick start (run both apps)

Use two terminals:

- Terminal 1: run Django API (`python manage.py runserver`)
- Terminal 2: run Vite app (`npm run dev`)

Then open the frontend URL shown by Vite (usually `http://localhost:5173`) and backend docs at `http://127.0.0.1:8000/docs/`.