import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CourseStream from './pages/CourseStream';
import Register from './pages/Register';
import SubmissionList from "./components/SubmissionList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Khai báo đường dẫn cho trang Đăng ký/Đăng nhập của Thịnh */}
        <Route path="/register" element={<Register />} />

        {/* Dashboard chính */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Đường dẫn mở trang chi tiết lớp học (Đã thêm :courseId của team) */}
        <Route path="/course/stream/:courseId" element={<CourseStream />} />

        {/* Đường dẫn tạm thời để test phần Submission */}
        <Route path="/submissions" element={<SubmissionList />} />

        {/* Mặc định vào web sẽ đẩy thẳng vào trang Register để test đăng nhập */}
        <Route path="/" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;