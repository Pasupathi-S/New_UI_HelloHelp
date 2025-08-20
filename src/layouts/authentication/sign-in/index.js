import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import {
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import axios from 'axios';

// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout';

// Images
import logo from 'assets/images/Dashboard-logo.png';

function Basic() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const [showPasswordThree, setShowPasswordThree] = useState(false);

  // Reset password modal state
  const [openReset, setOpenReset] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowPasswordTwo = () => setShowPasswordTwo((prev) => !prev);
  const handleClickShowPasswordThree = () => setShowPasswordThree((prev) => !prev);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setError(false);

    try {
      const response = await axios.post(
        'https://lemonpeak-hellohelp-backend.onrender.com/api/auth/login',
        {
          email,
          password,
        }
      );

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data.error) {
        if (error.response.data.error.toLowerCase().includes('invalid credentials')) {
          setError('Email or Password is incorrect');
        } else {
          setError(error.response.data);
        }
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  const handleResetPasswordSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!oldPassword || !newPassword) {
      alert('Please fill all fields');
      return;
    }
    if (!token) {
      alert('You must be logged in.');
      return;
    }

    try {
      await axios.post(
        'https://lemonpeak-hellohelp-backend.onrender.com/api/auth/reset-password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Password changed successfully!');
      setOpenReset(false);
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to change password. Please try again.');
    }
  };

  return (
    <BasicLayout>
      <MDBox display="flex" justifyContent="center" alignItems="center">
        <img src={logo} alt="App Logo" style={{ height: '75px' }} />
      </MDBox>
      <Card sx={{ mt: 3 }}>
        <Typography variant="caption" className="header">
          Instant support. Exceptional results.
        </Typography>

        <MDBox pt={3} pb={3} px={4}>
          <MDBox component="form" role="form" onSubmit={handleSignIn}>
            {/* Email */}
            <MDBox mb={1.6}>
              <Typography variant="caption" className="label">
                Email
              </Typography>
              <MDInput
                type="email"
                fullWidth
                value={email}
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                sx={{ background: '#F3F4F6', mt: 1 }}
                inputProps={{ style: { fontSize: '18px' } }}
              />
            </MDBox>

            {/* Password */}
            <MDBox mb={1.6}>
              <Typography variant="caption" className="label">
                Password
              </Typography>
              <MDInput
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                sx={{ background: '#F3F4F6', mt: 1 }}
                inputProps={{ style: { fontSize: '18px' } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </MDBox>

            {error && (
              <MDBox mb={2}>
                <MDTypography variant="caption" color="error">
                  {error}
                </MDTypography>
              </MDBox>
            )}

            {/* Sign In Button */}
            <MDBox mt={2} mb={1}>
              <MDButton
                type="submit"
                fullWidth
                sx={{
                  background: '#1D4ED8',
                  color: '#FFFFFF',
                  fontWeight: 500,
                  fontSize: '16px',
                  textTransform: 'none',
                  '&:hover': {
                    background: '#1D4ED8', // keep same background
                    color: '#FFFFFF', // keep same text color
                    fontWeight: 500,
                    fontSize: '16px',
                    textTransform: 'none',
                  },
                }}
              >
                Sign in
              </MDButton>
            </MDBox>

            {/* Reset Password */}
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <MDTypography
                  variant="button"
                  sx={{
                    fontSize: '16px',
                    color: '#60A5FA',
                    fontWeight: 400,
                    cursor: 'pointer',
                  }}
                  onClick={() => setOpenReset(true)}
                >
                  Reset Password
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </Card>

      {/* Reset Password Dialog */}
      <Dialog open={openReset} onClose={() => setOpenReset(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          {/* Old Password */}
          <MDBox mb={2}>
            <Typography variant="caption" className="label">
              Old Password
            </Typography>
            <MDInput
              type={showPasswordTwo ? 'text' : 'password'}
              fullWidth
              value={oldPassword}
              placeholder="••••••••"
              onChange={(e) => setOldPassword(e.target.value)}
              sx={{ background: '#F3F4F6', mt: 1 }}
              inputProps={{ style: { fontSize: '18px' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPasswordTwo} edge="end">
                      {showPasswordTwo ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </MDBox>

          {/* New Password */}
          <MDBox mb={2}>
            <Typography variant="caption" className="label">
              New Password
            </Typography>
            <MDInput
              type={showPasswordThree ? 'text' : 'password'}
              fullWidth
              value={newPassword}
              placeholder="••••••••"
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ background: '#F3F4F6', mt: 1 }}
              inputProps={{ style: { fontSize: '18px' } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPasswordThree} edge="end">
                      {showPasswordThree ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={() => setOpenReset(false)} color="secondary">
            Cancel
          </MDButton>
          <MDButton
            onClick={handleResetPasswordSubmit}
            sx={{
              background: '#1D4ED8',
              color: '#fff',
              '&:hover': {
                background: '#1D4ED8', // keep same background
                color: '#FFFFFF', // keep same text color
              },
            }}
          >
            Submit
          </MDButton>
        </DialogActions>
      </Dialog>
    </BasicLayout>
  );
}

export default Basic;
