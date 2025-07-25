/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import logo from "assets/images/app_logo_horrizontal.png";

function Basic() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleResetPassword = async () => {
    // const email = prompt("Enter your email:");
    const oldPassword = prompt("Enter your old password:");
    const newPassword = prompt("Enter your new password:");
    const token = localStorage.getItem("token");
    if (oldPassword && newPassword && token) {
      try {
        await axios.post(
          "https://lemonpeak-hellohelp-backend.onrender.com/api/auth/reset-password",
          { oldPassword, newPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Password changed successfully!");
      } catch (error) {
        alert(error.response?.data?.error || "Failed to change password. Please try again.");
      }
    } else {
      alert("Please provide old and new password, and make sure you are logged in.");
    }
  };
  const handleForgotPassword = () => {
    const userEmail = prompt("Please enter your email to reset your password:");
    if (userEmail) {
      alert(`Password reset link has been sent to ${userEmail}`);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError(false);
    try {
      const response = await axios.post(
        "https://lemonpeak-hellohelp-backend.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <BasicLayout>
      <Card>
        <MDBox
          variant="gradient"
          sx={{
            background: "#281b62",
            color: "white",
            fontWeight: 600,
          }}
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <img src={logo} alt="App Logo" style={{ height: "50px", marginRight: "10px" }} />

          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Login
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSignIn}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
              />
            </MDBox>
            <MDBox mb={1}>
              <MDInput
                type={showPassword ? "text" : "password"}
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {/* Reset Password & Forget Password */}
            <MDBox mb={2}>
              <Grid container alignItems="center" wrap="nowrap">
                <Grid item xs={6}>
                  <MDTypography
                    variant="button"
                    fontWeight="medium"
                    sx={{
                      color: "#281b62",
                      cursor: "pointer",
                      textAlign: "left",
                      whiteSpace: "nowrap", // prevent text wrap
                    }}
                    onClick={handleResetPassword}
                  >
                    Reset Password
                  </MDTypography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <MDTypography
                    variant="button"
                    fontWeight="medium"
                    sx={{
                      color: "#281b62",
                      cursor: "pointer",
                      whiteSpace: "nowrap", // prevent text wrap
                    }}
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </MDTypography>
                </Grid>
              </Grid>
            </MDBox>

            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                type="submit"
                variant="gradient"
                fullWidth
                sx={{
                  background: "#281b62",
                  color: "#fff",
                  fontWeight: 600,
                  // "&:hover": {
                  //   background: "#001131",
                  // },
                }}
              >
                login
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Register
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
