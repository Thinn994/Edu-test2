import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import CourseStream from './pages/CourseStream';
import Register from './pages/Register';
import SubmissionList from "./components/SubmissionList";
import AssignmentDetail from './pages/AssignmentDetail';

function App() {
  const [userRole, setUserRole] = useState('student');
  const toggleRole = () => {
    setUserRole(prevRole => prevRole === 'student' ? 'teacher' : 'student');
  };

  return (
    <BrowserRouter>
      <div className="relative min-h-screen">

        <Routes>
          <Route path="/register" element={<Register setUserRole={setUserRole} />} />
          <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
          <Route path="/course/stream/:courseId" element={<CourseStream userRole={userRole} />} />
          <Route path="/course/stream/:courseId/assignment" element={<AssignmentDetail userRole={userRole} />} />

          <Route path="/submissions" element={<SubmissionList />} />
          <Route path="/" element={<Navigate to="/register" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;