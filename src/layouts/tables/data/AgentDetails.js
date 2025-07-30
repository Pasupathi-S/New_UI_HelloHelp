import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  CircularProgress,
  Avatar,
  Paper,
  Grid,
  Card,
  Button,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import PropTypes from "prop-types";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import HomeIcon from "@mui/icons-material/Home";
import PinDropIcon from "@mui/icons-material/PinDrop";
import MapIcon from "@mui/icons-material/Map";
import TvIcon from "@mui/icons-material/Tv";
import RouterIcon from "@mui/icons-material/Router";
import NetworkCellIcon from "@mui/icons-material/NetworkCell";

export default function AgentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAgent = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      setAgent(null);
      return;
    }
    axios
      .get("https://lemonpeak-hellohelp-backend.onrender.com/api/agent/agents", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        const found = data.find((a) => String(a.id) === String(id));
        setAgent(found || null);
        setLoading(false);
      })
      .catch(() => {
        setAgent(null);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAgent();
  }, [id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (!agent)
    return (
      <Typography align="center" mt={4}>
        Agent not found
      </Typography>
    );

  return (
    <Card
      sx={{
        width: { xs: "95%", sm: "90%", md: "90%", lg: "75%" },
        mx: { xs: "auto", sm: "auto", md: "auto", lg: 36, xl: 38 },
        mt: 4,
        mb: 4,
        p: 2,
        borderRadius: 3,
        background: "#f5f7fa",
      }}
    >
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="info"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              fontWeight: 600,
              color: "white",
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
              px: { xs: 1.5, sm: 2 },
              py: { xs: 1, sm: 1.5 },
            }}
          >
            Back to Agents List
          </Button>
        </Stack>

        <Box
          sx={{
            width: "100%",
            height: 100,
            background: "#281b62",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            position: "relative",
            borderRadius: 2,
          }}
        >
          <Avatar
            sx={{
              width: { xs: 100, sm: 120, md: 70 },
              height: { xs: 100, sm: 120, md: 70 },
              border: "3px solid #fff",
              background: "#281b62",
              position: "absolute",
              bottom: -40,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: { xs: 40, sm: 50, md: 45 },
              fontWeight: { xs: 400, sm: 500, md: 800 },
              boxShadow: 3,
            }}
          >
            {agent.username?.charAt(0).toUpperCase() || "-"}
          </Avatar>
        </Box>

        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              mt: 1,
              color: "#222",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2rem" },
            }}
          >
            {agent.username?.charAt(0).toUpperCase() + agent.username?.slice(1) || "-"}
          </Typography>
          <Box
            sx={{
              my: 1,
              px: 2,
              py: 0.5,
              background: "#e3f0fc",
              borderRadius: "20px",
              display: "inline-block",
            }}
          >
            <Typography variant="body1" sx={{ color: "#1976d2", fontWeight: 600 }}>
              {agent.role || "Agent"}
            </Typography>
          </Box>
        </Box>

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom align="center">
          Profile Information
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={12}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                background: "#fff",
                height: "100%",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom align="start">
                Personal Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={{ height: "100%" }}>
                  <Card
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <DetailRow
                      icon={PersonIcon}
                      className="agent-detail-row"
                      label="First Name"
                      value={agent.username}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4} sx={{ height: "100%" }}>
                  <Card
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <DetailRow
                      icon={PersonIcon}
                      className="agent-detail-row"
                      label="Last Name"
                      value={agent.user_lastname}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4} sx={{ height: "100%" }}>
                  <Card
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <DetailRow
                      icon={EmailIcon}
                      className="agent-detail-row"
                      label="Email"
                      value={agent.email}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4} sx={{ height: "100%" }}>
                  <Card
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <DetailRow
                      icon={PublicIcon}
                      className="agent-detail-row"
                      label="Country Code"
                      value={agent.country_code}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4} sx={{ height: "100%" }}>
                  <Card
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <DetailRow
                      icon={PhoneIcon}
                      className="agent-detail-row"
                      label="Mobile"
                      value={agent.phone}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4} sx={{ height: "100%" }}>
                  <Card
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <DetailRow
                      icon={PhoneInTalkIcon}
                      className="agent-detail-row"
                      label="Landline Number"
                      value={agent.landline_number}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={4} sx={{ height: "100%" }}>
                  <Card
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <DetailRow
                      icon={LocationOnIcon}
                      className="agent-detail-row"
                      label="Address Line1"
                      value={agent.address_line1}
                    />
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                background: "#fff",
                height: "100%",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom align="start">
                Address & Provider info
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={{ height: "100%" }}>
                  <Card
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <DetailRow
                      icon={HomeIcon}
                      className="agent-detail-row"
                      label="Address Line2"
                      value={agent.address_line2}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={{ height: "100%" }}>
                  <Card
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <DetailRow
                      icon={PinDropIcon}
                      className="agent-detail-row"
                      label="Zip Code"
                      value={agent.zip_code}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={{ height: "100%" }}>
                  <Card
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <DetailRow
                      icon={MapIcon}
                      className="agent-detail-row"
                      label="State"
                      value={agent.state}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={{ height: "100%" }}>
                  <Card
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <DetailRow
                      icon={PublicIcon}
                      className="agent-detail-row"
                      label="Country"
                      value={agent.country}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={{ height: "100%" }}>
                  <Card
                    elevation={3}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <DetailRow
                      icon={TvIcon}
                      className="agent-detail-row"
                      label="TV Provider Account Number"
                      value={agent.tv_provider_account_number}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={{ height: "100%" }}>
                  <Card
                    elevation={3}
                    sx={{
                      p: 2,
                      // paddingTop: "15px",
                      borderRadius: 2,
                      boxShadow: 3,
                      // height: "85px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <DetailRow
                      icon={RouterIcon}
                      className="agent-detail-row"
                      label="Internet Provider Account Number"
                      value={agent.internet_provider_account_number}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4} sx={{ height: "100%" }}>
                  <Card
                    elevation={3}
                    sx={{
                      p: 2,
                      // paddingTop: "15px",
                      borderRadius: 2,
                      boxShadow: 3,
                      // height: "85px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <DetailRow
                      icon={NetworkCellIcon}
                      className="agent-detail-row"
                      label="Wireless Provider Account Number"
                      value={agent.wireless_provider_account_number}
                    />
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

const DetailRow = ({ label, value, icon: Icon, className }) => (
  <Grid container alignItems="center" className={className}>
    {/* Icon Column */}
    <Grid item xs={3} sm={2} md={2} lg={2}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: "#e3f2fd", // light blue background
          borderRadius: "50%",
          width: 40,
          height: 40,
        }}
      >
        <Icon sx={{ color: "#1976d2", fontSize: 24 }} />
      </Box>
    </Grid>

    {/* Text Column */}
    <Grid item xs={9} sm={10} md={10} lg={10} sx={{ paddingLeft: "5px" }}>
      <Typography
        variant="body2"
        sx={{ color: "#281B62", fontWeight: 500, fontSize: "0.9rem" }} // muted gray label
      >
        {label}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600, color: "#000", fontSize: "1rem" }} // value with bold black
      >
        {value || "-"}
      </Typography>
    </Grid>
  </Grid>
);

DetailRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  icon: PropTypes.elementType,
};
