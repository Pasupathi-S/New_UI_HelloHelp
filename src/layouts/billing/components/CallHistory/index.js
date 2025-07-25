import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Chip from "@mui/material/Chip";
import { Stack } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import CallIcon from "@mui/icons-material/Call";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import { Tooltip, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Reusable Chips

function CallTypeChip({ value }) {
  return (
    <Chip
      label={value}
      sx={{
        backgroundColor: value === "audio" ? "#e3f0fc" : "#f3e8fd",
        color: value === "audio" ? "#1976d2" : "#9c27b0",
        fontWeight: 500,
        borderRadius: "18px",
        px: 1.5,
        py: 0,
      }}
    />
  );
}
CallTypeChip.propTypes = {
  value: PropTypes.string.isRequired,
};

function StatusChip({ value }) {
  return (
    <Chip
      label={value}
      sx={{
        backgroundColor:
          value === "accepted" ? "#e3fde8" : value === "initiated" ? "#fdf7e3" : "#fde3e3",
        color: value === "accepted" ? "#388e3c" : value === "initiated" ? "#fbc02d" : "#d32f2f",
        fontWeight: 500,
        borderRadius: "18px",
        px: 1.5,
        py: 0,
      }}
    />
  );
}
StatusChip.propTypes = {
  value: PropTypes.string.isRequired,
};

function IdChip({ value }) {
  return (
    <Chip
      label={value}
      sx={{
        backgroundColor: "#ffffff",
        py: 0,
      }}
    />
  );
}
IdChip.propTypes = {
  value: PropTypes.string.isRequired,
};

function CallerChip({ value }) {
  return (
    <Chip
      label={value}
      sx={{
        backgroundColor: "#ffffff",
        px: 1.5,
        py: 0,
      }}
    />
  );
}
CallerChip.propTypes = {
  value: PropTypes.string.isRequired,
};

function ReceiverChip({ value }) {
  return (
    <Chip
      label={value}
      sx={{
        backgroundColor: "#ffffff",
        px: 3.5,
        py: 0,
      }}
    />
  );
}
ReceiverChip.propTypes = {
  value: PropTypes.string.isRequired,
};

function DeviceTypeChip({ row }) {
  const device = row.original?.metadata?.device || "-";
  return (
    <Chip
      label={device}
      sx={{
        backgroundColor: "#ede7f6",
        color: "#5e35b1",
        fontWeight: 500,
        borderRadius: "18px",
        px: 1.5,
        py: 0,
      }}
    />
  );
}
DeviceTypeChip.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      metadata: PropTypes.shape({
        device: PropTypes.string,
      }),
    }),
  }).isRequired,
};

function ActionButton({ row }) {
  return (
    <MDBox display="flex" gap={1}>
      <Tooltip title="View" arrow>
        <IconButton
          component={Link}
          to={`/CallDetails/${row.original.id}`}
          sx={{ color: "#181313", "&:hover": { color: "#181313" } }}
          size="small"
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </MDBox>
  );
}
ActionButton.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

// Main Component

export default function CallHistory() {
  const [callLogs, setCallLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCallLogs([]);
      setLoading(false);
      return;
    }
    axios
      .get("https://lemonpeak-hellohelp-backend.onrender.com/api/call/call-logs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const sortedLogs = res.data.sort((a, b) => new Date(b.started_at) - new Date(a.started_at));
        setCallLogs(sortedLogs);
        setLoading(false);
      })
      .catch(() => {
        setCallLogs([]);
        setLoading(false);
      });
  }, []);

  return (
    <MDBox pt={6} pb={3}>
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
                background: "#281b62",
                color: "white",
                fontWeight: 600,
                boxShadow: "none",
              }}
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" fontWeight="bold" color="white">
                <CallIcon sx={{ verticalAlign: "middle", mr: 1 }} fontSize="medium" />
                Call History
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <DataTable
                table={{
                  columns: [
                    { Header: "ID", accessor: "id", Cell: IdChip },
                    {
                      Header: "Date",
                      accessor: "started_at",
                      Cell: ({ value }) => {
                        const date = new Date(value);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear();
                        return `${day}-${month}-${year}`;
                      },
                    },

                    { Header: "Caller ID", accessor: "caller_id", Cell: CallerChip },
                    { Header: "Receiver ID", accessor: "receiver_id", Cell: ReceiverChip },
                    { Header: "Call Type", accessor: "call_type", Cell: CallTypeChip },
                    { Header: "Request", accessor: "status", Cell: StatusChip },
                    { Header: "Meeting Call ID", accessor: "meeting_call_id" },
                    {
                      Header: "Device Type",
                      accessor: "device_type",
                      Cell: DeviceTypeChip,
                      sortType: (a, b) => {
                        const deviceA = a.original.metadata?.device || "";
                        const deviceB = b.original.metadata?.device || "";
                        return deviceA.localeCompare(deviceB);
                      },
                    },
                    { Header: "Action", accessor: "actions", Cell: ActionButton },
                  ],
                  rows: callLogs,
                }}
                isSorted
                entriesPerPage={{
                  defaultValue: 5,
                  entries: [5, 10, 15, 20, 50, 100, 200, 500, 1000],
                }}
                showTotalEntries
                noEndBorder
              />
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
