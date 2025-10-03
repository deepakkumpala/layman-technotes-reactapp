import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Paper,
  Container,
  Avatar,
  Divider,
  InputAdornment,
  IconButton,
  Fade,
  Grow,
  Grid
} from '@mui/material';
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  AccountCircle,
  CheckCircle
} from '@mui/icons-material';
import SchoolIcon from '@mui/icons-material/School';

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Email validation helper
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation helper
  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  const handleSignup = async () => {
    setError('');
    setSuccess('');
    
    // Input validation
    if (!email || !password || !username) {
      setError('Please fill all fields');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!isValidPassword(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (username.trim().length < 2) {
      setError('Username must be at least 2 characters long');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      // ✅ Set displayName from input
      await updateProfile(user, {
        displayName: username.trim()
      });


      await setDoc(doc(db, 'users', user.uid), {
        username: username.trim(),
        email: user.email,
        points: 0,
        createdAt: new Date().toISOString(),
        authProvider: 'email',
        totalPoints: 0,
        completedCourses: [],
      });

      navigate('/dashboard');
      
    } catch (error) {
      console.error('Signup error:', error);
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please use a different email.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Please choose a stronger password.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your internet connection and try again.');
          break;
        default:
          setError(error.message || 'An error occurred during signup. Please try again.');
      }
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          username: user.displayName || 'Google User',
          email: user.email,
          points: 0,
          createdAt: new Date().toISOString(),
          authProvider: 'google',
          totalPoints: 0,
          completedCourses: [],
        });
      }

      setSuccess('Signed up with Google successfully! 🎉 Redirecting...');
      setError('');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Google signup error:', error);
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Sign-up was cancelled. Please try again.');
          break;
        case 'auth/popup-blocked':
          setError('Popup was blocked by your browser. Please allow popups and try again.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your internet connection and try again.');
          break;
        default:
          setError(error.message || 'An error occurred during Google sign-up. Please try again.');
      }
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
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

          {/* Right Side - Sign Up Form */}
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
                Join Us Today
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                Create your account and get started
              </Typography>
            </Box>

            {/* Form */}
            <Box component="form">
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                disabled={loading}
                error={error.includes('Username')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                    }
                  }
                }}
              />

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                disabled={loading}
                error={error.includes('email') || error.includes('Email')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                    }
                  }
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
                helperText="Password must be at least 6 characters long"
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                    }
                  }
                }}
              />

              {/* Error/Success Messages */}
              {error && (
                <Fade in={true}>
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: '#ffebee',
                      border: '1px solid #ffcdd2'
                    }}
                  >
                    <Typography color="error" variant="body2">
                      ⚠️ {error}
                    </Typography>
                  </Box>
                </Fade>
              )}

              {success && (
                <Fade in={true}>
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: '#e8f5e8',
                      border: '1px solid #c8e6c9'
                    }}
                  >
                    <Typography color="success.main" variant="body2">
                      ✅ {success}
                    </Typography>
                  </Box>
                </Fade>
              )}

              {/* Sign Up Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSignup}
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
                  transition: 'all 0.3s ease',
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
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Create Account'
                )}
              </Button>

              {/* Divider */}
              <Box sx={{ my: 2.5 }}>
                <Divider>
                  <Typography variant="body2" color="text.secondary">
                    or continue with
                  </Typography>
                </Divider>
              </Box>

              {/* Google Sign Up Button */}
              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={handleGoogleSignup}
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
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                    borderColor: '#dadce0',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  'Sign up with Google'
                )}
              </Button>
            </Box>

            {/* Footer */}
            <Box textAlign="center" mt={3}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                Already have an account?{' '}
               <Link
      to="/signin"
      style={{
        color: '#667eea',
        cursor: 'pointer',
        fontWeight: 'bold',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
      onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
    >
      Sign in here
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

export default Signup;