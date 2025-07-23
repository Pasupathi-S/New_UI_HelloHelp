/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Icon from "@mui/material/Icon";
import axios from "axios";
import React from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
import MDBadge from "components/MDBadge";
import PersonIcon from "@mui/icons-material/Person";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";

// ✅ Updated function to act like a hook
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

  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title || "-"}
      </MDTypography>
    </MDBox>
  );

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      setRows([]);
      return;
    }

    axios
      .get("https://lemonpeak-hellohelp-backend.onrender.com/api/customer/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const customerData = response.data;

        // ✅ Ensure full 24-hour coverage
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

          user_lastname: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {customer.user_lastname?.charAt(0).toUpperCase() + customer.user_lastname?.slice(1)}
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
            <MDButton
              component={Link}
              to={`/customer/${customer.id}`}
              variant="outlined"
              size="small"
              sx={{
                color: "#000E29",
                border: "none",
                backgroundColor: "#64757c",
                textTransform: "none",
                borderRadius: "5px",
                fontWeight: 600,
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#64757c",
                  color: "#fff",
                  borderColor: "none",
                },
              }}
              startIcon={<Icon>visibility</Icon>}
            >
              View
            </MDButton>
          ),
        }));

        setRows(formattedRows);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [fromDate, toDate]);

  return {
    columns: [
      { Header: "Id", accessor: "id", align: "left" },
      { Header: "Firstname", accessor: "username", align: "left" },
      // { Header: "Lastname", accessor: "user_lastname", align: "left" },
      // { Header: "email", accessor: "email", align: "left" },
      { Header: "phone no", accessor: "phone_no", align: "left" },
      { Header: "created at", accessor: "created_at", align: "left" },
      { Header: "action", accessor: "action", align: "left" },
    ],
    rows,
  };
}
