import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Snackbar,
  Alert,
  Card,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import axios from "axios";
import { Checkbox } from "@mui/material";
import CustomerList from "layouts/tables/data/CustomerList";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useRef } from "react"; // already imported likely
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

function Notifications() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [description, setDescription] = useState("");
  const [userIds, setUserIds] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sending, setSending] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://lemonpeak-hellohelp-backend.onrender.com/api/customer/customers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSend = async () => {
    if (!title || !message || !campaignId || userIds.length === 0) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    try {
      setSending(true);
      const token = localStorage.getItem("token");

      const payload = {
        user_ids: userIds, // send array
        title,
        body: message,
        data: { offer_code: " " },
        campaign_id: campaignId,
      };

      await axios.post(
        "https://lemonpeak-hellohelp-backend.onrender.com/api/admin/push-notification",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSnackbar({
        open: true,
        severity: "success",
        message: "Notifications sent!",
      });
      setTitle("");
      setMessage("");
      setUserIds([]);
      setCampaignId("");
      setDescription("");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setSnackbar({
        open: true,
        severity: "error",
        message: err.response?.data?.error || "Something went wrong.",
      });
    } finally {
      setSending(false);
    }
  };

  const filteredCustomers = customers.filter(customer => {
  const username = (customer.username ?? "").toLowerCase();
  const phone = (customer.phone ?? "").toLowerCase();
  const search = searchTerm.toLowerCase();

  return username.includes(search) || phone.includes(search);
});

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={5}>
        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12}>
            <MDBox width="100%">
              <Card>
                <MDBox
                  mx={2}
                  mt={-2}
                  mb={3}
                  py={3}
                  px={2}
                  variant="gradient"
                  sx={{
                    background: "#1D4ED8", // gradient using your color
                    color: "white", // or any readable color
                    fontWeight: 600,
                    boxShadow: "none", // custom shadow to match color
                  }}
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    <NotificationsActiveIcon
                      sx={{ verticalAlign: "middle", mr: 1 }}
                      fontSize="medium"
                    />
                    Push Notification
                  </MDTypography>
                </MDBox>
                <MDBox px={3} pb={3}>
                  <Stack spacing={3}>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                      <FormControl fullWidth sx={{ flex: 1 }}>
                        <InputLabel id="user-select-label" sx={{ top: 1, backgroundColor: "#fff" }}>
                          Select Users
                        </InputLabel>
                        <Select
                          labelId="user-select-label"
                          multiple
                          open={dropdownOpen}
                          onOpen={() => setDropdownOpen(true)}
                          onClose={() => {
                            setDropdownOpen(false);
                            setSearchTerm(""); // optional: clear search on close
                          }}
                          value={userIds}
                          onChange={e => {
                            const value = e.target.value;
                            if (value.includes("all")) {
                              if (userIds.length === customers.length) {
                                setUserIds([]);
                              } else {
                                setUserIds(customers.map(c => c.user_id));
                              }
                            } else {
                              setUserIds(value);
                            }
                          }}
                          renderValue={selected =>
  customers
    .filter(c => selected.includes(c.user_id))
    .map(c =>
      `${c.user_id} - ${c.username?.charAt(0).toUpperCase() + c.username?.slice(1)} (${c.phone})`
    )
    .join(", ")
}

                          MenuProps={{
                            disableAutoFocusItem: true, // ✅ Prevent auto focus stealing
                            PaperProps: {
                              sx: {
                                maxHeight: 350,
                                padding: 1,
                                "& .MuiMenu-list": {
                                  display: "grid",
                                  gridTemplateColumns: "1fr 1fr",
                                  gap: 0.5,
                                },
                              },
                            },
                          }}
                          sx={{
                            borderRadius: 2,
                            backgroundColor: isDarkMode ? "#2e2e3e" : "#f9f9f9",
                            height: 60,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <MenuItem
                            sx={{
                              gridColumn: "1 / -1",
                              py: 1,
                              backgroundColor: "#ffffff !important",
                            }}
                          >
                            <TextField
                              placeholder="Search user..."
                              variant="standard"
                              fullWidth
                              value={searchTerm}
                              onChange={e => setSearchTerm(e.target.value)}
                              onKeyDown={e => e.stopPropagation()} // ✅ stop Select from hijacking typing
                              InputProps={{
                                disableUnderline: true,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                  </InputAdornment>
                                ),
                                endAdornment: searchTerm && (
                                  <InputAdornment position="end">
                                    <IconButton
                                      size="small"
                                      onClick={() => setSearchTerm("")}
                                      sx={{ padding: 0.5 }}
                                    >
                                      <CloseIcon fontSize="small" />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                                sx: {
                                  fontSize: 14,
                                  p: 1,
                                  my: 1,
                                  backgroundColor: "#ffffff !important",
                                  borderRadius: 1,
                                  border: dropdownOpen
                                    ? "1px solid #1976d2"
                                    : "1px solid transparent",
                                  transition: "border 0.2s, box-shadow 0.2s",
                                },
                              }}
                            />
                          </MenuItem>
                          {searchTerm.trim() === "" && (
                            <MenuItem value="all">
                              <Checkbox
                                checked={
                                  userIds.length === customers.length && customers.length > 0
                                }
                                indeterminate={
                                  userIds.length > 0 && userIds.length < customers.length
                                }
                              />
                              Select All
                            </MenuItem>
                          )}
                          {filteredCustomers.length > 0 ? (
  filteredCustomers.map(c => (
    <MenuItem key={c.user_id} value={c.user_id}>
      <Checkbox checked={userIds.includes(c.user_id)} />
      {c.user_id} - {c.username?.charAt(0).toUpperCase() + c.username?.slice(1)} ({c.phone})
    </MenuItem>
  ))
) : (
  <MenuItem
    sx={{
      gridColumn: "1 / -1",
      color: "red !important",
      backgroundColor: "#ffffff !important",
    }}
  >
    User not found
  </MenuItem>
)}

                        </Select>
                      </FormControl>

                      <TextField
                        label="Campaign Id"
                        value={campaignId}
                        onChange={e => setCampaignId(e.target.value.toString())}
                        fullWidth
                        sx={{ flex: 1 }}
                        InputProps={{
                          sx: {
                            borderRadius: 2,
                            backgroundColor: isDarkMode ? "#2e2e3e" : "#f9f9f9",
                            height: 60,
                          },
                        }}
                      />
                    </Box>

                    <TextField
                      label="Notification Title"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      fullWidth
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                          backgroundColor: isDarkMode ? "#2e2e3e" : "#f9f9f9",
                          sm: 6,
                        },
                      }}
                    />

                    <TextField
                      label="Notification Message"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      fullWidth
                      multiline
                      rows={4}
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                          backgroundColor: isDarkMode ? "#2e2e3e" : "#f9f9f9",
                        },
                      }}
                    />

                    <TextField
                      label="Description (Optional)"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      fullWidth
                      multiline
                      rows={4}
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                          backgroundColor: isDarkMode ? "#2e2e3e" : "#f9f9f9",
                        },
                      }}
                    />

                    <Button
                      variant="contained"
                      onClick={handleSend}
                      disabled={sending}
                      sx={{
                        mt: 2,
                        background: "#1D4ED8",
                        borderRadius: "8px",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {sending ? "Sending..." : "Send Notification"}
                    </Button>
                  </Stack>
                </MDBox>
                <Snackbar
                  open={snackbar.open}
                  autoHideDuration={4000}
                  onClose={() => setSnackbar({ ...snackbar, open: false })}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                  >
                    {snackbar.message}
                  </Alert>
                </Snackbar>
              </Card>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;

