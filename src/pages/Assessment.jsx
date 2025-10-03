import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Paper,
  Container,
  LinearProgress,
  Card,
  CardContent,
  Chip,
  IconButton,
  Collapse,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SchoolIcon from '@mui/icons-material/School';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Assessment = () => {
  const { courseName } = useParams();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [userNotes, setUserNotes] = useState({});

  useEffect(() => {
    const loadAssessment = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/courses/${courseName}/assessment.json`);

        if (!response.ok) {
          throw new Error('Assessment not found for this course');
        }

        const data = await response.json();
        setAssessment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseName) {
      loadAssessment();
    }
  }, [courseName]);

  const handleNext = () => {
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowHint(false);
      setShowAnswer(false);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowHint(false);
      setShowAnswer(false);
      window.scrollTo(0, 0);
    }
  };

  const handleFinish = () => {
    setCompleted(true);
    window.scrollTo(0, 0);
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setShowHint(false);
    setShowAnswer(false);
    setCompleted(false);
    setUserNotes({});
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 8 }}>
        <LinearProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!assessment) return null;

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100;

  if (completed) {
    return (
      <>
        <AppBar position="fixed">
          <Toolbar>
            <SchoolIcon sx={{ mr: 2 }} />
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {assessment.courseTitle} - Assessment Complete
            </Typography>
            <Button
              color="inherit"
              onClick={() => navigate('/dashboard')}
              startIcon={<ArrowBackIcon />}
              sx={{ textTransform: 'none' }}
            >
              Dashboard
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 12, mb: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
          >
            <EmojiEventsIcon sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Congratulations!
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              You've completed the {assessment.assessmentTitle}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              You've reviewed all {assessment.questions.length} interview questions.
              Great job preparing for technical discussions!
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleRetake}
                sx={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                Retake Assessment
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/dashboard')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 600,
                  '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                Back to Dashboard
              </Button>
            </Box>
          </Paper>
        </Container>
      </>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <AppBar position="fixed">
        <Toolbar>
          <SchoolIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {assessment.courseTitle} - Interview Assessment
          </Typography>
          <Button
            color="inherit"
            onClick={() => navigate('/dashboard')}
            startIcon={<ArrowBackIcon />}
            sx={{ textTransform: 'none' }}
          >
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      {/* Progress Bar */}
      <Box sx={{ pt: 8 }}>
        <Box sx={{ backgroundColor: 'white', borderBottom: '1px solid #e0e0e0', py: 2 }}>
          <Container maxWidth="md">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Question {currentQuestionIndex + 1} of {assessment.questions.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round(progress)}% Complete
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 1 }} />
          </Container>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Question Card */}
        <Card elevation={3} sx={{ mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Chip
                label={`Question ${currentQuestionIndex + 1}`}
                color="primary"
                sx={{ mr: 2, fontWeight: 600 }}
              />
              <Chip
                label={`${currentQuestion.points} points`}
                variant="outlined"
                size="small"
              />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 600, mb: 4, color: '#1a1a1a', lineHeight: 1.6 }}>
              {currentQuestion.question}
            </Typography>

           

          

            {/* Sample Answer Section */}
            <Box>
              <Button
                startIcon={showAnswer ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                onClick={() => setShowAnswer(!showAnswer)}
                sx={{ textTransform: 'none', mb: 1 }}
                variant="outlined"
                color="success"
              >
                {showAnswer ? 'Hide Sample Answer' : 'Show Sample Answer'}
              </Button>
              <Collapse in={showAnswer}>
                <Alert severity="success" icon={<CheckCircleIcon />} sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Sample Answer:
                  </Typography>
                  <Typography variant="body2">
                    {currentQuestion.sampleAnswer}
                  </Typography>
                </Alert>
              </Collapse>
            </Box>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            startIcon={<ArrowBackIcon />}
            sx={{ textTransform: 'none', fontWeight: 600, px: 4 }}
          >
            Previous
          </Button>

          {currentQuestionIndex === assessment.questions.length - 1 ? (
            <Button
              variant="contained"
              size="large"
              color="success"
              onClick={handleFinish}
              endIcon={<CheckCircleIcon />}
              sx={{ textTransform: 'none', fontWeight: 600, px: 4 }}
            >
              Finish Assessment
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={handleNext}
              endIcon={<ArrowForwardIcon />}
              sx={{ textTransform: 'none', fontWeight: 600, px: 4 }}
            >
              Next Question
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Assessment;
