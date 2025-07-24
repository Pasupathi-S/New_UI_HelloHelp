import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import CustomerList from "layouts/tables/data/CustomerList";
import AgentList from "layouts/tables/data/AgentList";
import AddIcon from "@mui/icons-material/Add";
import { Dialog, DialogTitle, Box } from "@mui/material";
import MDButton from "components/MDButton";
import AddAgent from "layouts/tables/data/AddAgent";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Users() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { columns: pColumns, rows: pRows, editDialog } = CustomerList(fromDate, toDate);

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    is_agent: true,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={5}>
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
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <GroupIcon style={{ color: "white" }} fontSize="medium" />
                  <MDTypography variant="h6" fontWeight="bold" color="white">
                    All Agents
                  </MDTypography>
                </Box>
                <MDButton
                  variant="contained"
                  color="white"
                  startIcon={<AddIcon />}
                  onClick={handleOpen}
                  sx={{ color: "#000E29", fontWeight: 600 }}
                >
                  Add Agent
                </MDButton>
                <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                  <DialogTitle sx={{ textAlign: "center" }}>Add New Agent</DialogTitle>
                  <AddAgent
                    form={form}
                    onChange={handleChange}
                    onAgentAdded={() => {
                      setSnackbarOpen(true);
                      handleClose();
                    }}
                    onClose={handleClose}
                  />
                </Dialog>
              </MDBox>
              <MDBox pt={3}>
                <AgentList />
              </MDBox>
            </Card>
          </Grid>

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
                <Box display="flex" alignItems="center" gap={1}>
                  <PersonAddIcon style={{ color: "white" }} fontSize="medium" />
                  <MDTypography variant="h6" fontWeight="bold" color="white">
                    All Customers
                  </MDTypography>
                </Box>
              </MDBox>

              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                px={2}
                pt={2}
              >
                <div />

                <MDBox display="flex" flexWrap="wrap" justifyContent="flex-start" gap={2}>
                  <MDBox
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{
                      flex: { xs: 1, sm: 1, md: "unset" },
                      minWidth: { xs: "200px", sm: "200px", md: "unset" },
                      maxWidth: { xs: "300px", sm: "300px", md: "unset" },
                    }}
                  >
                    <MDTypography variant="body2" fontWeight="medium" whiteSpace="nowrap">
                      From:
                    </MDTypography>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      max={new Date().toISOString().split("T")[0]}
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        width: "100%",
                      }}
                    />
                  </MDBox>

                  <MDBox
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{
                      flex: { xs: 1, sm: 1, md: "unset" },
                      minWidth: { xs: "200px", sm: "200px", md: "unset" },
                      maxWidth: { xs: "300px", sm: "300px", md: "unset" },
                    }}
                  >
                    <MDTypography variant="body2" fontWeight="medium" whiteSpace="nowrap">
                      To:
                    </MDTypography>
                    <Box ml={{ xs: 2, md: 0 }} width="100%">
                      <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                        style={{
                          padding: "8px",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          width: "100%",
                        }}
                      />
                    </Box>
                  </MDBox>
                </MDBox>

                <MDBox pt={3} sx={{ width: "100%" }}>
                  <DataTable
                    table={{ columns: pColumns, rows: pRows }}
                    isSorted={true}
                    entriesPerPage={{
                      defaultValue: 5,
                      entries: [5, 10, 15, 20, 50, 100, 200, 500, 1000],
                    }}
                    showTotalEntries={true}
                    noEndBorder
                  />
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      {editDialog}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          Agent Added Successfully
        </Alert>
      </Snackbar>
      <Footer />
    </DashboardLayout>
  );
}

export default Users;
