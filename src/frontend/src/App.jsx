import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import CourseStream from './pages/CourseStream';
import Register from './pages/Register';

import SubmissionList from "./components/SubmissionList";

import MaterialsPage from "./pages/MaterialsPage";
import QuizPage from "./pages/QuizPage";


function App(){

    return (

        <BrowserRouter>

            <Routes>

                {/* Dashboard */}
                <Route 
                    path="/dashboard" 
                    element={<Dashboard />} 
                />


                {/* Course stream */}
                <Route 
                    path="/course/stream/:courseId" 
                    element={<CourseStream />} 
                />


                {/* Submission management */}
                <Route 
                    path="/submissions" 
                    element={<SubmissionList />} 
                />


                {/* Material management - PA4 */}
                <Route 
                    path="/materials" 
                    element={<MaterialsPage />} 
                />


                {/* Quiz management - PA4 */}
                <Route 
                    path="/quizzes" 
                    element={<QuizPage />} 
                />


                {/* Default */}
                <Route 
                    path="/" 
                    element={<Navigate to="/register" replace />} 
                />


                {/* Register */}
                <Route 
                    path="/register" 
                    element={<Register />} 
                />


            </Routes>

        </BrowserRouter>

    );

}


export default App;