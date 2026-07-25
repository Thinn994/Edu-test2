# Tasks: Assignment Submission Management

**Input**: Design documents from `/specs/001-assignment-submission-management`

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 [P] [Setup] Document the intended feature structure in `src/specs/001-assignment-submission-management/plan.md` and verify current `src/backend/` and `src/frontend/` layout.
- [ ] T002 [P] [Setup] Add backend database support module in `src/backend/db.py` with SQLite connection helpers and configuration for `src/backend/edusubmit.db`.
- [ ] T003 [P] [Setup] Add frontend API service wrapper in `src/frontend/src/services/api.js` for backend communication.
- [ ] T004 [P] [Setup] Create or reserve `src/backend/uploads/` for file storage and configure upload limits in `src/backend/app.py`.

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T005 [P] [Foundation] Define SQLite schema and initialization logic in `src/backend/db.py` for `assignment` and `submission` tables.
- [ ] T006 [P] [Foundation] Implement backend domain models in `src/backend/models.py` for `Assignment` and `Submission`.
- [ ] T007 [P] [Foundation] Configure Flask app routing and CORS in `src/backend/app.py` and prepare route registration for submission and review endpoints.
- [ ] T008 [P] [Foundation] Add backend constants and validation helpers for allowed file types, max upload size, and submission status tracking.
- [ ] T009 [P] [Foundation] Add core frontend route/page placeholders: `src/frontend/src/pages/AssignmentPage.jsx` and `src/frontend/src/pages/LecturerSubmissionsPage.jsx`.

---

## Phase 3: User Story 1 - Submit Assignment (Priority: P1) 🎯 MVP

**Goal**: Enable students to select an assignment, upload a validated submission file, and confirm the submission.

**Independent Test**: A student can upload a valid file and see a success confirmation with submission metadata recorded.

- [ ] T010 [US1] Implement `POST /api/submissions` in `src/backend/routes/submissions.py` to receive uploads, validate file type and size, persist file metadata, and return submission status.
- [ ] T011 [US1] Add backend submission persistence logic in `src/backend/models.py` and connect it to route handling.
- [ ] T012 [US1] Implement `src/frontend/src/components/AssignmentSubmissionForm.jsx` that lets students select an assignment, choose a file, and submit to the backend.
- [ ] T013 [US1] Add frontend page `src/frontend/src/pages/AssignmentPage.jsx` showing assignment details and embedding the submission form.
- [ ] T014 [US1] Integrate student upload flow with `src/frontend/src/services/api.js` and backend `POST /api/submissions`.
- [ ] T015 [US1] Add client-side validation for allowed file types and maximum size in `AssignmentSubmissionForm.jsx` before network upload.

### Tests for User Story 1

- [ ] T016 [P] [US1] Add backend API tests in `src/backend/tests/test_submissions.py` for successful upload and validation failures.
- [ ] T017 [P] [US1] Add a manual verification checklist for student upload scenarios in `src/specs/001-assignment-submission-management/checklists/requirements.md`.

---

## Phase 4: User Story 2 - Review and Grade Submission (Priority: P2)

**Goal**: Enable lecturers to retrieve student submissions, view upload metadata, and save grades with feedback.

**Independent Test**: A lecturer can open a submission, enter a grade and feedback, and persist those values.

- [ ] T018 [US2] Implement `GET /api/submissions` in `src/backend/routes/submissions.py` to return submission lists filtered by assignment and role.
- [ ] T019 [US2] Implement `PUT /api/submissions/<submission_id>/grade` in `src/backend/routes/reviews.py` to persist grade, feedback, and reviewed status.
- [ ] T020 [US2] Add `src/frontend/src/components/SubmissionList.jsx` to list submissions for a lecturer review view.
- [ ] T021 [US2] Add `src/frontend/src/components/LecturerReviewPage.jsx` to display selected submission details and grading controls.
- [ ] T022 [US2] Add frontend logic in `src/frontend/src/services/api.js` for the review endpoints and grade submission.
- [ ] T023 [US2] Update `src/backend/models.py` to record `grade`, `feedback`, and `reviewed_at` on submissions.

### Tests for User Story 2

- [ ] T024 [P] [US2] Add backend tests in `src/backend/tests/test_reviews.py` for submission retrieval and grading persistence.
- [ ] T025 [P] [US2] Add a lecturer review verification checklist entry to `src/specs/001-assignment-submission-management/checklists/requirements.md`.

---

## Phase 5: User Story 3 - View Submission Status and Grade (Priority: P2)

**Goal**: Enable students to view their submission status, grade, and feedback after grading.

**Independent Test**: A student can view submitted assignment details, current status, and any grade/feedback.

- [ ] T026 [US3] Implement `GET /api/submissions/<submission_id>` or student-specific status endpoint in `src/backend/routes/submissions.py` to return submission status, grade, and feedback.
- [ ] T027 [US3] Add `src/frontend/src/components/SubmissionStatusCard.jsx` to show submission state, upload timestamp, grade, and feedback.
- [ ] T028 [US3] Update `src/frontend/src/pages/AssignmentPage.jsx` to fetch and render the student’s current submission status.
- [ ] T029 [US3] Add frontend handling for no-submission state and reviewed/unreviewed status display.

### Tests for User Story 3

- [ ] T030 [P] [US3] Add backend tests in `src/backend/tests/test_submission_status.py` for status retrieval and grade visibility.
- [ ] T031 [P] [US3] Add a student status verification checklist entry to `src/specs/001-assignment-submission-management/checklists/requirements.md`.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T032 [P] [Polish] Ensure backend error responses are consistent and user-friendly for upload validation, persistence failures, and missing submissions.
- [ ] T033 [P] [Polish] Review frontend UX for assignment submission, validation errors, and grade feedback flows.
- [ ] T034 [P] [Polish] Add or update documentation in `src/specs/001-assignment-submission-management/plan.md` and `src/specs/001-assignment-submission-management/spec.md` as implementation details evolve.
- [ ] T035 [P] [Polish] Perform end-to-end validation of student upload → lecturer grading → student status flow.
- [ ] T036 [P] [Polish] Clean up unused imports, remove placeholder files, and ensure the new feature files are integrated with existing project startup instructions.
