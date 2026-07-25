# Feature Specification: Assignment Submission Management

**Feature Branch**: `001-assignment-submission-management`

**Created**: 2026-07-25

**Status**: Draft

**Input**: User description: "Create a specification for Assignment Submission Management in EduSubmit. The feature allows students to upload assignment files, validate uploaded files, store submission records in the database, and allow students to view their submission status and grades. Actors: Student, Lecturer. Functional requirements: Students can select an assignment and upload a file. The system validates file type and size. The system stores submission information. Lecturers can review submissions and provide grades. Students can view grades and feedback. The feature must include frontend UI, backend API, and database persistence."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Submit Assignment (Priority: P1)

A student selects an assignment, uploads a file, and receives immediate validation feedback.

**Why this priority**: This is the core student-facing workflow that delivers the main value of assignment submission management.

**Independent Test**: A student can complete the upload flow from assignment selection through successful confirmation and see the submission recorded.

**Acceptance Scenarios**:

1. **Given** a student is logged in and viewing an open assignment, **When** they choose a supported file and confirm upload, **Then** the system accepts the submission and shows a success message.
2. **Given** a student uploads a file with an unsupported type, **When** the upload is submitted, **Then** the system rejects it and shows a validation error.
3. **Given** a student uploads a file larger than the allowed size, **When** the upload is submitted, **Then** the system rejects it and explains the file size limit.

---

### User Story 2 - Review and Grade Submission (Priority: P2)

A lecturer reviews a student submission and records a grade with optional feedback.

**Why this priority**: Lecturer grading completes the submission lifecycle and makes the feature useful for assessment.

**Independent Test**: A lecturer retrieves a student's submission, enters a grade and feedback, and saves the review.

**Acceptance Scenarios**:

1. **Given** a lecturer is viewing submissions for an assignment, **When** they open an individual submission, **Then** they see the uploaded file metadata and student details.
2. **Given** a lecturer enters a grade and feedback, **When** they save the review, **Then** the system stores the grade and feedback and marks the submission as reviewed.

---

### User Story 3 - View Submission Status and Grade (Priority: P2)

A student views the current status of their submission and any posted grade or feedback.

**Why this priority**: Students need confirmation that their work was received and graded.

**Independent Test**: A student opens the assignment details and sees status, grade, and feedback if available.

**Acceptance Scenarios**:

1. **Given** a student has submitted a file, **When** they view the assignment page, **Then** they see the submission status and upload timestamp.
2. **Given** a lecturer has graded the submission, **When** the student refreshes the page, **Then** they see the grade and feedback.

---

### Edge Cases

- What happens when a student tries to upload after the assignment deadline has passed?
- How does the system behave if the backend cannot persist the submission due to a database error?
- How is a duplicate upload handled if the student submits a second file for the same assignment?
- How does the UI show an assignment that has no submissions yet?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow a student to select an assignment and upload a submission file through the frontend UI.
- **FR-002**: The system MUST validate uploaded files for allowed file types before accepting the submission.
- **FR-003**: The system MUST validate uploaded files for maximum file size before accepting the submission.
- **FR-004**: The system MUST record submission metadata, including student, assignment, file name, upload timestamp, and validation status, in persistent storage.
- **FR-005**: The system MUST provide a backend API endpoint for creating and storing submissions from the frontend.
- **FR-006**: The system MUST provide a backend API endpoint for lecturers to retrieve submissions for review.
- **FR-007**: The system MUST allow lecturers to enter a grade and feedback for a submission and persist those values.
- **FR-008**: The system MUST provide a backend API endpoint for students to retrieve their submission status, grade, and feedback.
- **FR-009**: The system MUST display submission status, grade, and feedback in the frontend UI for the submitting student.
- **FR-010**: The system MUST keep assignment submission records in the database so grades and feedback are available on future page loads.
- **FR-011**: The system MUST support lecturer review of submissions in a way that distinguishes reviewed submissions from unreviewed ones.

### Key Entities *(include if feature involves data)*

- **Assignment**: Represents the task or assignment that students can submit work for; includes title, due date, and allowed file types.
- **Submission**: Represents a student upload for an assignment; includes student ID, assignment ID, file metadata, upload timestamp, validation status, grade, and feedback.
- **Student**: Represents the user who submits assignments and later views the submission status, grade, and feedback.
- **Lecturer**: Represents the user who reviews submissions, assigns grades, and provides feedback.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 95% of valid student submissions are accepted and stored without file-type or size validation failure when using supported formats.
- **SC-002**: Submission validation rejects unsupported file types or oversize files with clear error messages in at least 90% of test cases.
- **SC-003**: Lecturer review actions persist grade and feedback in the database and are visible to the student on the next page load.
- **SC-004**: Students can view submission status, grade, and feedback within one page load after the lecturer saves a review.
- **SC-005**: The submission workflow is available through frontend UI, backend API, and persistent database storage without requiring additional manual steps.

## Assumptions

- Students and lecturers already use the EduSubmit authentication system, so this feature focuses on submission, review, and grading rather than login.
- The existing frontend and backend can be extended with new UI screens and API endpoints for submission management.
- The feature will support a standard set of accepted file types and a single maximum upload size for the first release.
- Offline submission or mobile-specific UI behavior is out of scope for this initial implementation.
