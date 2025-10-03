import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ProjectOverview = () => {
  const navigate = useNavigate();
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const response = await fetch('/PROJECT_OVERVIEW.md');
        if (response.ok) {
          const text = await response.text();
          setMarkdownContent(text);
        }
      } catch (error) {
        console.error('Error loading PROJECT_OVERVIEW.md:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header AppBar */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SchoolIcon sx={{ mr: 2 }} />
            <Typography variant="h6" noWrap>
              Layman Tech Notes - Project Overview
            </Typography>
          </Box>

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
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 10,
          pb: 6,
          px: 3,
          backgroundColor: '#f8f9fa'
        }}
      >
        <Container maxWidth="lg">
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 2,
                minHeight: '500px'
              }}
            >
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
                    <Typography variant="h3" gutterBottom sx={{ mt: 2, mb: 2, fontWeight: 600, fontFamily: 'Roboto, Arial, sans-serif' }}>
                      {children}
                    </Typography>
                  ),
                  h2: ({ children }) => (
                    <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 2, fontWeight: 600, fontFamily: 'Roboto, Arial, sans-serif' }}>
                      {children}
                    </Typography>
                  ),
                  h3: ({ children }) => (
                    <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 1.5, fontWeight: 600, fontFamily: 'Roboto, Arial, sans-serif' }}>
                      {children}
                    </Typography>
                  ),
                  p: ({ children }) => (
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 2, fontFamily: 'Roboto, Arial, sans-serif' }}>
                      {children}
                    </Typography>
                  ),
                  ul: ({ children }) => (
                    <Box component="ul" sx={{ pl: 3, mb: 2, fontFamily: 'Roboto, Arial, sans-serif' }}>
                      {children}
                    </Box>
                  ),
                  ol: ({ children }) => (
                    <Box component="ol" sx={{ pl: 3, mb: 2, fontFamily: 'Roboto, Arial, sans-serif' }}>
                      {children}
                    </Box>
                  ),
                  li: ({ children }) => (
                    <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.7, fontFamily: 'Roboto, Arial, sans-serif' }}>
                      {children}
                    </Typography>
                  )
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            </Paper>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default ProjectOverview;
