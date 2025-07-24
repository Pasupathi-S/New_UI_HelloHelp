import React from "react";
import axios from "axios";
import { Tooltip, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import EditCustomerDialog from "./EditCustomerDialog";
import team2 from "assets/images/team-2.jpg";
import PropTypes from "prop-types";

export default function useCustomerList(fromDate = null, toDate = null) {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar size="sm" sx={{ bgcolor: "#000E29" }}>
        <PersonIcon sx={{ color: "#fff" }} />
      </MDAvatar>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
  Author.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };
  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title || "-"}
      </MDTypography>
    </MDBox>
  );
  Job.propTypes = {
    title: PropTypes.string,
  };

  const [rows, setRows] = React.useState([]);
  const [editOpen, setEditOpen] = React.useState(false);
  const [currentCustomer, setCurrentCustomer] = React.useState(null);

  const fetchCustomers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return [];
    }

    try {
      const response = await axios.get(
        "https://lemonpeak-hellohelp-backend.onrender.com/api/customer/customers",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      return [];
    }
  };

  const refreshData = async () => {
    const customerData = await fetchCustomers();
    const from = fromDate ? new Date(fromDate + "T00:00:00") : null;
    const to = toDate ? new Date(toDate + "T23:59:59.999") : null;

    const filteredData = customerData.filter((customer) => {
      const createdDate = new Date(customer.created_at);
      return (!from || createdDate >= from) && (!to || createdDate <= to);
    });

    const formattedRows = filteredData.map((customer) => ({
      id: <Job title={String(customer.id)} />,
      username: customer.username ? (
        <Author
          image={team2}
          name={customer.username.charAt(0).toUpperCase() + customer.username.slice(1)}
        />
      ) : (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          -
        </MDTypography>
      ),
      created_at: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {customer.created_at
            ? new Date(customer.created_at).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "—"}
        </MDTypography>
      ),
      email: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {customer.email}
        </MDTypography>
      ),
      phone_no: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {customer.phone}
        </MDTypography>
      ),
      action: (
        <MDBox display="flex" gap={1}>
          <Tooltip title="View" arrow>
            <IconButton
              component={Link}
              to={`/customer/${customer.id}`}
              sx={{ color: "#181313", "&:hover": { color: "#181313" } }}
              size="small"
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" arrow>
            <IconButton
              onClick={() => {
                setCurrentCustomer(customer);
                setEditOpen(true);
              }}
              sx={{ color: "#181313", "&:hover": { color: "#181313" } }}
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </MDBox>
      ),
    }));

    setRows(formattedRows);
  };

  React.useEffect(() => {
    refreshData();
  }, [fromDate, toDate]);

  return {
    columns: [
      { Header: "Id", accessor: "id", width: "7%", align: "left" },
      { Header: "Firstname", accessor: "username", width: "11%", align: "left" },
      { Header: "phone no", accessor: "phone_no", width: "11%", align: "left" },
      { Header: "created at", accessor: "created_at", width: "11%", align: "left" },
      { Header: "action", accessor: "action", width: "11%", align: "left" },
    ],
    rows,
    editDialog: (
      <EditCustomerDialog
        open={editOpen}
        customer={currentCustomer}
        onClose={() => setEditOpen(false)}
        refreshData={refreshData}
      />
    ),
  };
}
