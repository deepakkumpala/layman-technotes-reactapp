import React, { useState } from 'react';
import {
  Box, Container, Grow, Paper, Typography, TextField, InputAdornment,
  IconButton, Button, Divider, Fade, CircularProgress, Grid
} from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff, CheckCircle } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

 const handleSignin = () => {
  setLoading(true);
  setError('');
  setSuccess('');

  setTimeout(() => {
    if (!email || !password) {
      setError('Email and password are required');
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters');
    } else {
      //setSuccess('Signed in successfully!');
      navigate('/dashboard');
    }
    setLoading(false);
  }, 1500);
};

  const handleGoogleSignin = () => {
    setLoading(true);
    setError('');
    setSuccess('');

    // Simulate Google sign-in
    setTimeout(() => {
       navigate('/dashboard');
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSignin();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: '#f8f9fa'
      }}
    >
      <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', py: 4 }}>
        <Grid container spacing={0} sx={{ minHeight: '80vh' }}>
          {/* Left Side - Benefits */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              p: { xs: 4, md: 8 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderRadius: { xs: '16px 16px 0 0', md: '16px 0 0 16px' }
            }}
          >
            <Box sx={{ mb: 4 }}>
              <SchoolIcon sx={{ fontSize: 60, mb: 3 }} />
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                Layman Tech Notes
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 400, opacity: 0.95, mb: 4 }}>
                Stay Sharp, Stay Updated
              </Typography>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Why Layman Tech Notes?
              </Typography>

              {[
                {
                  title: 'Quick Technical Refreshers',
                  description: 'Perfect for busy professionals who need to brush up on concepts fast'
                },
                {
                  title: 'Simplified Explanations',
                  description: 'Complex topics explained in plain language anyone can understand'
                },
                {
                  title: 'Bite-Sized Learning',
                  description: 'Learn at your own pace with digestible content chunks'
                },
                {
                  title: 'Stay Interview-Ready',
                  description: 'Keep your technical knowledge sharp for any opportunity'
                },
                {
                  title: 'Test Your Knowledge',
                  description: 'Practice with interview-style assessments'
                }
              ].map((benefit, index) => (
                <Box key={index} sx={{ display: 'flex', mb: 3, alignItems: 'flex-start' }}>
                  <CheckCircle sx={{ mr: 2, mt: 0.5, fontSize: 24 }} />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {benefit.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Right Side - Sign In Form */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              bgcolor: 'white',
              p: { xs: 4, md: 8 },
              display: 'flex',
              alignItems: 'center',
              borderRadius: { xs: '0 0 16px 16px', md: '0 16px 16px 0' }
            }}
          >
            <Box sx={{ width: '100%', maxWidth: 450, mx: 'auto' }}>
            {/* Header */}
            <Box textAlign="center" mb={3}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 0.5,
                  fontSize: { xs: '1.75rem', sm: '2rem' }
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in to continue
              </Typography>
            </Box>

            {/* Form */}
            <Box component="form">
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                disabled={loading}
                error={error.includes('email')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                margin="normal"
                disabled={loading}
                error={error.includes('Password')}
                helperText="Enter your password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Error/Success Messages */}
              {error && (
                <Fade in>
                  <Box sx={{ mt: 2, p: 2, borderRadius: 2, backgroundColor: '#ffebee', border: '1px solid #ffcdd2' }}>
                    <Typography color="error" variant="body2">⚠️ {error}</Typography>
                  </Box>
                </Fade>
              )}

              {success && (
                <Fade in>
                  <Box sx={{ mt: 2, p: 2, borderRadius: 2, backgroundColor: '#e8f5e8', border: '1px solid #c8e6c9' }}>
                    <Typography color="success.main" variant="body2">✅ {success}</Typography>
                  </Box>
                </Fade>
              )}

              {/* Sign In Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSignin}
                disabled={loading}
                sx={{
                  mt: 2.5,
                  py: 1.2,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 25px rgba(102, 126, 234, 0.4)',
                    background: 'linear-gradient(45deg, #5a6fd8, #6b42a6)',
                  },
                  '&:disabled': {
                    background: 'linear-gradient(45deg, #ccc, #999)',
                  }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>

              {/* Divider */}
              <Box sx={{ my: 2.5 }}>
                <Divider>
                  <Typography variant="body2" color="text.secondary">or continue with</Typography>
                </Divider>
              </Box>

              {/* Google Sign In Button */}
              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={handleGoogleSignin}
                disabled={loading}
                startIcon={<GoogleIcon />}
                sx={{
                  py: 1.2,
                  borderRadius: 2,
                  borderColor: '#dadce0',
                  color: '#3c4043',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                    borderColor: '#dadce0',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign in with Google'}
              </Button>
            </Box>

            {/* Footer */}
            <Box textAlign="center" mt={3}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  style={{
                    color: '#667eea',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
                >
                  Sign up here
                </Link>
              </Typography>
            </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Signin;