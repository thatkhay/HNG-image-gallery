import React, { useState } from 'react';
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
import { app } from '../firebaseConfig'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const SignInPage = () => {
  let auth = getAuth();
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });
  const [passwordsMatchError, setPasswordsMatchError] = useState('');

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  const transition = { duration: 0.5 };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setPasswordsMatchError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Set the display name if provided
      if (data.displayName) {
        await updateProfile(userCredential.user, {
          displayName: data.displayName,
        });
      }

      console.log('User registered successfully');
      // Redirect or perform other actions upon successful registration
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    setPasswordsMatchError('');
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
      <Container
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Nature and Animal Image Gallery</Typography>
          </Toolbar>
        </AppBar>

        <Container style={{ marginTop: '2rem' }}>
          <Typography variant="h4" gutterBottom>
            Welcome to our Nature and Animal Image Gallery
          </Typography>
          <Typography variant="body1">
            Explore the beauty of nature and the fascinating world of animals through our stunning image gallery. Immerse yourself in breathtaking landscapes, wildlife portraits, and captivating moments captured by talented photographers from around the globe.
          </Typography>
          <Typography variant="body1" style={{ marginTop: '1rem' }}>
            Whether you have a passion for wildlife photography or simply appreciate the wonders of the natural world, you'll find a diverse collection of images that celebrate the Earth's rich biodiversity and scenic landscapes.
          </Typography>
        </Container>

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
                    onChange={handleInput}
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
                    onChange={handleInput}
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
                    onChange={handleInput}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="displayName"
                    label="Display Name"
                    id="displayName"
                    onChange={handleInput}
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
              <p>
                Already have an account? <span><Link to='/'>Sign in</Link></span>
              </p>
              {passwordsMatchError && (
                <Typography variant="body2" color="error" style={{ marginTop: '1rem' }}>
                  {passwordsMatchError}
                </Typography>
              )}
            </form>
          </Paper>
        </Container>
        <Footer />
      </Container>
    </motion.div>
  );
};

export default SignInPage;
