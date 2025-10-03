import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import {
  Box, AppBar, Toolbar, Typography, Button,
  CssBaseline, Container, Grid, Card, CardContent,
  Chip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';

const Trophies = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setTotalPoints(userData.totalPoints || 0);
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  const generateTrophies = () => {
    const icons = ['🏆', '🥇', '🥈', '🥉', '⭐', '🌟', '💫', '✨', '🎖️', '🏅'];
    const trophies = [];

    for (let i = 1; i <= 50; i++) {
      const points = i * 100;
      trophies.push({
        id: i,
        title: `${points} Points`,
        pointsRequired: points,
        icon: icons[(i - 1) % icons.length]
      });
    }
    return trophies;
  };

  const trophies = generateTrophies();

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 0.6;
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1.1);
            }
          }
        `}
      </style>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CssBaseline />

      {/* Header AppBar */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SchoolIcon sx={{ mr: 2 }} />
            <Typography variant="h6" noWrap>
              Layman Tech Notes - Learning Hub
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={() => navigate('/dashboard')}
              startIcon={<ArrowBackIcon />}
              sx={{
                textTransform: 'none',
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white'
                }
              }}
            >
              Back to Dashboard
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8,
          pb: 6,
          px: 3,
          backgroundColor: '#f8f9fa'
        }}
      >
        <Container maxWidth="xl">
          {/* Header Section */}
          <Box sx={{ mb: 5, textAlign: 'center' }}>
            <EmojiEventsIcon sx={{ fontSize: 80, color: '#FFD700', mb: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}>
              Your Trophy Collection
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              Unlock achievements as you progress through your learning journey
            </Typography>
            <Chip
              icon={<SchoolIcon />}
              label={`Total Points: ${totalPoints}`}
              sx={{
                fontSize: '1.2rem',
                padding: '20px 15px',
                backgroundColor: '#667eea',
                color: 'white',
                fontWeight: 600,
                '& .MuiChip-icon': { color: 'white', fontSize: '1.5rem' }
              }}
            />
          </Box>

          {/* Trophy Grid - Simple and Clean */}
          <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 1200, mx: 'auto' }}>
            {trophies.map((trophy) => {
              const isUnlocked = totalPoints >= trophy.pointsRequired;

              return (
                <Grid item xs={6} sm={4} md={2.4} lg={2.4} key={trophy.id}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: isUnlocked ? '#fff' : '#f5f5f5',
                      border: '2px solid',
                      borderColor: isUnlocked ? '#4caf50' : '#e0e0e0',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: isUnlocked ? 'translateY(-4px)' : 'none',
                        boxShadow: isUnlocked ? '0 4px 12px rgba(76, 175, 80, 0.3)' : 'none'
                      }
                    }}
                  >
                    {/* Trophy Icon */}
                    <Box
                      sx={{
                        position: 'relative',
                        fontSize: 40,
                        mb: 1,
                        filter: isUnlocked ? 'none' : 'grayscale(100%)',
                        opacity: isUnlocked ? 1 : 0.4
                      }}
                    >
                      {trophy.icon}
                      {!isUnlocked && (
                        <LockIcon
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: 20,
                            color: '#999'
                          }}
                        />
                      )}
                    </Box>

                    {/* Trophy Title */}
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: isUnlocked ? '#4caf50' : '#999',
                        fontSize: '0.75rem'
                      }}
                    >
                      {trophy.title}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 4,
          px: 3,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h5"
            sx={{
              fontWeight: 300,
              fontStyle: 'italic',
              mb: 2,
              lineHeight: 1.6,
              opacity: 0.95
            }}
          >
            "I believe in leading by example and making sure technical issues must be balanced with the needs of customers and the organizational interest."
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.7
            }}
          >
            - Deepak Kumpala
          </Typography>

          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            opacity: 0.8,
            pt: 2,
            borderTop: '1px solid rgba(255,255,255,0.2)'
          }}>
            <Typography variant="body2">
              © {new Date().getFullYear()} • Made with
            </Typography>
            <FavoriteIcon sx={{ fontSize: '1rem', color: '#ff6b6b' }} />
            <Typography variant="body2">
              for knowledge seekers everywhere
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
    </>
  );
};

export default Trophies;
