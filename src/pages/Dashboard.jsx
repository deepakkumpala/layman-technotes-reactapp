import React, { useState, useEffect, useMemo } from 'react';
import { getAuth } from 'firebase/auth';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';
import {
  Box, AppBar, Toolbar, Typography, IconButton,
  CssBaseline, Container, Button, Card,
  CardContent, Chip, TextField, InputAdornment,
  Pagination
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { useNavigate } from 'react-router-dom';
import BuildIcon from '@mui/icons-material/Build';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DataObjectIcon from '@mui/icons-material/DataObject';
import InfoIcon from '@mui/icons-material/Info';


const Dashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  
  const [totalPoints, setTotalPoints] = useState(0);
  const [completedCourses, setCompletedCourses] = useState([]);

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setTotalPoints(userData.totalPoints || 0);
          setCompletedCourses(userData.completedCourses || []);
        }
      });
      return () => unsubscribe();
    }
  }, [user]);
  
  // Search and Pagination State
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;

  const [availableCourses, setAvailableCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [courseKeywords, setCourseKeywords] = useState({});

  // Auto-discover courses from the filesystem
  useEffect(() => {
    const discoverCourses = async () => {
      try {
        setCoursesLoading(true);
        // Try to fetch a manifest file that lists all courses
        // If it doesn't exist, we'll fall back to the hardcoded list
        const response = await fetch('/courses/manifest.json');
        if (response.ok) {
          const manifest = await response.json();
          setAvailableCourses(manifest.courses || []);
        } else {
          // Fallback to existing course folders
          const knownCourses = [
            'a_vs_b',
            'artificial_intelligence',
            'architectural_patterns',
            'data_and_analytics',
            'design_principles',
            'networking_security',
            'platform_knowledge',
            'cyber_security'
          ];
          setAvailableCourses(knownCourses);
        }
      } catch (error) {
        console.error('Error discovering courses:', error);
        // Fallback to existing course folders
        setAvailableCourses([
          'a_vs_b',
          'artificial_intelligence',
          'architectural_patterns',
          'data_and_analytics',
          'design_principles',
          'networking_security',
          'platform_knowledge',
          'cyber_security'
        ]);
      } finally {
        setCoursesLoading(false);
      }
    };

    discoverCourses();
  }, []);

  // Load keywords
  useEffect(() => {
    const loadKeywords = async () => {
      try {
        const response = await fetch('/courses/keywords.json');
        if (response.ok) {
          const data = await response.json();
          setCourseKeywords(data.courses || {});
        }
      } catch (error) {
        console.error('Error loading keywords:', error);
      }
    };
    loadKeywords();
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    window.location.href = '/signin';
  };

  const handleLearn = (courseFolder) => {
    navigate(`/learning/course/${courseFolder}`);
  };
  
  const handleAssessment = (folderName) => {
    navigate(`/assessment/${folderName}`);
  };

  // Helper function to format course folder names to display titles
  const formatCourseTitle = (folderName) => {
    return folderName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Helper function to get course metadata
  const getCourseMetadata = (folderName) => {
    const metadata = {
      'a_vs_b': {
        description: "Quick comparisons between similar technologies, concepts, and patterns. Perfect for understanding the differences at a glance.",
        icon: <DataObjectIcon sx={{ fontSize: 40 }} />,
        iconColor: "#e91e63",
        difficulty: "Beginner"
      },
      'artificial_intelligence': {
        description: "This section introduces the fundamentals of artificial intelligence, from machine learning and neural networks to natural language processing, and explores how AI can be applied to solve real-world problems and enhance decision-making.",
        icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
        iconColor: "#2196f3",
        difficulty: "Intermediate"
      },
      'architectural_patterns': {
        description: "This section helps you learn how systems are structured, from microservices to event-driven models, and how to design for scalability and resilience.",
        icon: <BuildIcon sx={{ fontSize: 40 }} />,
        iconColor: "#2196f3",
        difficulty: "Intermediate"
      },
      'data_and_analytics': {
        description: "Understand how data flows through systems. From SQL to Kafka, this section covers storage, processing, and real-time analytics.",
        icon: <InsertChartIcon sx={{ fontSize: 40 }} />,
        iconColor: "#ff9800",
        difficulty: "Intermediate"
      },
      'design_principles': {
        description: "Dive into foundational software design concepts like OOP, TDD, and MVC to write cleaner, maintainable code.",
        icon: <DesignServicesIcon sx={{ fontSize: 40 }} />,
        iconColor: "#9c27b0",
        difficulty: "Beginner"
      },
      'networking_security': {
        description: "Discover how systems communicate and stay secure. Topics include TLS, OAuth, JWT, DNS, and more.",
        icon: <VpnKeyIcon sx={{ fontSize: 40 }} />,
        iconColor: "#f44336",
        difficulty: "Advanced"
      },
      'platform_knowledge': {
        description: "Explore the infrastructure side of tech—containers, CI/CD, cloud platforms, and serverless computing.",
        icon: <CloudCircleIcon sx={{ fontSize: 40 }} />,
        iconColor: "#2196f3",
        difficulty: "Intermediate"
      },
      'cyberr_security': {
        description: ".",
        icon: <CloudCircleIcon sx={{ fontSize: 40 }} />,
        iconColor: "#2196f3",
        difficulty: "Intermediate"
      }
    };

    return metadata[folderName] || {
      description: "Explore this course to learn new technical concepts and skills.",
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      iconColor: "#2196f3",
      difficulty: "Intermediate"
    };
  };

  // Generate techTopics from available courses
  const techTopics = availableCourses.map((courseFolder, index) => {
    const metadata = getCourseMetadata(courseFolder);
    const keywords = courseKeywords[courseFolder]?.keywords || [];
    return {
      id: index + 1,
      title: formatCourseTitle(courseFolder),
      folderName: courseFolder,
      description: metadata.description,
      icon: metadata.icon,
      iconColor: metadata.iconColor,
      difficulty: metadata.difficulty,
      keywords: keywords
    };
  });

  // Filter courses based on search query (including keywords)
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return techTopics;

    const query = searchQuery.toLowerCase();
    return techTopics.filter(topic => {
      const matchesTitle = topic.title.toLowerCase().includes(query);
      const matchesDescription = topic.description.toLowerCase().includes(query);
      const matchesDifficulty = topic.difficulty.toLowerCase().includes(query);
      const matchesKeywords = topic.keywords.some(keyword =>
        keyword.toLowerCase().includes(query)
      );

      return matchesTitle || matchesDescription || matchesDifficulty || matchesKeywords;
    });
  }, [searchQuery, techTopics]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredTopics.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentTopics = filteredTopics.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return '#4caf50';
      case 'Intermediate': return '#ff9800';
      case 'Advanced': return '#f44336';
      case 'Expert': return '#9c27b0';
      default: return '#2196f3';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      {/* Header AppBar */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SchoolIcon sx={{ mr: 2 }} />
            <Typography variant="h6" noWrap>
              Layman Tech Notes - Stay Sharp, Stay Updated
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={() => navigate('/project-overview')}
              startIcon={<InfoIcon />}
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
              About
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={() => navigate('/trophies')}
              startIcon={<EmojiEventsIcon />}
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
              Trophies
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={handleLogout}
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
              Logout
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
          {/* User Dashboard Section */}
          <Box sx={{ mb: 5 }}>
            <Card sx={{ 
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <CardContent sx={{ p: 5, position: 'relative', zIndex: 1 }}>
                <Box sx={{ maxWidth: '800px' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1.5 }}>
                    Welcome Back, {user?.displayName?.split(' ')[0] || 'User'}!
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.95, fontWeight: 400, mb: 3 }}>
                    Keep your skills fresh with quick technical refreshers
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Chip 
                      icon={<SchoolIcon />}
                      label={`Member since ${new Date(user?.metadata?.creationTime || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
                      sx={{ 
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontWeight: 600,
                        backdropFilter: 'blur(10px)',
                        '& .MuiChip-icon': { color: 'white' }
                      }}
                    />
                    <Chip
                      icon={<EmojiEventsIcon />}
                      label={`Points: ${totalPoints}`}
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontWeight: 600,
                        backdropFilter: 'blur(10px)',
                        '& .MuiChip-icon': { color: 'white' }
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
              <Box sx={{ 
                position: 'absolute', 
                top: -50, 
                right: -50, 
                width: 200, 
                height: 200, 
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                zIndex: 0
              }} />
              <Box sx={{ 
                position: 'absolute', 
                bottom: -30, 
                right: 100, 
                width: 150, 
                height: 150, 
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.08)',
                zIndex: 0
              }} />
            </Card>
          </Box>

          {/* Section Header with Search */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                  Tech Refreshers
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Quick technical refreshers for busy professionals
                </Typography>
              </Box>

              {/* Search Bar */}
              <TextField
                placeholder="Search topics, keywords..."
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  minWidth: { xs: '100%', sm: '300px', md: '400px' },
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    borderRadius: 3,
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#2196f3',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2196f3',
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#666' }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={handleClearSearch}
                        edge="end"
                      >
                        <ClearIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            {/* Results count */}
            {searchQuery && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Found {filteredTopics.length} {filteredTopics.length === 1 ? 'topic' : 'topics'}
              </Typography>
            )}
          </Box>

          {/* Topic Cards - One per Row */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
            {currentTopics.map((topic) => (
              <Card
                key={topic.id}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  borderRadius: 3,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid #e0e0e0',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                    borderColor: '#2196f3'
                  }
                }}
              >
                {/* Left Side - Content */}
                <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                 

                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                      color: '#1a1a1a'
                    }}
                  >
                    {topic.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.7,
                      mb: 2
                    }}
                  >
                    {topic.description}
                  </Typography>

                  {/* Keywords/Tags */}
                  {topic.keywords && topic.keywords.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 'auto' }}>
                      {topic.keywords.slice(0, 6).map((keyword, idx) => (
                        <Chip
                          key={idx}
                          label={keyword}
                          size="small"
                          sx={{
                            backgroundColor: '#f5f5f5',
                            color: '#666',
                            fontSize: '0.7rem',
                            height: '24px',
                            '&:hover': {
                              backgroundColor: '#e3f2fd',
                              color: '#2196f3'
                            }
                          }}
                        />
                      ))}
                      {topic.keywords.length > 6 && (
                        <Chip
                          label={`+${topic.keywords.length - 6} more`}
                          size="small"
                          sx={{
                            backgroundColor: '#e3f2fd',
                            color: '#2196f3',
                            fontSize: '0.7rem',
                            height: '24px',
                            fontWeight: 600
                          }}
                        />
                      )}
                    </Box>
                  )}
                </Box>

                {/* Right Side - Buttons */}
                <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: { xs: 'row', md: 'column' },
                    gap: 2,
                    p: 3,
                    alignItems: 'stretch',
                    justifyContent: 'center',
                    minWidth: { xs: '100%', md: '280px' },
                    borderLeft: { xs: 'none', md: '1px solid #e0e0e0' },
                    borderTop: { xs: '1px solid #e0e0e0', md: 'none' }
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleLearn(topic.folderName)}
                    sx={{
                      backgroundColor: "#2196f3",
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      py: 1.5,
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                      '&:hover': {
                        backgroundColor: "#1976d2",
                        boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <SchoolIcon sx={{ mr: 1, fontSize: 20 }} />
                    Quick Review
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleAssessment(topic.folderName)}
                    sx={{
                      borderColor: "#e0e0e0",
                      color: "#666",
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      py: 1.5,
                      borderRadius: 2,
                      borderWidth: 2,
                      '&:hover': {
                        backgroundColor: "#f5f5f5",
                        borderColor: "#2196f3",
                        borderWidth: 2,
                        color: "#2196f3"
                      }
                    }}
                  >
                    <QuizIcon sx={{ mr: 1, fontSize: 20 }} />
                    Test Yourself
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>

          {/* Pagination */}
          {filteredTopics.length > coursesPerPage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontWeight: 600,
                    fontSize: '1rem'
                  }
                }}
              />
            </Box>
          )}

          {/* Empty State - No Results */}
          {filteredTopics.length === 0 && (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                px: 3
              }}
            >
              <SearchIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
              <Typography variant="h5" color="text.secondary" gutterBottom>
                No topics found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your search terms
              </Typography>
              <Button
                variant="outlined"
                onClick={handleClearSearch}
                sx={{ textTransform: 'none' }}
              >
                Clear Search
              </Button>
            </Box>
          )}

          {/* Empty State - No Topics at all */}
          {techTopics.length === 0 && !searchQuery && (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                px: 3
              }}
            >
              <SchoolIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
              <Typography variant="h5" color="text.secondary" gutterBottom>
                No refreshers available yet
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Check back soon for new technical refreshers
              </Typography>
            </Box>
          )}
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
  );
};

export default Dashboard;