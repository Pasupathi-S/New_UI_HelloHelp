// ✅ Updated code to support showing 20/50/100/200 entries based on dropdown selection

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import DataTable from 'examples/Tables/DataTable';
import CustomerList from 'layouts/tables/data/CustomerList';
import AgentList from 'layouts/tables/data/AgentList';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogTitle, Box } from '@mui/material';
import MDButton from 'components/MDButton';
import AddAgent from 'layouts/tables/data/AddAgent';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Users({ type }) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [limit, setLimit] = useState(20); // ✅ new state to control how many entries to show

  const { columns: pColumns, rows: pRows, editDialog } = CustomerList(fromDate, toDate, limit);

  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    is_agent: true,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={5}>
        <Grid container spacing={6}>
          {type === 'agents' && (
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  sx={{ background: '#1D4ED8', color: 'white', fontWeight: 600 }}
                  borderRadius="lg"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <GroupIcon style={{ color: 'white' }} fontSize="medium" />
                    <MDTypography variant="h6" fontWeight="bold" color="white">
                      All Agents
                    </MDTypography>
                  </Box>
                  <MDButton
                    variant="contained"
                    color="white"
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                    sx={{ color: '#000E29', fontWeight: 600 }}
                  >
                    Add Agent
                  </MDButton>
                </MDBox>
                <MDBox pt={3}>
                  <AgentList />
                </MDBox>
              </Card>

              <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ m: 0, p: 2 }}>
                  Add New Agent
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>

                <AddAgent
                  form={form}
                  setForm={setForm}
                  onClose={handleClose}
                  onAgentAdded={() => {
                    setSnackbarOpen(true);
                    handleClose();
                  }}
                />
              </Dialog>
            </Grid>
          )}

          {type === 'customers' && (
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  sx={{ background: '#1D4ED8', color: 'white', fontWeight: 600 }}
                  borderRadius="lg"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                  gap={2}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <PersonAddIcon style={{ color: 'white' }} fontSize="medium" />
                    <MDTypography variant="h6" fontWeight="bold" color="white">
                      All Customers
                    </MDTypography>
                  </Box>

                  <MDBox display="flex" flexWrap="wrap" justifyContent="flex-start" gap={2}>
                    <MDBox display="flex" alignItems="center" gap={1}>
                      <MDTypography sx={{ color: '#fff' }} variant="body2" fontWeight="medium">
                        From:
                      </MDTypography>
                      <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                      />
                    </MDBox>
                    <MDBox display="flex" alignItems="center" gap={1}>
                      <MDTypography sx={{ color: '#fff' }} variant="body2" fontWeight="medium">
                        To:
                      </MDTypography>
                      <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                      />
                    </MDBox>
                  </MDBox>
                </MDBox>

                <MDBox pt={3}>
                  <DataTable
                    table={{ columns: pColumns, rows: pRows }}
                    isSorted={true}
                    entriesPerPage={{
                      defaultValue: 20,
                      entries: [20, 50, 100, 200],
                      setEntries: setLimit, // ✅ handle limit change
                    }}
                    showTotalEntries={true}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          )}
        </Grid>
      </MDBox>

      {editDialog}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Agent Added Successfully
        </Alert>
      </Snackbar>

      <Footer />
    </DashboardLayout>
  );
}

Users.propTypes = {
  type: PropTypes.oneOf(['agents', 'customers']).isRequired,
};

export default Users;
