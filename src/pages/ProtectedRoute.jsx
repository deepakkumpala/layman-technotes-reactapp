import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase'; // adjust path as needed
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('ProtectedRoute: Setting up auth state listener');
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log('ProtectedRoute: Auth state changed. currentUser:', currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      console.log('ProtectedRoute: Cleaning up auth state listener');
      unsubscribe();
    };
  }, []);

  console.log('ProtectedRoute: Render. user:', user, 'loading:', loading);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return user ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;