# Implementation Plan: Assignment Submission Management

**Branch**: `001-assignment-submission-management` | **Date**: 2026-07-25 | **Spec**: `spec.md`

**Input**: Feature specification from `/specs/001-assignment-submission-management/spec.md`

## Summary

Implement Assignment Submission Management in EduSubmit with a React frontend, Flask backend, and SQLite persistence.
The feature will let students select an assignment, upload validated submission files, and review submission status in the UI.
Lecturers will retrieve submissions, grade work, and provide feedback through a review interface.
Backend APIs will support submission creation, submission retrieval, grading, and student-facing status queries.

## Technical Context

**Language/Version**: Python 3.10+ backend, React 19 frontend

**Primary Dependencies**:
- Backend: Flask, Flask-CORS, SQLite (built-in), optionally `werkzeug` upload utilities
- Frontend: React, Vite, standard browser fetch/XHR for API calls

**Storage**: SQLite database file managed by the backend (e.g. `backend/edusubmit.db`)

**Testing**:
- Backend: scoped endpoint tests with `pytest` or manual API verification
- Frontend: smoke verification in the browser and component-level validation by manual QA

**Target Platform**: Web application running in modern browsers with backend on a development server

**Project Type**: Web application with separate frontend and backend services

**Performance Goals**: Handle typical course submission volume; support dozens of concurrent uploads and reviewer queries without undue latency

**Constraints**: File uploads limited by configured maximum size; support only desktop/web workflows in this initial release

**Scale/Scope**: Course-level academic use within EduSubmit; not designed for campus-wide scaling or cross-instance federation in this phase

## Constitution Check

The project’s constitution file under `.specify/memory/constitution.md` contains template placeholders rather than concrete rules.
Proceed using standard software quality expectations and the feature’s specified checkpoints, then re-check architecture alignment before implementation begins.

## Project Structure

### Documentation (this feature)

```text
src/specs/001-assignment-submission-management/
├── plan.md
├── spec.md
├── checklists/
│   └── requirements.md
```

### Source Code (repository root)

```text
src/backend/
├── app.py
├── db.py                   # planned: database connection and migration helpers
├── models.py               # planned: SQLite-backed domain models
├── routes/
│   ├── submissions.py      # planned: student submission endpoints
│   └── reviews.py          # planned: lecturer grading endpoints
├── uploads/                # planned: persisted upload artifacts or temporary storage
└── tests/                  # planned: backend API tests

src/frontend/
├── src/
│   ├── components/
│   │   ├── AssignmentSubmissionForm.jsx
│   │   ├── SubmissionStatusCard.jsx
│   │   ├── LecturerReviewPage.jsx
│   │   └── SubmissionList.jsx
│   ├── pages/
│   │   ├── AssignmentPage.jsx
│   │   └── LecturerSubmissionsPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
└── tests/                  # planned: frontend smoke tests or manual validation notes
```

**Structure Decision**: Use the existing `src/backend/` and `src/frontend/` directories, extending them with targeted feature modules rather than introducing a new project layout.

## Phase 0 Research

### Key technical decisions

- Use Flask in `src/backend/app.py` as the API server because it already exists in the repository.
- Use SQLite for persistence to keep the backend lightweight and self-contained for EduSubmit.
- Use React on the existing frontend to add assignment upload and review views using Vite-powered pages/components.
- Keep authentication and user identity outside this feature’s implementation, assuming the current EduSubmit auth context is available.

### API contract overview

- `POST /api/submissions` — create a submission for the authenticated student
- `GET /api/submissions?assignment_id={id}` — list submissions for a student or lecturer
- `GET /api/submissions/{submission_id}` — retrieve a single submission detail
- `PUT /api/submissions/{submission_id}/grade` — record grade and feedback for a submission
- `GET /api/submissions/{submission_id}/status` — retrieve submission status, grade, and feedback for a student

### Data model overview

- `assignment` table: `id`, `title`, `due_date`, `allowed_file_types`, `max_file_size`
- `submission` table: `id`, `assignment_id`, `student_id`, `file_name`, `file_path`, `uploaded_at`, `valid`, `status`, `grade`, `feedback`, `reviewed_at`
- `user` metadata assumed from existing auth; submission records reference `student_id` and are filtered by role

## Phase 1 Design

### Backend design

- Extend `src/backend/app.py` with upload handling and SQLite wiring.
- Add a database helper module (`db.py`) that initializes SQLite and returns connections.
- Define a `Submission` model and optional lightweight DAO in `models.py`.
- Implement file validation in the backend using a whitelist of allowed extensions and a maximum size limit.
- Persist only metadata in SQLite; store uploaded files in a designated `uploads/` directory.
- Return structured JSON errors for validation failures, persistence errors, and permission issues.

### Frontend design

- Add a submission page that lists assignments and provides file selection.
- Add immediate client-side validation for file type and size before upload.
- Use a centralized `api.js` service module to call backend endpoints.
- Add a student status panel to show submission state, upload timestamp, grade, and feedback.
- Add a lecturer review page that lists submissions and exposes grading controls.

### Integration design

- Use Flask-CORS in `src/backend/app.py` to allow the React frontend to call backend APIs.
- Keep the API surface lean and RESTful, with separate endpoints for student and lecturer actions.
- Ensure the frontend page flow is clearly divided by role: student submission vs lecturer review.

## Phase 2 Implementation Plan

### Minimum viable deliverables

1. Backend API endpoints for submission creation and retrieval.
2. SQLite schema and persistence for submission metadata.
3. Frontend assignment submission form with file upload.
4. Frontend student status page showing submission and grade information.
5. Lecturer review UI with grade and feedback submission.

### Implementation tasks

- Add SQLite connection management to `src/backend/db.py`
- Create `Submission` and `Assignment` persistence logic in `src/backend/models.py`
- Add `POST /api/submissions` and `GET /api/submissions` endpoints to `src/backend/routes/submissions.py`
- Add `PUT /api/submissions/{submission_id}/grade` endpoint to `src/backend/routes/reviews.py`
- Extend `src/backend/app.py` to register routes and configure upload directory
- Add React components in `src/frontend/src/components/` for upload form, status display, and review list
- Add pages in `src/frontend/src/pages/` for assignment submission and lecturer review
- Add API service wrapper in `src/frontend/src/services/api.js`
- Validate file upload rules in the frontend and confirm on submit
- Persist submission records and expose review state to the UI

### Validation and testing

- Validate upload behavior manually through the frontend UI against the backend.
- Confirm invalid file types and oversized files are rejected with clear messages.
- Confirm submission metadata is stored in SQLite and retrievable across page reloads.
- Confirm lecturer grades persist and student-facing grade/feedback appear immediately.

## Complexity Tracking

No constitution violations were identified in the current project placeholders.
This plan keeps the feature within the existing frontend/backend split and avoids introducing additional services or infrastructure.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
