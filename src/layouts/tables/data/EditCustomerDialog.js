// src/components/EditCustomerDialog.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";

const EditCustomerDialog = ({ open, customer, onClose, refreshData, onSuccessUpdate }) => {
  const [formData, setFormData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (customer) {
      setFormData({ ...customer });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        "https://lemonpeak-hellohelp-backend.onrender.com/api/admin/admin-update-user-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.message === "Profile updated successfully") {
        refreshData?.(); // Update list
        onSuccessUpdate?.(formData); // Update detail
        onClose();
      } else {
        alert("Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Error updating customer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Customer Details</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={6}>
            <TextField
              label="First Name"
              name="username"
              value={formData.username || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="user_lastname"
              value={formData.user_lastname || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Country Code"
              name="country_code"
              value={formData.country_code || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Address Line 1"
              name="address_line1"
              value={formData.address_line1 || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address Line 2"
              name="address_line2"
              value={formData.address_line2 || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Zip Code"
              name="zip_code"
              value={formData.zip_code || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="State"
              name="state"
              value={formData.state || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Country"
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="TV Provider Account"
              name="tv_provider_account_number"
              value={formData.tv_provider_account_number || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Internet Provider Account"
              name="internet_provider_account_number"
              value={formData.internet_provider_account_number || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Wireless Provider Account"
              name="wireless_provider_account_number"
              value={formData.wireless_provider_account_number || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <MDButton onClick={handleSubmit} color="info" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </MDButton>
      </DialogActions>
    </Dialog>
  );
};

EditCustomerDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  customer: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  refreshData: PropTypes.func,
  onSuccessUpdate: PropTypes.func,
};

export default EditCustomerDialog;
