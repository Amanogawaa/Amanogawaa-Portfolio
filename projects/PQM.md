# POM-QM Modern

**A Modern Web-Based Decision Support System for Production & Operations Management**

---

## 🎯 Project Overview

**POM-QM Modern** is a complete redesign of the classic **POM-QM for Windows** software. 

It brings powerful **Management Science** and **Quantitative Methods** tools into a modern, beautiful, and user-friendly web application — designed for university students, instructors, and small business users.

### Problem It Solves
Traditional POM-QM software is outdated, runs only on Windows, has poor UI/UX, and lacks modern features like real-time visualization and sensitivity analysis.

Our solution delivers the same powerful solvers with a **significantly better experience**.

---

## ✨ Key Features

- Clean, responsive interface with **Light & Dark mode**
- Excel-like editable tables (copy-paste friendly)
- Real-time validation and error highlighting
- Interactive charts and professional PDF reports
- Sensitivity Analysis & What-If scenarios
- Save/Load projects
- Fast and accurate solvers

---

## 🛠 Tech Stack

### Frontend
- **Next.js 15** (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Table v2 (Excel-like tables)
- Recharts (Interactive charts)

### Backend (Pure Python)
- **FastAPI** — High-performance API
- **PuLP + HiGHS** — Linear Programming
- **Pandas + NumPy** — Data handling
- **NetworkX** — Network models
- **Pydantic** — Validation
- **SQLite** — Project storage

**All heavy calculations run natively in Python** for maximum performance.

---

## 🏗 System Architecture
Next.js Frontend
↓ (REST API)
FastAPI Backend
↓
Python Solver Engine (PuLP, OR-Tools, etc.)
↓
JSON Results → Charts + Reports


---

## 📊 Modules & Development Plan

### Phase 1 – MVP (For Friday Presentation)

| Module                            | Status      | Priority |
|-----------------------------------|-------------|----------|
| Linear Programming + Sensitivity  | In Progress | High     |
| Transportation Problem            | Planned     | High     |
| Assignment Problem                | Planned     | High     |
| Basic Dashboard & UI              | In Progress | High     |

### Future Modules (Phase 2)
- Forecasting Methods
- PERT/CPM with Gantt Chart
- Inventory Models (EOQ)
- Queuing Theory

---

## 🎨 UI/UX Highlights

- Modern minimal design
- Sidebar navigation by module category
- Smart data input tables
- Results with summary cards, charts, and sensitivity tables
- Mobile-friendly responsive layout

---

## 📁 Project Structure
pom-qm-modern/
├── frontend/          # Next.js 15
├── backend/           # FastAPI + Python solvers
│   ├── solvers/
│   ├── routers/
│   └── services/
├── data/              # Sample problems
└── README.md


---

## ⏱ Project Timeline (Tight Schedule)

**Current Status (as of May 26):**
- Project initialized
- Tech stack finalized
- Basic FastAPI + Next.js connection ready
- Linear Programming solver in development

**Deliverables by Friday:**
- Fully working **Linear Programming** module
- Beautiful modern UI with data table and results
- Sensitivity Analysis
- Sample problems with visualization
- Live demo ready

---

## 🎯 Value & Impact

- Helps students learn Management Science interactively
- Modern alternative to outdated desktop software
- Strong foundation for future expansion
- Excellent portfolio / capstone project

---
