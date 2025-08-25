import React from 'react';
import axios from 'axios';
import { Tooltip, IconButton, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDAvatar from 'components/MDAvatar';
import EditCustomerDialog from './EditCustomerDialog';
import PropTypes from 'prop-types';

export default function useCustomerList(
  fromDate = null,
  toDate = null,
  recentLimit = 20,
  sortOrder = 'desc' // ✅ keep descending for recent data
) {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center">
      {image}
      <MDBox ml={2}>
        {name && (
          <MDTypography display="block" variant="button" fontWeight="medium">
            {name}
          </MDTypography>
        )}
        {email && (
          <MDTypography variant="caption" color="text">
            {email}
          </MDTypography>
        )}
      </MDBox>
    </MDBox>
  );

  Author.propTypes = {
    image: PropTypes.node,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
  };

  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title || '-'}
      </MDTypography>
    </MDBox>
  );

  Job.propTypes = {
    title: PropTypes.string,
  };

  // States
  const [rows, setRows] = React.useState([]);
  const [recentCustomers, setRecentCustomers] = React.useState([]);
  const [editOpen, setEditOpen] = React.useState(false);
  const [currentCustomer, setCurrentCustomer] = React.useState(null);
  const [loading, setLoading] = React.useState(true); // ✅ loading state

  const fetchCustomers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return [];
    }

    try {
      const response = await axios.get(
        'https://lemonpeak-hellohelp-backend.onrender.com/api/customer/customers',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      return [];
    }
  };

  const refreshData = async () => {
    setLoading(true); // ✅ start loading
    const customerData = await fetchCustomers();
    const from = fromDate ? new Date(fromDate + 'T00:00:00') : null;
    const to = toDate ? new Date(toDate + 'T23:59:59.999') : null;

    const filteredData = customerData.filter((customer) => {
      const createdDate = new Date(customer.created_at);
      return (!from || createdDate >= from) && (!to || createdDate <= to);
    });

    const sortedData = filteredData.sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.created_at) - new Date(b.created_at);
      }
      return new Date(b.created_at) - new Date(a.created_at); // ✅ keep descending default
    });

    const formattedRows = sortedData.map((customer) => ({
      id: <Job title={String(customer.id)} />,
      username: customer.username ? (
        <Author
          image={
            <MDAvatar
              sx={{
                background: '#D2DCF6',
                color: '#3B82F6',
                width: '30px',
                height: '30px',
                fontSize: '15px',
                fontWeight: 800,
              }}
            >
              {customer.username.charAt(0).toUpperCase()}
            </MDAvatar>
          }
          name={customer.username.charAt(0).toUpperCase() + customer.username.slice(1)}
        />
      ) : (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          Unknown
        </MDTypography>
      ),
      created_at: (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {customer.created_at
            ? new Date(customer.created_at)
                .toLocaleString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
                .replace(/\//g, '-')
            : '—'}
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
              sx={{ color: '#181313', '&:hover': { color: '#181313' } }}
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
              sx={{ color: '#181313', '&:hover': { color: '#181313' } }}
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </MDBox>
      ),
    }));

    setRows(formattedRows);
    setRecentCustomers(
      sortOrder === 'desc' ? sortedData.slice(0, recentLimit) : sortedData.slice(-recentLimit)
    );

    setLoading(false); // ✅ stop loading
  };

  React.useEffect(() => {
    refreshData();
  }, [fromDate, toDate, sortOrder]);

  return {
    columns: [
      { Header: <MDBox className="text-lowercase">Id</MDBox>, accessor: 'id', align: 'left' },
      {
        Header: <MDBox className="text-lowercase">First Name</MDBox>,
        accessor: 'username',
        align: 'left',
      },
      {
        Header: <MDBox className="text-lowercase">Phone No</MDBox>,
        accessor: 'phone_no',
        align: 'left',
      },
      {
        Header: <MDBox className="text-lowercase">Created At</MDBox>,
        accessor: 'created_at',
        align: 'left',
      },
      {
        Header: <MDBox className="text-lowercase">Action</MDBox>,
        accessor: 'action',
        align: 'left',
        sortable: false,
      },
    ],
    rows,
    recentCustomers,
    loading, // ✅ expose loading state
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
