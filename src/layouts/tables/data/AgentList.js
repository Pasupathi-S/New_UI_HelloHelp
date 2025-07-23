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

const Author = ({ image, name, email }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar size="sm" sx={{ bgcolor: "#000E29" }}>
      <PersonIcon sx={{ color: "#fff" }} />
    </MDAvatar>
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name || "-"}
      </MDTypography>
      <MDTypography variant="caption">{email || "-"}</MDTypography>
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
            name={(agent.username || "").charAt(0).toUpperCase() + (agent.username || "").slice(1)}
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
          <MDBox display="flex">
            <MDButton
              component={Link}
              to={`/agent/${agent.id}`}
              variant="outlined"
              size="small"
              sx={{
                border: "none",
                backgroundColor: "#64757c",
                textTransform: "none",
                borderRadius: "5px",
                color: "#fff",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#64757c",
                  color: "#fff",
                },
              }}
              startIcon={<Icon>visibility</Icon>}
            >
              View
            </MDButton>
            <MDButton
              onClick={() => {
                setCurrentAgent(agent);
                setEditOpen(true);
              }}
              variant="outlined"
              size="small"
              sx={{
                border: "none",
                backgroundColor: "#64757c",
                textTransform: "none",
                borderRadius: "5px",
                color: "#fff",
                fontWeight: 600,
                ml: 1,
                "&:hover": {
                  backgroundColor: "#64757c",
                  color: "#fff",
                },
              }}
              startIcon={<Icon>edit</Icon>}
            >
              Edit
            </MDButton>
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
                  (updatedAgent.username || "").charAt(0).toUpperCase() +
                  (updatedAgent.username || "").slice(1)
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
            { Header: "Id", accessor: "id", width: "10%", align: "left" },
            { Header: "Firstname", accessor: "username", width: "20%", align: "left" },
            { Header: "Email", accessor: "email", align: "left" },
            { Header: "Phone no", accessor: "phone", align: "center" },
            { Header: "Action", accessor: "action", align: "center" },
          ],
          rows: Array.isArray(rows) ? rows : [], // Double safety check
        }}
        isSorted={true}
        entriesPerPage={{ defaultValue: 10 }}
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
