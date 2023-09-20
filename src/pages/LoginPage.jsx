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
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Footer from '../components/Footer';
import { app } from '../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import  { toast } from 'react-toastify'
import Spinner from '../components/Spinner';

const LoginPage = () => {
  const auth = getAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  const handleInput = (e) => {
    let newInput = { [e.target.name]: e.target.value };
    setData({ ...data, ...newInput });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log('signed in');
      // Navigate to image gallery page upon successful login
      navigate('/image-gallery');
    } catch (error) {
      console.log(error);
      toast.error('invalid credentials')
    } finally {
      setLoading(false); // Set loading state to false when done
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
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
            <Typography variant="h5">Login</Typography>
            {/* Conditional rendering based on loading state */}
            {loading ? (
             <Spinner/>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                noValidate
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
                      autoComplete="current-password"
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
                  Sign In
                </Button>
                <p>
                  Don't have an account? <span><Link to='/sign-up'>Sign up</Link></span>
                </p>
              </form>
            )}
          </Paper>
        </Container>
        <Footer />
      </Container>
    </motion.div>
  );
};

export default LoginPage;
