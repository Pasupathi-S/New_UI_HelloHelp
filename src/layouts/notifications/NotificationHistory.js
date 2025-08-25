import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs'; // For formatting date

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DataTable from 'examples/Tables/DataTable';
import Footer from 'examples/Footer';
import HistoryIcon from '@mui/icons-material/History';

function StatusChip({ value }) {
  return (
    <Chip
      className="table-data-two"
      label={value}
      sx={{
        backgroundColor: value === 'Sent' ? '#e3fde8' : '#fde3e3',
        color: value === 'Sent' ? '#388e3c' : '#d32f2f',
        fontWeight: 500,
        borderRadius: '8px',
        px: 1,
        height: '24px',
      }}
    />
  );
}

StatusChip.propTypes = {
  value: PropTypes.string.isRequired,
};

function RecipientsCell({ value }) {
  return (
    <Tooltip title={value.join(', ')}>
      <span>{value.length} user(s)</span>
    </Tooltip>
  );
}

RecipientsCell.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function MessageCell({ value }) {
  return (
    <Tooltip title={value}>
      <span>{value.length > 30 ? value.slice(0, 30) + '...' : value}</span>
    </Tooltip>
  );
}

MessageCell.propTypes = {
  value: PropTypes.string.isRequired,
};

function NotificationHistory() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // ⬅️ Loading state

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'https://lemonpeak-hellohelp-backend.onrender.com/api/admin/notification-history',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const transformed = response.data.map((n) => ({
          id: n.id,
          campaignId: n.campaign_id || '-',
          date: dayjs(n.sent_at).format('DD-MM-YYYY, hh:mm A'),
          userid: n.user_id,
          username: n.username.charAt(0).toUpperCase() + n.username.slice(1),
          recipients: [n.username],
          title: n.title,
          message: n.body,
          offerCode: n.data?.offer_code || '-',
          status: n.status === 'success' ? 'Sent' : 'Failed',
        }));

        setNotifications(transformed);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false); // ⬅️ Stop loading
      }
    };

    fetchNotifications();
  }, []);

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
                    background: '#1D4ED8',
                    color: 'white',
                    fontWeight: 600,
                    boxShadow: 'none',
                  }}
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" fontWeight="bold" color="white">
                    <HistoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} fontSize="medium" />
                    Notification History
                  </MDTypography>
                </MDBox>

                <MDBox pt={1}>
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
                        Loading Notification History ...
                      </MDTypography>
                    </MDBox>
                  ) : (
                    <DataTable
                      table={{
                        columns: [
                          {
                            Header: () => <span className="text-lowercase">Date & Time</span>,
                            accessor: 'date',
                          },
                          {
                            Header: () => (
                              <span className="text-lowercase" style={{ marginRight: '30px' }}>
                                Campaign Id
                              </span>
                            ),
                            accessor: 'campaignId',
                          },
                          {
                            Header: () => (
                              <span className="text-lowercase" style={{ marginRight: '30px' }}>
                                User Name
                              </span>
                            ),
                            accessor: 'username',
                          },
                          {
                            Header: () => (
                              <span className="text-lowercase" style={{ marginRight: '30px' }}>
                                Title
                              </span>
                            ),
                            accessor: 'title',
                          },
                          {
                            Header: () => (
                              <span className="text-lowercase" style={{ marginRight: '30px' }}>
                                Message
                              </span>
                            ),
                            accessor: 'message',
                            Cell: MessageCell,
                          },
                          {
                            Header: () => <span className="text-lowercase">Status</span>,
                            accessor: 'status',
                            Cell: StatusChip,
                          },
                        ],
                        rows: notifications,
                      }}
                      isSorted={true}
                      entriesPerPage={{
                        defaultValue: 20,
                        entries: [20, 50, 100, 200],
                      }}
                      showTotalEntries={true}
                      noEndBorder
                    />
                  )}
                </MDBox>
              </Card>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default NotificationHistory;
