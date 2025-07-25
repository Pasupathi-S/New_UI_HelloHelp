import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import PersonIcon from "@mui/icons-material/Person";
import { Icon } from "@mui/material";
import MDButton from "components/MDButton";
import EditAgentDialog from "./EditAgentDialog";
import DataTable from "examples/Tables/DataTable";
import team2 from "assets/images/team-2.jpg";
import { Tooltip, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const Author = ({ image, name, email }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar size="sm" sx={{ bgcolor: "#000E29" }}>
      <PersonIcon sx={{ color: "#fff" }} />
    </MDAvatar>
    <MDBox ml={2} lineHeight={1}>
      {name && (
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      )}
      {email && <MDTypography variant="caption">{email}</MDTypography>}
    </MDBox>
  </MDBox>
);

Author.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
};

Author.defaultProps = {
  image: "",
  name: "",
  email: "",
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

Job.defaultProps = {
  title: "",
};

export default function AgentList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(null);

  const fetchAgents = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "https://lemonpeak-hellohelp-backend.onrender.com/api/agent/agents",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data || [];
      const sortedData = data.sort((a, b) => (b.id || 0) - (a.id || 0));

      const formattedRows = sortedData.map((agent) => ({
        id: <Job title={String(agent.id || "")} />,
        username: (
          <Author
            image={team2}
            email={""}
            name={
              agent.username
                ? agent.username.split(" ")[0].charAt(0).toUpperCase() +
                  agent.username.split(" ")[0].slice(1)
                : ""
            }
          />
        ),

        email: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {agent.email || "-"}
          </MDTypography>
        ),
        phone: (
          <MDBox ml={-1} display="flex" alignItems="center">
            <MDTypography variant="caption" color="text" fontWeight="medium" ml={1}>
              {agent.phone || "-"}
            </MDTypography>
          </MDBox>
        ),
        action: (
          <MDBox display="flex" gap={1}>
            <Tooltip title="View" arrow>
              <IconButton
                component={Link}
                to={`/agent/${agent.id}`}
                sx={{
                  color: "#181313",
                  "&:hover": {
                    color: "#181313", // Hover color for View icon
                  },
                }}
                size="small"
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit" arrow>
              <IconButton
                onClick={() => {
                  setCurrentAgent(agent);
                  setEditOpen(true);
                }}
                sx={{
                  color: "#181313",
                  "&:hover": {
                    color: "#181313", // Hover color for View icon
                  },
                }}
                size="small"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </MDBox>
        ),
      }));

      setRows(formattedRows);
      setError(null);
    } catch (err) {
      console.error("Error fetching agent data:", err);
      setError("Failed to load agent data");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (updatedAgent) => {
    setRows(
      rows.map((row) => {
        if (row.id.props.title === String(updatedAgent.id)) {
          return {
            ...row,
            username: (
              <Author
                image={team2}
                name={
                  updatedAgent.username
                    ? updatedAgent.username.split(" ")[0].charAt(0).toUpperCase() +
                      updatedAgent.username.split(" ")[0].slice(1)
                    : ""
                }
              />
            ),
            email: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {updatedAgent.email || "-"}
              </MDTypography>
            ),
            phone: (
              <MDBox ml={-1} display="flex" alignItems="center">
                <MDTypography variant="caption" color="text" fontWeight="medium" ml={1}>
                  {updatedAgent.phone || "-"}
                </MDTypography>
              </MDBox>
            ),
          };
        }
        return row;
      })
    );
    setEditOpen(false);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  if (loading) {
    return (
      <MDBox display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        {/* <CircularProgress /> */}
      </MDBox>
    );
  }

  if (error) {
    return (
      <MDBox display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <MDTypography variant="body1" color="error">
          {error}
        </MDTypography>
      </MDBox>
    );
  }

  return (
    <>
      <DataTable
        table={{
          columns: [
            {
              Header: () => <MDBox>Id</MDBox>,
              accessor: "id",
              align: "left",
              width: "10%",
            },
            {
              Header: () => <MDBox>Firstname</MDBox>,
              accessor: "username",
              align: "left",
              width: "18%",
            },
            {
              Header: () => <MDBox>Email</MDBox>,
              accessor: "email",
              align: "left",
              width: "25%",
            },
            {
              Header: () => <MDBox>Phone no</MDBox>,
              accessor: "phone",
              align: "left",
            },
            {
              Header: () => <MDBox>Action</MDBox>,
              accessor: "action",
              align: "left",
            },
          ],
          rows: Array.isArray(rows) ? rows : [], // Double safety check
        }}
        isSorted={true}
        entriesPerPage={{
          defaultValue: 5,
          entries: [5, 10, 15, 20, 50, 100, 200, 500, 1000],
        }}
        showTotalEntries={true}
        noEndBorder
      />
      <EditAgentDialog
        open={editOpen}
        agent={currentAgent}
        onClose={() => setEditOpen(false)}
        onUpdate={handleUpdate}
      />
    </>
  );
}
