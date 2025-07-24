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
        width: { xs: "95%", sm: "90%", md: "90%", lg: "70%" },
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
              width: { xs: 100, sm: 120, md: 130 },
              height: { xs: 100, sm: 120, md: 130 },
              border: "5px solid #fff",
              background: "#281b62",
              position: "absolute",
              bottom: -65,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: { xs: 40, sm: 50, md: 60 },
              boxShadow: 3,
            }}
          />
        </Box>

        <Box
          sx={{
            mt: 10,
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
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
            }}
          >
            {agent.username?.charAt(0).toUpperCase() + agent.username?.slice(1)}
          </Typography>
          <Box
            sx={{
              mt: 1,
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
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 5,
                borderRadius: 3,
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
              }}
            >
              <DetailRow className="agent-detail-row" label="First Name" value={agent.username} />
              <DetailRow
                className="agent-detail-row"
                label="Last Name"
                value={agent.user_lastname}
              />
              <DetailRow className="agent-detail-row" label="Email" value={agent.email} />
              <DetailRow
                className="agent-detail-row"
                label="Country Code"
                value={agent.country_code}
              />
              <DetailRow className="agent-detail-row" label="Mobile" value={agent.phone} />
              <DetailRow
                className="agent-detail-row"
                label="Landline Number"
                value={agent.landline_number}
              />
              <DetailRow
                className="agent-detail-row"
                label="Address Line1"
                value={agent.address_line1}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 5,
                borderRadius: 3,
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
              }}
            >
              <DetailRow
                className="agent-detail-row"
                label="Address Line2"
                value={agent.address_line2}
              />
              <DetailRow className="agent-detail-row" label="Zip Code" value={agent.zip_code} />
              <DetailRow className="agent-detail-row" label="State" value={agent.state} />
              <DetailRow className="agent-detail-row" label="Country" value={agent.country} />
              <DetailRow
                className="agent-detail-row"
                label="TV Provider Account Number"
                value={agent.tv_provider_account_number}
              />
              <DetailRow
                className="agent-detail-row"
                label="Internet Provider Account Number"
                value={agent.internet_provider_account_number}
              />
              <DetailRow
                className="agent-detail-row"
                label="Wireless Provider Account Number"
                value={agent.wireless_provider_account_number}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

const DetailRow = ({ label, value, className }) => (
  <Box className={className} display="flex" gap={1} alignItems="center" mb={1}>
    <Typography color="text.secondary" sx={{ fontSize: "0.95rem", minWidth: 150 }}>
      {label}:
    </Typography>
    <Typography sx={{ fontSize: "1rem", fontWeight: 500 }}>{value || "-"}</Typography>
  </Box>
);

DetailRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
