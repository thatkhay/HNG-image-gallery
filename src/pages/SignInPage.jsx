import React from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  AppBar,
  Toolbar,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const SignInPage = () => {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  const transition = { duration: 0.5 };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="initial"
      variants={variants}
      transition={transition}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
<Container style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100vh', flexDirection: 'column'}}>
<AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Nature and Animal Image Gallery</Typography>
      </Toolbar>
    </AppBar>

      <Container component="main" maxWidth="xs">
        
        <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
          <Typography variant="h5">Sign Up</Typography>
          <form
            noValidate
            onSubmit={handleFormSubmit}
            style={{ marginTop: '1rem' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '2rem' }}
            >
              Sign up
            </Button>
            <p>Already have an account? <span><Link to='/'>Sign in</Link></span></p>
          </form>
        </Paper>
      </Container>
      <Footer/>
      </Container>

    </motion.div>
  );
};

export default SignInPage;
