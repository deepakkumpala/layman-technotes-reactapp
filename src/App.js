import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Signup from './pages/Signup'; // adjust path as needed
import Dashboard from './pages/Dashboard'; // adjust path as needed
import Signin from './pages/signin'; // adjust path as needed
import LearningPage from './pages/LearningPage'; // adjust path as needed
import Trophies from './pages/Trophies'; // adjust path as needed
import Assessment from './pages/Assessment'; // adjust path as needed
import ProjectOverview from './pages/ProjectOverview'; // adjust path as needed
// import Login from './components/Login'; // if you have a login component
import ProtectedRoute from './pages/ProtectedRoute';


const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/signup" element={<Signup />} />
           <Route path="/signin" element={<Signin />} /> 
          {/* <Route path="/login" element={<Login />} /> */}
          
          {/* Protected routes */}
         <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

          <Route path="/trophies" element={
            <ProtectedRoute>
              <Trophies />
            </ProtectedRoute>
          } />

            {/* Learning page route - FIXED: Changed to match Dashboard navigation */}
          <Route path="/learning/course/:courseName" element={
            <ProtectedRoute>
              <LearningPage />
            </ProtectedRoute>
          } />

          {/* Assessment page route */}
          <Route path="/assessment/:courseName" element={
            <ProtectedRoute>
              <Assessment />
            </ProtectedRoute>
          } />

          {/* Project Overview page route */}
          <Route path="/project-overview" element={
            <ProtectedRoute>
              <ProjectOverview />
            </ProtectedRoute>
          } />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/signup" replace />} />
          
          {/* Catch all - redirect to signup */}
          <Route path="*" element={<Navigate to="/signup" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;