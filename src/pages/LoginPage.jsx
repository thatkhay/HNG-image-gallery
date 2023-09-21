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
         <AppBar position="static" style={{backgroundColor: 'black'}}>
          <Toolbar style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Typography variant="h6">Seasons Image Gallery</Typography>
          </Toolbar>
        </AppBar>

        <Container style={{ marginTop: '2rem' }}>
          <Container>
  <Typography variant="h4" gutterBottom>
    Welcome to our Seasons Image Gallery
  </Typography>
  <Typography variant="body1">
    Explore the enchanting beauty of the four seasons through our stunning image gallery. Immerse yourself in the ever-changing landscapes, vibrant colors, and unique atmospheres that each season brings.
  </Typography>
  <Typography variant="body1" style={{ marginTop: '1rem' }}>
    Whether you enjoy the blooming flowers of spring, the warmth of summer, the colorful foliage of autumn, or the serene snowscapes of winter, you'll find a diverse collection of images that capture the essence of each season's charm.
  </Typography>
</Container>

        </Container>

        <Container component="main" maxWidth="xs" style={{marginTop: '2rem'}}>
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
                  style={{ marginTop: '2rem' , backgroundColor: 'black'}}
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
