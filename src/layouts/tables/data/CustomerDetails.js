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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import PropTypes from "prop-types";

export default function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({});

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

  const handleCustomerUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.patch(
        "https://lemonpeak-hellohelp-backend.onrender.com/api/admin/admin-update-user-profile",
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.message === "Profile updated successfully") {
        alert("✅ Customer profile updated!");
        const updatedCustomer = { ...customer, ...editData };
        setCustomer(updatedCustomer);
        setOpenEditDialog(false);
      } else {
        alert("⚠️ Update failed.");
      }
    } catch (err) {
      console.error("Customer update error:", err);
      alert("❌ Error updating customer.");
    }
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (!customer)
    return (
      <Typography align="center" mt={4}>
        Customer not found
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
            Back to Customers List
          </Button>
          <Button
            variant="contained"
            color="info"
            startIcon={<EditIcon />}
            onClick={() => {
              setEditData(customer);
              setOpenEditDialog(true);
            }}
            sx={{
              fontWeight: 600,
              color: "white",
              fontSize: { xs: "0.75rem", sm: "0.85rem" },
              px: { xs: 1.5, sm: 2 },
              py: { xs: 1, sm: 1.5 },
            }}
          >
            Edit Profile
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
            <Paper elevation={2} sx={{ p: 5, borderRadius: 3, background: "#fff", gap: 2 }}>
              <DetailRow
                className="customer-detail-row"
                label="First Name"
                value={customer.username}
              />
              <DetailRow
                className="customer-detail-row"
                label="Last Name"
                value={customer.user_lastname}
              />
              <DetailRow className="customer-detail-row" label="Email" value={customer.email} />
              <DetailRow
                className="customer-detail-row"
                label="Country Code"
                value={customer.country_code}
              />
              <DetailRow className="customer-detail-row" label="Phone" value={customer.phone} />
              <DetailRow
                className="customer-detail-row"
                label="Landline Number"
                value={customer.landline_number}
              />
              <DetailRow
                className="customer-detail-row"
                label="Address Line 1"
                value={customer.address_line1}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 5, borderRadius: 3, background: "#fff", gap: 2 }}>
              <DetailRow
                className="customer-detail-row"
                label="Address Line 2"
                value={customer.address_line2}
              />
              <DetailRow
                className="customer-detail-row"
                label="Zip Code"
                value={customer.zip_code}
              />
              <DetailRow className="customer-detail-row" label="State" value={customer.state} />
              <DetailRow className="customer-detail-row" label="Country" value={customer.country} />
              <DetailRow
                className="customer-detail-row"
                label="TV Provider Account Number"
                value={customer.tv_provider_account_number}
              />
              <DetailRow
                className="customer-detail-row"
                label="Internet Provider Account Number"
                value={customer.internet_provider_account_number}
              />
              <DetailRow
                className="customer-detail-row"
                label="Wireless Provider Account Number"
                value={customer.wireless_provider_account_number}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Customer Details</DialogTitle>
        <DialogContent dividers sx={{ maxHeight: { xs: "60vh", sm: "70vh" }, overflowY: "auto" }}>
          <Stack spacing={2} mt={1}>
            <TextField label="First Name" value={editData.username || ""} fullWidth disabled />
            <TextField
              label="Last Name"
              value={editData.user_lastname || ""}
              fullWidth
              onChange={(e) => setEditData({ ...editData, user_lastname: e.target.value })}
            />
            <TextField
              label="Country Code"
              value={editData.country_code || ""}
              fullWidth
              onChange={(e) => setEditData({ ...editData, country_code: e.target.value })}
            />
            <TextField label="Phone" value={editData.phone || ""} fullWidth disabled />
            <TextField
              label="Email"
              value={editData.email || ""}
              fullWidth
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            />
            <TextField
              label="Landline Number"
              value={editData.landline_number || ""}
              fullWidth
              onChange={(e) => setEditData({ ...editData, landline_number: e.target.value })}
            />
            <TextField
              label="Address Line 1"
              value={editData.address_line1 || ""}
              fullWidth
              onChange={(e) => setEditData({ ...editData, address_line1: e.target.value })}
            />
            <TextField
              label="Address Line 2"
              value={editData.address_line2 || ""}
              fullWidth
              onChange={(e) => setEditData({ ...editData, address_line2: e.target.value })}
            />
            <TextField
              label="Zip Code"
              value={editData.zip_code || ""}
              fullWidth
              onChange={(e) => setEditData({ ...editData, zip_code: e.target.value })}
            />
            <TextField
              label="State"
              value={editData.state || ""}
              fullWidth
              onChange={(e) => setEditData({ ...editData, state: e.target.value })}
            />
            <TextField
              label="Country"
              value={editData.country || ""}
              fullWidth
              onChange={(e) => setEditData({ ...editData, country: e.target.value })}
            />
            <TextField
              label="TV Provider Account Number"
              value={editData.tv_provider_account_number || ""}
              fullWidth
              onChange={(e) =>
                setEditData({ ...editData, tv_provider_account_number: e.target.value })
              }
            />
            <TextField
              label="Internet Provider Account Number"
              value={editData.internet_provider_account_number || ""}
              fullWidth
              onChange={(e) =>
                setEditData({ ...editData, internet_provider_account_number: e.target.value })
              }
            />
            <TextField
              label="Wireless Provider Account Number"
              value={editData.wireless_provider_account_number || ""}
              fullWidth
              onChange={(e) =>
                setEditData({ ...editData, wireless_provider_account_number: e.target.value })
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            sx={{ color: "#fff" }}
            onClick={() => setOpenEditDialog(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" sx={{ color: "#fff" }} onClick={handleCustomerUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
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
