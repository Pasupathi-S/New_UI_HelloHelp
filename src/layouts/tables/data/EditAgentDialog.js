import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import axios from "axios";
import MDButton from "components/MDButton";
import PropTypes from "prop-types";

const EditAgentDialog = ({ open, agent, onClose, onUpdate }) => {
  const [formData, setFormData] = React.useState(agent || {});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (agent) {
      setFormData(agent);
    }
  }, [agent]);

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
        onUpdate(formData);
        onClose();
      }
    } catch (error) {
      console.error("Error updating agent:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Agent</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} mt={2}>
          <TextField
            label="First Name"
            name="username"
            value={formData.username || ""}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            name="user_lastname"
            value={formData.user_lastname || ""}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email || ""}
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone || ""}
            fullWidth
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained" sx={{ color: "#fff" }}>
          Cancel
        </Button>

        <MDButton onClick={handleSubmit} color="info" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </MDButton>
      </DialogActions>
    </Dialog>
  );
};

EditAgentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  agent: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    user_lastname: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    country_code: PropTypes.string,
    landline_number: PropTypes.string,
    address_line1: PropTypes.string,
    address_line2: PropTypes.string,
    zip_code: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    tv_provider_account_number: PropTypes.string,
    internet_provider_account_number: PropTypes.string,
    wireless_provider_account_number: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditAgentDialog;
