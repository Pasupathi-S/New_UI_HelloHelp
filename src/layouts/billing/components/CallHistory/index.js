import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import CallIcon from '@mui/icons-material/Call';
import { Tooltip, IconButton, CircularProgress } from '@mui/material';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DataTable from 'examples/Tables/DataTable';
import VisibilityIcon from '@mui/icons-material/Visibility';

// ---------------------- Reusable Chips ----------------------

function CallTypeChip({ value }) {
  return (
    <Chip
      className="table-data-two"
      label={value.charAt(0).toUpperCase() + value.slice(1)}
      sx={{
        backgroundColor: value === 'audio' ? '#e3f0fc' : '#f3e8fd',
        color: value === 'audio' ? '#1976d2' : '#9c27b0',
        fontWeight: 500,
        borderRadius: '8px',
        px: 1,
        py: 0,
        height: '24px',
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
      className="table-data-two"
      label={value.charAt(0).toUpperCase() + value.slice(1)}
      sx={{
        backgroundColor:
          value === 'accepted' ? '#e3fde8' : value === 'initiated' ? '#fff5d3' : '#fde3e3',
        color: value === 'accepted' ? '#388e3c' : value === 'initiated' ? '#fbc02d' : '#d32f2f',
        fontWeight: 500,
        borderRadius: '8px',
        px: 1,
        py: 0,
        height: '24px',
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
      className="table-data"
      label={value}
      sx={{
        backgroundColor: '#ffffff',
        py: 0,
      }}
    />
  );
}
IdChip.propTypes = {
  value: PropTypes.string.isRequired,
};

function CallerChip({ value }) {
  const displayValue = !value || value === 'null' ? 'Unknown' : value;
  return (
    <Chip
      className="table-data"
      label={displayValue}
      sx={{
        backgroundColor: '#ffffff',
        px: 1.5,
        py: 0,
      }}
    />
  );
}
CallerChip.propTypes = {
  value: PropTypes.string.isRequired,
};

function CallerName({ value }) {
  const displayValue =
    !value || value === 'null' ? 'Unknown' : value.charAt(0).toUpperCase() + value.slice(1);

  return (
    <Chip
      className="table-data"
      label={displayValue}
      sx={{
        backgroundColor: '#ffffff',
        px: 1.5,
        py: 0,
      }}
    />
  );
}
CallerName.propTypes = {
  value: PropTypes.string.isRequired,
};

function ReceiverChip({ value }) {
  const displayValue = !value || value === 'null' ? 'Unknown' : value;
  return (
    <Chip
      className="table-data"
      label={displayValue}
      sx={{
        backgroundColor: '#ffffff',
        px: 3.5,
        py: 0,
      }}
    />
  );
}
ReceiverChip.propTypes = {
  value: PropTypes.string.isRequired,
};

function ReceiverName({ value }) {
  const displayValue =
    !value || value === 'null' ? 'Unknown' : value.charAt(0).toUpperCase() + value.slice(1);

  return (
    <Chip
      className="table-data"
      label={displayValue}
      sx={{
        backgroundColor: '#ffffff',
        px: 1.5,
        py: 0,
      }}
    />
  );
}
ReceiverName.propTypes = {
  value: PropTypes.string,
};

function DeviceTypeChip({ row }) {
  const device = row.original?.metadata?.device || '-';
  return (
    <Chip
      className="table-data-two"
      label={device}
      sx={{
        backgroundColor: '#ede7f6',
        color: '#5e35b1',
        fontWeight: 500,
        borderRadius: '8px',
        px: 1,
        py: 0,
        height: '24px',
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
          sx={{ color: '#181313', '&:hover': { color: '#181313' } }}
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

function DateCell({ value }) {
  const date = new Date(value);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return <span className="table-data">{`${day}-${month}-${year}`}</span>;
}
DateCell.propTypes = {
  value: PropTypes.string.isRequired,
};

// ---------------------- Main Component ----------------------

export default function CallHistory() {
  const [callLogs, setCallLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCallLogs([]);
      setLoading(false);
      return;
    }
    axios
      .get('https://lemonpeak-hellohelp-backend.onrender.com/api/call/call-logs', {
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
                background: '#1D4ED8',
                color: 'white',
                fontWeight: 600,
                boxShadow: 'none',
              }}
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" fontWeight="bold" color="white">
                <CallIcon sx={{ verticalAlign: 'middle', mr: 1 }} fontSize="medium" />
                Call History
              </MDTypography>
            </MDBox>

            <MDBox pt={3}>
              {loading ? (
                <MDBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  py={5}
                >
                  <CircularProgress color="primary" />
                  <MDTypography mt={2} variant="body2" color="text">
                    Loading Call History...
                  </MDTypography>
                </MDBox>
              ) : (
                <DataTable
                  table={{
                    columns: [
                      {
                        Header: <span className="text-lowercase">Date</span>,
                        accessor: 'started_at',
                        Cell: DateCell,
                      },
                      {
                        Header: <span className="text-lowercase">Caller ID</span>,
                        accessor: 'caller_id',
                        Cell: CallerChip,
                      },
                      {
                        Header: () => (
                          <MDBox
                            className="text-lowercase"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              minWidth: '130px',
                              maxWidth: '150px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            Caller Name
                          </MDBox>
                        ),
                        accessor: 'caller_name',
                        Cell: CallerName,
                      },
                      {
                        Header: <span className="text-lowercase">Receiver ID</span>,
                        accessor: 'receiver_id',
                        Cell: ReceiverChip,
                      },
                      {
                        Header: () => (
                          <MDBox
                            className="text-lowercase"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              minWidth: '140px',
                              maxWidth: '160px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            Receiver Name
                          </MDBox>
                        ),
                        accessor: 'receiver_name',
                        Cell: ReceiverName,
                      },
                      {
                        Header: <span className="text-lowercase">Call Type</span>,
                        accessor: 'call_type',
                        Cell: CallTypeChip,
                      },
                      {
                        Header: <span className="text-lowercase">Request</span>,
                        accessor: 'status',
                        Cell: StatusChip,
                      },
                      {
                        Header: () => (
                          <MDBox className="text-lowercase" sx={{ mr: 3 }}>
                            Action
                          </MDBox>
                        ),
                        accessor: 'actions',
                        width: '50px',
                        Cell: ActionButton,
                      },
                    ],
                    rows: callLogs,
                  }}
                  isSorted
                  entriesPerPage={{
                    defaultValue: 20,
                    entries: [20, 50, 100, 200],
                  }}
                  showTotalEntries
                  noEndBorder
                />
              )}
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
