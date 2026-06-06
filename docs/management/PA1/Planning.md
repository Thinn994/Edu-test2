# Project Plan: EduSubmit
**Course:** CS300 - CSC13002 - Introduction to Software Engineering
**Project Assignment:** PA2-2026
**Group:** 5 anh em

## 1. Introduction
*Author: Nguyễn Xuân Hoàng, Reviewer: Lê Quí Thịnh, Editor: Nguyễn Xuân Hoàng*

EduSubmit is an AI-powered Learning Management System (LMS) inspired by Google Classroom. It is designed to connect teachers and students in a seamless digital educational environment while deeply integrating Artificial Intelligence (AI) tools. By leveraging AI, EduSubmit aims to personalize learning paths, automate assessment creation, and enhance educational interactions, making teaching and learning more proactive and intelligent.

## 2. Project Overview
*Author: Nguyễn Xuân Hoàng, Reviewer: Lê Quí Thịnh, Editor: Nguyễn Xuân Hoàng*

* **Goals:** To build a centralized classroom management platform that supports document storage, real-time communication, and progress tracking. Additionally, the project aims to reduce teacher workload through automated quiz generation and to support students with AI-driven material explanations and deadline reminders.
* **Scope:** The web application supports two primary actors: Teachers and Students. Core functional groups include Course Management, Material Storage, Messaging, and Assignment Management. The key AI features include material recommendation and explanation, automated study scheduling, academic warning alerts for low grades or upcoming deadlines, and auto-generated quizzes from course materials.
* **Deliverables:** The project deliverables include the source code hosted on a private GitHub repository, project documentation in Markdown/PDF formats, the initialized Spec Kit management system, AI Usage reports, and a fully functional Web Application by the end of the semester.
* **Assumptions and Dependencies:** The project's success depends on the successful integration of third-party Large Language Model (LLM) APIs (e.g., OpenAI, Gemini) to handle generative AI features. Furthermore, the system relies on a stable cloud storage service to manage classroom documents and materials.

## 3. Project Organization
*Author: Nguyễn Xuân Hoàng, Reviewer: Lê Quí Thịnh, Editor: Nguyễn Xuân Hoàng*

### 3.1 Team Structure and Roles
Due to the learning objectives of this course, all students must act as full-stack engineers. However, to ensure smooth collaboration and accountability, primary roles have been assigned:

| Member Name | Student ID | Email | Primary Role | Key Responsibilities |
| :--- | :--- | :--- | :--- | :--- |
| Nguyễn Xuân Hoàng | 24127380 | nxhoang2417@clc.fitus.edu.vn | Leader / Scrum Master | Manages Jira progress, coordinates Scrum meetings, and compiles reports. |
| Đỗ Khắc Thành Công | 24127332 | dktcong2432@clc.fitus.edu.vn | AI Lead / Developer | Researches and integrates LLM APIs for auto-quiz generation and explanations. |
| Lê Quí Thịnh | 24127124 | lqthinh2414@clc.fitus.edu.vn | Backend / Developer | Designs database architecture and builds core LMS APIs. |
| Phạm Đức Thịnh | 24127243 | pdthinh2411@clc.fitus.edu.vn | Frontend / Developer | Develops Web UI/UX and integrates the study schedule timeline. |
| Phan Đan Thần | 24127538 | pdthan2431@clc.fitus.edu.vn | UI/UX & QA | Designs UI mockups, creates test cases, and conducts software testing. |

### 3.2 Risk Management
| Risk | Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **Technology Issues (AI Integration Complexity)** | AI-generated quizzes or explanations may suffer from hallucinations or high API latency, affecting user trust. | Conduct spike research early in Sprint 2. Build strict prompt templates and allow teachers to manually review and edit AI-generated quizzes before publishing. |
| **Scope Creep** | Attempting to build real-time messaging, file management, and multiple AI features may lead to missed deadlines. | Prioritize the Minimum Viable Product (MVP) for core LMS features and one primary AI feature (Auto-Quiz) first. Delay secondary features (messaging) to Sprints 4 or 5 if time permits. |
| **Member Unavailability** | Loss of team members or absences can overload the remaining developers, especially for complex modules. | Hold regular Scrum meetings and maintain transparent task tracking on Jira. Ensure all code is well-commented and documented for easy handover. |

## 4. Project Plan
*Author: Nguyễn Xuân Hoàng, Reviewer: Lê Quí Thịnh, Editor: Nguyễn Xuân Hoàng*

This project strictly follows the Scrum process. The development lifecycle is divided into 5 Sprints, each corresponding to one Project Assignment (PA) and lasting approximately 2-3 weeks. 

### 4.1 Schedule
* **Sprint 1 (PA1):** Team formation, Existing App Survey, Project Proposal, and Team Contract setup.
* **Sprint 2 (PA2 - Current):** Draft Project Plan and Vision Document, initialize Spec Kit, and set up the Jira task board.
* **Sprint 3 (PA3):** Revise documents based on TA feedback. Develop Database schema, Authentication flow, and basic Course creation/joining features.
* **Sprint 4 (PA4):** Integrate Material Storage and deploy the core AI module (Auto-Quiz generation and Material Explanation). Begin system testing.
* **Sprint 5 (PA5):** Finalize UI/UX, execute bug fixing, deploy the Academic Warning feature, and prepare for the final project demo.

### 4.2 Detailed Tasks for Upcoming Sprint (Sprint 2 / PA2)
| Task Name | Assigned on Jira? | Assignee | Reviewer | Due Date |
| :--- | :---: | :--- | :--- | :--- |
| Draft Project Plan (Sections 1, 2) | [x] | Nguyễn Xuân Hoàng | Phan Đan Thần | June 15, 2026 |
| Draft Project Plan (Sections 3, 4) | [x] | Nguyễn Xuân Hoàng | Lê Quí Thịnh | June 15, 2026 |
| Draft Vision Document (Problem & Position) | [x] | Đỗ Khắc Thành Công | Lê Quí Thịnh | June 20, 2026 |
| Draft Vision Document (Features & NFR) | [x] | Lê Quí Thịnh | Đỗ Khắc Thành Công | June 22, 2026 |
| Draw Workflow Diagrams (Mermaid syntax) | [x] | Phạm Đức Thịnh | Nguyễn Xuân Hoàng | June 25, 2026 |
| Initialize GitHub Repo & setup Spec Kit | [x] | Nguyễn Xuân Hoàng | Phạm Đức Thịnh | June 28, 2026 |
| Complete Spec Kit Training | [x] | Nguyễn Xuân Hoàng | Đỗ Khắc Thành Công | June 30, 2026 |
| Complete Spec Kit Training | [x] | Đỗ Khắc Thành Công | Lê Quí Thịnh | June 30, 2026 |
| Complete Spec Kit Training | [x] | Lê Quí Thịnh | Phạm Đức Thịnh | June 30, 2026 |
| Complete Spec Kit Training | [x] | Phạm Đức Thịnh | Phan Đan Thần | June 30, 2026 |
| Complete Spec Kit Training | [x] | Phan Đan Thần | Nguyễn Xuân Hoàng | June 30, 2026 |
| Write AI Usage Report & Export Jira/Git logs | [x] | Nguyễn Xuân Hoàng | Phan Đan Thần | July 02, 2026 |

### 4.3 Build Plan
* **Build 1 (End of Sprint 3):** Core LMS functionality release. Users can authenticate, create classes, add students, and upload basic materials.
* **Build 2 (End of Sprint 4):** Integration of the AI Module. Teachers can generate quizzes from materials, and students can request AI explanations.
* **Build 3 - Final Build (Sprint 5):** Code freeze. Stable version containing all refined features, including the academic warning system, ready for the final demo.
