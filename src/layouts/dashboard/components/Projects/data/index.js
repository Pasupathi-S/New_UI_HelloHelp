import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, Chip, CardHeader } from "@mui/material";
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import { useTheme, useMediaQuery } from "@mui/material";
import { GlobalStyles } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box } from "@mui/material";
import { Tooltip, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

// Format time to readable format
function formatTime(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Calculate call duration
function getDuration(start, end) {
  if (!start || !end) return "0m 0s";
  const diff = Math.max(0, new Date(end) - new Date(start));
  const mins = Math.floor(diff / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return `${mins}m ${secs}s`;
}

export default function RecentCallsTable() {
  const [callLogs, setCallLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://lemonpeak-hellohelp-backend.onrender.com/api/call/call-logs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const sortedData = res.data.sort((a, b) => new Date(b.started_at) - new Date(a.started_at));
        setCallLogs(sortedData);
        setLoading(false);
      })
      .catch(() => {
        setCallLogs([]);
        setLoading(false);
      });
  }, []);

  const rows = callLogs.map((call) => ({
    id: call.id,
    caller_name: call.caller_name || "-",
    receiver_name: call.receiver_name
      ? `${call.receiver_name.charAt(0).toUpperCase()}${call.receiver_name.slice(1)}`
      : "-",

    call_type: (
      <Chip
        label={call.call_type.charAt(0).toUpperCase() + call.call_type.slice(1)}
        sx={{
          backgroundColor: call.call_type === "audio" ? "#e3f0fc" : "#f3e8fd",
          color: call.call_type === "audio" ? "#1976d2" : "#9c27b0",
          fontWeight: 500,
          borderRadius: "8px",
          px: 1,
          py: 0,
          height: "24px",
        }}
      />
    ),
    status: (
      <Chip
        label={call.status.charAt(0).toUpperCase() + call.status.slice(1)}
        sx={{
          backgroundColor:
            call.status === "accepted"
              ? "#e3fde8"
              : call.status === "initiated"
              ? "#fff5d3"
              : "#fde3e3",
          color:
            call.status === "accepted"
              ? "#388e3c"
              : call.status === "initiated"
              ? "#fbc02d"
              : "#d32f2f",
          fontWeight: 500,
          borderRadius: "8px",
          px: 1,
          py: 0,
          height: "24px",
        }}
      />
    ),
    time: formatTime(call.started_at),
    duration: getDuration(call.started_at, call.ended_at),
    action: (
      <MDBox display="flex" gap={1}>
        <Tooltip title="View" arrow>
          <IconButton
            component={Link}
            to={`/CallDetails/${call.id}`}
            sx={{ color: "#181313", "&:hover": { color: "#181313" } }}
            size="small"
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </MDBox>
    ),
  }));

  return (
    <>
      <GlobalStyles
        styles={{
          ".MuiPaginationItem-root": {
            color: "#000E29 !important", // Normal page numbers
          },
          ".MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#000E29 !important", // Selected background
            color: "#fff !important", // Selected text
            fontWeight: "600 !important",
          },
          ".MuiPaginationItem-root:hover": {
            backgroundColor: "#dbe4f3 !important", // Hover background (optional)
          },
          ".MuiPaginationItem-root.Mui-selected:hover": {
            backgroundColor: "#001131 !important", // Hover on selected
          },
        }}
      />

      <MDBox
        pt={2}
        pb={3}
        sx={{
          height: "100%",
          marginLeft: "-17px",
          width: isMobile ? "100%" : "160.5%",
          borderRadius: 3,
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                sx={{
                  background: "#281b62", // gradient using your color
                  color: "white", // or any readable color
                  fontWeight: 600,
                  boxShadow: "none",
                }}
                borderRadius="lg"
                coloredShadow="info"
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <PhoneIcon style={{ color: "#fff" }} fontSize="medium" />
                  <MDTypography variant={isMobile ? "body1" : "h6"} fontWeight="bold" color="white">
                    Recent Calls
                  </MDTypography>
                </Box>
              </MDBox>{" "}
              <MDBox sx={{ overflowX: isMobile ? "auto" : "visible" }}>
                <DataTable
                  table={{
                    columns: [
                      {
                        Header: () => <MDBox sx={{ mr: 2 }}>ID</MDBox>,
                        accessor: "id",
                        align: "left",
                      },
                      {
                        Header: () => <MDBox sx={{ mr: 2 }}>Caller</MDBox>,
                        accessor: "caller_name",
                      },

                      {
                        Header: () => <MDBox sx={{ mr: 2 }}>Receiver</MDBox>,
                        accessor: "receiver_name",
                      },
                      { Header: "Call Type", accessor: "call_type" },
                      { Header: "Status", accessor: "status" },
                      { Header: () => <MDBox sx={{ mr: 2 }}>Time</MDBox>, accessor: "time" },
                      {
                        Header: () => <MDBox sx={{ mr: 2 }}>Duration</MDBox>,
                        accessor: "duration",
                      },
                      {
                        Header: () => <MDBox sx={{ mr: 2 }}>Action</MDBox>,
                        accessor: "action",
                        align: "left",
                      },
                    ],
                    rows: rows,
                  }}
                  isSorted={true}
                  entriesPerPage={{
                    defaultValue: 5,
                    entries: [5, 10, 25, 50],
                  }}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
}
