import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CourseStream from './pages/CourseStream';

// Import component của bạn Thịnh (Thinn994)
import SubmissionList from "./components/SubmissionList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Đường dẫn mở trang chi tiết lớp học (Đã thêm :courseId như mình bàn lúc nãy) */}
        <Route path="/course/stream/:courseId" element={<CourseStream />} />
        
        {/* Đường dẫn tạm thời để test code của bạn Thịnh */}
        <Route path="/submissions" element={<SubmissionList />} />
        
        {/* Mặc định vào web sẽ đẩy thẳng vào Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;