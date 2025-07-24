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

export default function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      setCustomer(null);
      return;
    }

    axios
      .get("https://lemonpeak-hellohelp-backend.onrender.com/api/customer/customers", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        const found = data.find((c) => String(c.id) === String(id));
        setCustomer(found || null);
        setLoading(false);
      })
      .catch(() => {
        setCustomer(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!customer) {
    return (
      <Typography align="center" mt={4}>
        Customer not found
      </Typography>
    );
  }

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
        <Stack direction="row" justifyContent="flex-start" alignItems="center" sx={{ mb: 2 }}>
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
            Back to Customers List
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
            {customer.username?.charAt(0).toUpperCase() + customer.username?.slice(1)}
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
              {customer.role || "Customer"}
            </Typography>
          </Box>
        </Box>

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom align="center">
          Profile Information
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 5, borderRadius: 3, background: "#fff" }}>
              <DetailRow label="First Name" value={customer.username} />
              <DetailRow label="Last Name" value={customer.user_lastname} />
              <DetailRow label="Email" value={customer.email} />
              <DetailRow label="Country Code" value={customer.country_code} />
              <DetailRow label="Phone" value={customer.phone} />
              <DetailRow label="Landline Number" value={customer.landline_number} />
              <DetailRow label="Address Line 1" value={customer.address_line1} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 5, borderRadius: 3, background: "#fff" }}>
              <DetailRow label="Address Line 2" value={customer.address_line2} />
              <DetailRow label="Zip Code" value={customer.zip_code} />
              <DetailRow label="State" value={customer.state} />
              <DetailRow label="Country" value={customer.country} />
              <DetailRow
                label="TV Provider Account Number"
                value={customer.tv_provider_account_number}
              />
              <DetailRow
                label="Internet Provider Account Number"
                value={customer.internet_provider_account_number}
              />
              <DetailRow
                label="Wireless Provider Account Number"
                value={customer.wireless_provider_account_number}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

// Reusable detail display
const DetailRow = ({ label, value }) => (
  <Box display="flex" gap={1} alignItems="center" mb={1}>
    <Typography color="text.secondary" sx={{ fontSize: "0.95rem", minWidth: 150 }}>
      {label}:
    </Typography>
    <Typography sx={{ fontSize: "1rem", fontWeight: 500 }}>{value || "-"}</Typography>
  </Box>
);

DetailRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
