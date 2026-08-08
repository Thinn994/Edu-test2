import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import CourseStream from './pages/CourseStream';
import ProfilePage from './pages/ProfilePage';
import Register from './pages/Register';
import SubmissionList from "./components/SubmissionList";
import MaterialsPage from "./pages/MaterialsPage";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course/stream/:courseId" element={<CourseStream />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/submissions" element={<SubmissionList />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/quizzes" element={<QuizPage />} />
          
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
