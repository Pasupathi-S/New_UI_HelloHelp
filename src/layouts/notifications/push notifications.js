<<<<<<< HEAD
import { useState, useEffect } from 'react';
=======
import { useState, useEffect } from "react";
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
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
<<<<<<< HEAD
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import axios from 'axios';
import { Checkbox } from '@mui/material';
import CustomerList from 'layouts/tables/data/CustomerList';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useRef } from 'react'; // already imported likely
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

function Notifications() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [description, setDescription] = useState('');
=======
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
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
  const [userIds, setUserIds] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sending, setSending] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
<<<<<<< HEAD
    severity: 'success',
    message: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(
          'https://lemonpeak-hellohelp-backend.onrender.com/api/customer/customers',
=======
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
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
<<<<<<< HEAD
          }
        );
        setCustomers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
=======
          },
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
      }
    };

    fetchUsers();
  }, []);

  const handleSend = async () => {
    if (!title || !message || !campaignId || userIds.length === 0) {
      setSnackbar({
        open: true,
<<<<<<< HEAD
        severity: 'error',
        message: 'Please fill in all required fields.',
=======
        severity: "error",
        message: "Please fill in all required fields.",
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
      });
      return;
    }

    try {
      setSending(true);
<<<<<<< HEAD
      const token = localStorage.getItem('token');
=======
      const token = localStorage.getItem("token");
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e

      const payload = {
        user_ids: userIds, // send array
        title,
        body: message,
<<<<<<< HEAD
        data: { offer_code: ' ' },
=======
        data: { offer_code: " " },
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
        campaign_id: campaignId,
      };

      await axios.post(
<<<<<<< HEAD
        'https://lemonpeak-hellohelp-backend.onrender.com/api/admin/push-notification',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
=======
        "https://lemonpeak-hellohelp-backend.onrender.com/api/admin/push-notification",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
      );

      setSnackbar({
        open: true,
<<<<<<< HEAD
        severity: 'success',
        message: 'Notifications sent!',
      });
      setTitle('');
      setMessage('');
      setUserIds([]);
      setCampaignId('');
      setDescription('');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setSnackbar({
        open: true,
        severity: 'error',
        message: err.response?.data?.error || 'Something went wrong.',
=======
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
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
      });
    } finally {
      setSending(false);
    }
  };

<<<<<<< HEAD
  const filteredCustomers = customers.filter((customer) => {
    const username = (customer.username ?? '').toLowerCase();
    const phone = (customer.phone ?? '').toLowerCase();
    const search = searchTerm.toLowerCase();

    return username.includes(search) || phone.includes(search);
  });
=======
  const filteredCustomers = customers.filter(customer => {
  const username = (customer.username ?? "").toLowerCase();
  const phone = (customer.phone ?? "").toLowerCase();
  const search = searchTerm.toLowerCase();

  return username.includes(search) || phone.includes(search);
});
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e

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
<<<<<<< HEAD
                    background: '#1D4ED8', // gradient using your color
                    color: 'white', // or any readable color
                    fontWeight: 600,
                    boxShadow: 'none', // custom shadow to match color
=======
                    background: "#1D4ED8", // gradient using your color
                    color: "white", // or any readable color
                    fontWeight: 600,
                    boxShadow: "none", // custom shadow to match color
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                  }}
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    <NotificationsActiveIcon
<<<<<<< HEAD
                      sx={{ verticalAlign: 'middle', mr: 1 }}
=======
                      sx={{ verticalAlign: "middle", mr: 1 }}
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                      fontSize="medium"
                    />
                    Push Notification
                  </MDTypography>
                </MDBox>
                <MDBox px={3} pb={3}>
                  <Stack spacing={3}>
<<<<<<< HEAD
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <FormControl fullWidth sx={{ flex: 1 }}>
                        <InputLabel id="user-select-label" sx={{ top: 1, backgroundColor: '#fff' }}>
=======
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                      <FormControl fullWidth sx={{ flex: 1 }}>
                        <InputLabel id="user-select-label" sx={{ top: 1, backgroundColor: "#fff" }}>
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                          Select Users
                        </InputLabel>
                        <Select
                          labelId="user-select-label"
                          multiple
                          open={dropdownOpen}
                          onOpen={() => setDropdownOpen(true)}
                          onClose={() => {
                            setDropdownOpen(false);
<<<<<<< HEAD
                            setSearchTerm(''); // optional: clear search on close
                          }}
                          value={userIds}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.includes('all')) {
                              if (userIds.length === customers.length) {
                                setUserIds([]);
                              } else {
                                setUserIds(customers.map((c) => c.user_id));
=======
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
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                              }
                            } else {
                              setUserIds(value);
                            }
                          }}
<<<<<<< HEAD
                          renderValue={(selected) =>
                            customers
                              .filter((c) => selected.includes(c.user_id))
                              .map(
                                (c) =>
                                  `${c.user_id} - ${
                                    c.username?.charAt(0).toUpperCase() + c.username?.slice(1)
                                  } (${c.phone})`
                              )
                              .join(', ')
                          }
=======
                          renderValue={selected =>
  customers
    .filter(c => selected.includes(c.user_id))
    .map(c =>
      `${c.user_id} - ${c.username?.charAt(0).toUpperCase() + c.username?.slice(1)} (${c.phone})`
    )
    .join(", ")
}

>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                          MenuProps={{
                            disableAutoFocusItem: true, // ✅ Prevent auto focus stealing
                            PaperProps: {
                              sx: {
                                maxHeight: 350,
                                padding: 1,
<<<<<<< HEAD
                                '& .MuiMenu-list': {
                                  display: 'grid',
                                  gridTemplateColumns: '1fr 1fr',
=======
                                "& .MuiMenu-list": {
                                  display: "grid",
                                  gridTemplateColumns: "1fr 1fr",
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                                  gap: 0.5,
                                },
                              },
                            },
                          }}
                          sx={{
                            borderRadius: 2,
<<<<<<< HEAD
                            backgroundColor: isDarkMode ? '#2e2e3e' : '#f9f9f9',
                            height: 60,
                            display: 'flex',
                            alignItems: 'center',
=======
                            backgroundColor: isDarkMode ? "#2e2e3e" : "#f9f9f9",
                            height: 60,
                            display: "flex",
                            alignItems: "center",
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                          }}
                        >
                          <MenuItem
                            sx={{
<<<<<<< HEAD
                              gridColumn: '1 / -1',
                              py: 1,
                              backgroundColor: '#ffffff !important',
=======
                              gridColumn: "1 / -1",
                              py: 1,
                              backgroundColor: "#ffffff !important",
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                            }}
                          >
                            <TextField
                              placeholder="Search user..."
                              variant="standard"
                              fullWidth
                              value={searchTerm}
<<<<<<< HEAD
                              onChange={(e) => setSearchTerm(e.target.value)}
                              onKeyDown={(e) => e.stopPropagation()} // ✅ stop Select from hijacking typing
=======
                              onChange={e => setSearchTerm(e.target.value)}
                              onKeyDown={e => e.stopPropagation()} // ✅ stop Select from hijacking typing
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
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
<<<<<<< HEAD
                                      onClick={() => setSearchTerm('')}
=======
                                      onClick={() => setSearchTerm("")}
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
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
<<<<<<< HEAD
                                  backgroundColor: '#ffffff !important',
                                  borderRadius: 1,
                                  border: dropdownOpen
                                    ? '1px solid #1976d2'
                                    : '1px solid transparent',
                                  transition: 'border 0.2s, box-shadow 0.2s',
=======
                                  backgroundColor: "#ffffff !important",
                                  borderRadius: 1,
                                  border: dropdownOpen
                                    ? "1px solid #1976d2"
                                    : "1px solid transparent",
                                  transition: "border 0.2s, box-shadow 0.2s",
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                                },
                              }}
                            />
                          </MenuItem>
<<<<<<< HEAD
                          {searchTerm.trim() === '' && (
=======
                          {searchTerm.trim() === "" && (
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
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
<<<<<<< HEAD
                            filteredCustomers.map((c) => (
                              <MenuItem key={c.user_id} value={c.user_id}>
                                <Checkbox checked={userIds.includes(c.user_id)} />
                                {c.user_id} -{' '}
                                {c.username?.charAt(0).toUpperCase() + c.username?.slice(1)} (
                                {c.phone})
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem
                              sx={{
                                gridColumn: '1 / -1',
                                color: 'red !important',
                                backgroundColor: '#ffffff !important',
                              }}
                            >
                              User not found
                            </MenuItem>
                          )}
=======
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

>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                        </Select>
                      </FormControl>

                      <TextField
                        label="Campaign Id"
                        value={campaignId}
<<<<<<< HEAD
                        onChange={(e) => setCampaignId(e.target.value.toString())}
=======
                        onChange={e => setCampaignId(e.target.value.toString())}
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                        fullWidth
                        sx={{ flex: 1 }}
                        InputProps={{
                          sx: {
                            borderRadius: 2,
<<<<<<< HEAD
                            backgroundColor: isDarkMode ? '#2e2e3e' : '#f9f9f9',
=======
                            backgroundColor: isDarkMode ? "#2e2e3e" : "#f9f9f9",
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                            height: 60,
                          },
                        }}
                      />
                    </Box>

                    <TextField
                      label="Notification Title"
                      value={title}
<<<<<<< HEAD
                      onChange={(e) => setTitle(e.target.value)}
=======
                      onChange={e => setTitle(e.target.value)}
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                      fullWidth
                      InputProps={{
                        sx: {
                          borderRadius: 2,
<<<<<<< HEAD
                          backgroundColor: isDarkMode ? '#2e2e3e' : '#f9f9f9',
=======
                          backgroundColor: isDarkMode ? "#2e2e3e" : "#f9f9f9",
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                          sm: 6,
                        },
                      }}
                    />

                    <TextField
                      label="Notification Message"
                      value={message}
<<<<<<< HEAD
                      onChange={(e) => setMessage(e.target.value)}
=======
                      onChange={e => setMessage(e.target.value)}
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                      fullWidth
                      multiline
                      rows={4}
                      InputProps={{
                        sx: {
                          borderRadius: 2,
<<<<<<< HEAD
                          backgroundColor: isDarkMode ? '#2e2e3e' : '#f9f9f9',
=======
                          backgroundColor: isDarkMode ? "#2e2e3e" : "#f9f9f9",
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                        },
                      }}
                    />

                    <TextField
                      label="Description (Optional)"
                      value={description}
<<<<<<< HEAD
                      onChange={(e) => setDescription(e.target.value)}
=======
                      onChange={e => setDescription(e.target.value)}
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                      fullWidth
                      multiline
                      rows={4}
                      InputProps={{
                        sx: {
                          borderRadius: 2,
<<<<<<< HEAD
                          backgroundColor: isDarkMode ? '#2e2e3e' : '#f9f9f9',
=======
                          backgroundColor: isDarkMode ? "#2e2e3e" : "#f9f9f9",
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                        },
                      }}
                    />

                    <Button
                      variant="contained"
                      onClick={handleSend}
                      disabled={sending}
                      sx={{
                        mt: 2,
<<<<<<< HEAD
                        background: '#1D4ED8',
                        borderRadius: '8px',
                        color: '#fff',
                        fontWeight: 'bold',
                      }}
                    >
                      {sending ? 'Sending...' : 'Send Notification'}
=======
                        background: "#1D4ED8",
                        borderRadius: "8px",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {sending ? "Sending..." : "Send Notification"}
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                    </Button>
                  </Stack>
                </MDBox>
                <Snackbar
                  open={snackbar.open}
                  autoHideDuration={4000}
                  onClose={() => setSnackbar({ ...snackbar, open: false })}
<<<<<<< HEAD
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
=======
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
                >
                  <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
<<<<<<< HEAD
                    sx={{ width: '100%' }}
=======
                    sx={{ width: "100%" }}
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
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
<<<<<<< HEAD
=======

>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
