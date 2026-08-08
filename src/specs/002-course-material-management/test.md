# Test Cases - Material Management


## TC-MATERIAL-001: Upload Course Material

### Test Case Name
Upload a course material file

### Description
Verify that a lecturer can upload a valid course material file successfully.

### Related Use Case
UC-Material-01: Upload Course Material

### Input Data
- File: lecture01.pdf
- Course ID: 1
- Lecturer ID: 1

### Expected Output
- File is uploaded successfully.
- File metadata is stored in the database.
- Uploaded file appears in the material list.

### Test Steps
1. Open the Material Management page.
2. Select a valid file.
3. Click the Upload button.
4. System validates file type and size.
5. System saves the file into the upload directory.
6. System stores material information in the database.
7. Verify the uploaded file is displayed.



---

## TC-MATERIAL-002: Upload Multiple Files

### Test Case Name
Upload multiple course materials

### Description
Verify that the lecturer can upload multiple files at the same time.

### Related Use Case
UC-Material-01: Upload Course Material

### Input Data
- Files:
  - lecture01.pdf
  - chapter01.pptx
  - example.docx
- Course ID: 1
- Lecturer ID: 1

### Expected Output
- All valid files are uploaded successfully.
- Multiple material records are created in the database.
- All uploaded files are shown in the material list.

### Test Steps
1. Open Material Upload page.
2. Select multiple files.
3. Click Upload.
4. System processes each file.
5. System stores file information.
6. Verify all files appear in the material list.



---

## TC-MATERIAL-003: Download Material

### Test Case Name
Download uploaded course material

### Description
Verify that users can download an uploaded material file.

### Related Use Case
UC-Material-02: Download Material

### Input Data
- Material ID: 1

### Expected Output
- The selected file is downloaded successfully.

### Test Steps
1. Open the material list.
2. Select an available material.
3. Click Download button.
4. System retrieves the file path.
5. System returns the requested file.
6. Verify downloaded file is correct.



---

## TC-MATERIAL-004: Upload Invalid File

### Test Case Name
Upload unsupported file format

### Description
Verify that the system rejects unsupported file formats.

### Related Use Case
UC-Material-01: Upload Course Material

### Input Data
- File: malware.exe

### Expected Output
- Upload is rejected.
- Error message is displayed.

### Test Steps
1. Open upload page.
2. Select an unsupported file.
3. Click Upload.
4. System validates file extension.
5. System displays error message.