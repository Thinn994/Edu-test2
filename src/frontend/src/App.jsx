import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import CourseStream from './pages/CourseStream';
import Register from './pages/Register';

import SubmissionList from "./components/SubmissionList";
import AssignmentDetail from './pages/AssignmentDetail';

// LẤY IMPORT MỚI CỦA TEAM BRO (PA4) GẮN VÀO ĐÂY
import MaterialsPage from "./pages/MaterialsPage";
import QuizPage from "./pages/QuizPage";

function App() {
  // GIỮ NGUYÊN STATE PHÂN QUYỀN CỦA ANH EM MÌNH
  const [userRole, setUserRole] = useState('student');

  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <Routes>
          {/* LUỒNG ĐĂNG NHẬP / ĐĂNG KÝ */}
          <Route path="/register" element={<Register setUserRole={setUserRole} />} />

          {/* LUỒNG DASHBOARD & LỚP HỌC (CÓ TRUYỀN ROLE ĐỂ BẬT TẮT TÍNH NĂNG) */}
          <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
          <Route path="/course/stream/:courseId" element={<CourseStream userRole={userRole} />} />
          <Route path="/course/stream/:courseId/assignment" element={<AssignmentDetail userRole={userRole} />} />

          {/* QUẢN LÝ BÀI NỘP */}
          <Route path="/submissions" element={<SubmissionList />} />

          {/* CÁC ROUTE MỚI MÀ TEAM BRO VỪA CODE THÊM (PA4) */}
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/quizzes" element={<QuizPage />} />

          {/* MẶC ĐỊNH LÀ ĐẨY VỀ TRANG ĐĂNG NHẬP */}
          <Route path="/" element={<Navigate to="/register" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;