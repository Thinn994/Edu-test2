# Test Cases - Quiz Management


## TC-QUIZ-001: Create Quiz

### Test Case Name
Create a new quiz

### Description
Verify that a lecturer can create a quiz for a course.

### Related Use Case
UC-Quiz-01: Create Quiz

### Input Data
- Quiz title: Database Fundamentals Quiz
- Course ID: 1
- Questions:
  - Question 1
  - Question 2
  - Question 3

### Expected Output
- Quiz is created successfully.
- Quiz information is stored in the database.
- Created quiz appears in the quiz list.

### Test Steps
1. Open Quiz Management page.
2. Enter quiz information.
3. Add quiz questions.
4. Click Save Quiz.
5. System validates input data.
6. System stores quiz information.
7. Verify quiz appears in the quiz list.



---

## TC-QUIZ-002: View Quiz List

### Test Case Name
View available quizzes

### Description
Verify that users can view quizzes belonging to a course.

### Related Use Case
UC-Quiz-02: View Quiz

### Input Data
- Course ID: 1

### Expected Output
- The system displays all quizzes of the selected course.

### Test Steps
1. Open Quiz page.
2. Select a course.
3. System retrieves quiz data.
4. Verify quiz list is displayed.



---

## TC-QUIZ-003: Take Quiz

### Test Case Name
Submit quiz answers

### Description
Verify that students can complete and submit a quiz.

### Related Use Case
UC-Quiz-03: Take Quiz

### Input Data
- Quiz ID: 1
- Selected answers:
  - Q1: A
  - Q2: C
  - Q3: B

### Expected Output
- Student answers are saved.
- Quiz submission is completed.
- Result is displayed.

### Test Steps
1. Open a quiz.
2. Answer all questions.
3. Click Submit.
4. System validates answers.
5. System saves quiz attempt.
6. Display quiz result.



---

## TC-QUIZ-004: Edit Quiz

### Test Case Name
Update existing quiz

### Description
Verify that lecturers can modify quiz information.

### Related Use Case
UC-Quiz-04: Edit Quiz

### Input Data
- Quiz ID: 1
- Updated question data

### Expected Output
- Quiz information is updated successfully.

### Test Steps
1. Open quiz management.
2. Select an existing quiz.
3. Modify quiz information.
4. Save changes.
5. Verify updated quiz data.