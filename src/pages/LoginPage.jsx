import React from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';
// import { motion } from 'framer-motion';

const LoginPage = () => {
  return (
    // <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   transition={{ duration: 0.5 }}
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     minHeight: '100vh',
    //   }}
    // >
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
          <Typography variant="h5">Login</Typography>
          <form
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
          </form>
        </Paper>
      </Container>
    // </motion.div>
  );
};

export default LoginPage;
