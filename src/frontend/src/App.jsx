import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CourseStream from './pages/CourseStream';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Đường dẫn mở trang chi tiết lớp học */}
        <Route path="/course/stream" element={<CourseStream />} />
        
        {/* Mặc định vào web sẽ đẩy thẳng vào Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;