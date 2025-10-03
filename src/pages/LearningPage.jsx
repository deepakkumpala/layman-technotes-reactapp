import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Paper,
  CircularProgress,
  Alert,
  LinearProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, updateUserData } from '../firebase';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const LearningPage = () => {
  const { courseName } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [allCards, setAllCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [error, setError] = useState(null);
  const [slideDirection, setSlideDirection] = useState('left');

  // Load all cards from all lessons
  useEffect(() => {
    const loadAllCards = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/courses/${courseName}/lessons-manifest.json`);
        if (!response.ok) {
          throw new Error('lessons-manifest.json not found. Please create a manifest file.');
        }

        const manifest = await response.json();
        const lessons = manifest.lessons || [];
        const isFlatStructure = manifest.flatStructure || false;

        const courseData = {
          courseTitle: courseName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          flatStructure: isFlatStructure,
          totalLessons: lessons.length
        };

        setCourse(courseData);

        // Build flat array of all cards from all lessons
        const cards = [];
        for (let lessonIndex = 0; lessonIndex < lessons.length; lessonIndex++) {
          const lesson = lessons[lessonIndex];
          const mdFiles = lesson.mdFiles || [];

          for (let fileIndex = 0; fileIndex < mdFiles.length; fileIndex++) {
            cards.push({
              lessonIndex,
              fileIndex,
              fileName: mdFiles[fileIndex],
              lessonTitle: lesson.lessonTitle,
              lessonId: lesson.lessonId,
              isLastCardOfLesson: fileIndex === mdFiles.length - 1
            });
          }
        }

        setAllCards(cards);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (courseName) {
      loadAllCards();
    }
  }, [courseName]);

  // Load markdown content for current card
  useEffect(() => {
    const loadMarkdown = async () => {
      if (allCards.length === 0) return;

      const currentCard = allCards[currentCardIndex];
      if (!currentCard) return;

      try {
        setContentLoading(true);

        let filePath;
        if (course?.flatStructure) {
          filePath = `/courses/${courseName}/lessons/${currentCard.fileName}`;
        } else {
          filePath = `/courses/${courseName}/lessons/${currentCard.lessonId}/${currentCard.fileName}`;
        }

        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error('Failed to load content');
        }

        const text = await response.text();
        setMarkdownContent(text);
      } catch (err) {
        setError(err.message);
      } finally {
        setContentLoading(false);
      }
    };

    loadMarkdown();
  }, [currentCardIndex, allCards, courseName, course]);

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setSlideDirection('right');
      setCurrentCardIndex(currentCardIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (currentCardIndex < allCards.length - 1) {
      setSlideDirection('left');
      setCurrentCardIndex(currentCardIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleFinish = async () => {
    const currentCard = allCards[currentCardIndex];
    if (!currentCard) return;

    // Award points for completing a lesson
    if (auth.currentUser && currentCard.isLastCardOfLesson) {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const currentPoints = userData.totalPoints || 0;
          const updatedPoints = currentPoints + 100;
          await updateUserData(auth.currentUser.uid, { totalPoints: updatedPoints });
        }
      } catch (error) {
        console.error("Error awarding points:", error);
      }
    }

    // Check if this is the last card overall
    if (currentCardIndex === allCards.length - 1) {
      // Award trophy for completing the course
      if (auth.currentUser) {
        try {
          const userDocRef = doc(db, "users", auth.currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const completedCourses = userData.completedCourses || [];
            if (!completedCourses.includes(courseName)) {
              const updatedCompletedCourses = [...completedCourses, courseName];
              await updateUserData(auth.currentUser.uid, { completedCourses: updatedCompletedCourses });
            }
          }
        } catch (error) {
          console.error("Error awarding trophy:", error);
        }
      }

      navigate('/dashboard', {
        state: {
          message: `Congratulations! You've completed the entire course: ${course?.courseTitle}!`
        }
      });
    } else {
      // Move to next card
      handleNext();
    }
  };

  const currentCard = allCards[currentCardIndex];
  const isLastCard = currentCardIndex === allCards.length - 1;
  const isFirstCard = currentCardIndex === 0;
  const progressPercentage = allCards.length > 0 ? ((currentCardIndex + 1) / allCards.length) * 100 : 0;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5' }}>
      {/* Top Progress Bar */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1200 }}>
        <LinearProgress
          variant="determinate"
          value={progressPercentage}
          sx={{
            height: 6,
            bgcolor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              bgcolor: '#1976d2'
            }
          }}
        />
      </Box>

      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          top: 6,
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: 1
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#1976d2', fontWeight: 600 }}>
            {course?.courseTitle || courseName}
          </Typography>
          <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary' }}>
            Card {currentCardIndex + 1} of {allCards.length}
          </Typography>
          <IconButton
            onClick={() => navigate('/dashboard')}
            sx={{ color: 'text.secondary' }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content - Full Screen Card */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 9,
          mb: 2,
          px: 2
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error" sx={{ maxWidth: 800 }}>
            {error}
          </Alert>
        ) : (
          <Box
            key={currentCardIndex}
            sx={{
              maxWidth: 900,
              width: '100%',
              animation: slideDirection === 'left'
                ? 'slideInLeft 0.3s ease-out'
                : 'slideInRight 0.3s ease-out',
              '@keyframes slideInLeft': {
                from: {
                  opacity: 0,
                  transform: 'translateX(50px)'
                },
                to: {
                  opacity: 1,
                  transform: 'translateX(0)'
                }
              },
              '@keyframes slideInRight': {
                from: {
                  opacity: 0,
                  transform: 'translateX(-50px)'
                },
                to: {
                  opacity: 1,
                  transform: 'translateX(0)'
                }
              }
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                minHeight: '60vh',
                maxHeight: '75vh',
                overflowY: 'auto',
                opacity: contentLoading ? 0.5 : 1,
                transition: 'opacity 0.2s'
              }}
            >
              {currentCard && (
                <Typography variant="overline" sx={{ color: '#1976d2', fontWeight: 600, mb: 2, display: 'block' }}>
                  {currentCard.lessonTitle}
                </Typography>
              )}
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  h1: ({ children }) => (
                    <Typography
                      variant="h2"
                      gutterBottom
                      sx={{
                        mt: 2,
                        mb: 3,
                        fontWeight: 700,
                        textAlign: 'center',
                        color: '#1976d2'
                      }}
                    >
                      {children}
                    </Typography>
                  ),
                  h2: ({ children }) => (
                    <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 2, fontWeight: 600 }}>
                      {children}
                    </Typography>
                  ),
                  h3: ({ children }) => (
                    <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 1.5, fontWeight: 600 }}>
                      {children}
                    </Typography>
                  ),
                  p: ({ children }) => (
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 2 }}>
                      {children}
                    </Typography>
                  ),
                  ul: ({ children }) => (
                    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                      {children}
                    </Box>
                  ),
                  ol: ({ children }) => (
                    <Box component="ol" sx={{ pl: 3, mb: 2 }}>
                      {children}
                    </Box>
                  ),
                  li: ({ children }) => (
                    <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7 }}>
                      {children}
                    </Typography>
                  )
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            </Paper>
          </Box>
        )}
      </Box>

      {/* Navigation Controls */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'white',
          boxShadow: 3,
          p: 2
        }}
      >
        <Box
          sx={{
            maxWidth: 900,
            mx: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2
          }}
        >
          <Button
            variant="outlined"
            size="large"
            onClick={handlePrevious}
            disabled={isFirstCard}
            startIcon={<ArrowBackIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              px: 4
            }}
          >
            Previous
          </Button>

          <Button
            variant="contained"
            size="large"
            onClick={isLastCard ? handleFinish : handleNext}
            endIcon={<ArrowForwardIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
              bgcolor: isLastCard ? '#4caf50' : '#1976d2',
              '&:hover': {
                bgcolor: isLastCard ? '#45a049' : '#1565c0'
              }
            }}
          >
            {isLastCard ? 'Finish Course' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LearningPage;