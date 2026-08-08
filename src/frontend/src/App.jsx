import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CourseStream from './pages/CourseStream';
import Register from './pages/Register'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Khai báo đường dẫn cho trang Đăng ký */}
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course/stream" element={<CourseStream />} />

        <Route path="/" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;