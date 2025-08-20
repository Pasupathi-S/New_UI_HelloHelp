import React from 'react';
import axios from 'axios';
import { Tooltip, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDAvatar from 'components/MDAvatar';
import EditCustomerDialog from './EditCustomerDialog';
import PropTypes from 'prop-types';

export default function useCustomerList(fromDate = null, toDate = null, recentLimit = 20) {
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
    image: PropTypes.node, // changed to node since you pass JSX, not string
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

  const [rows, setRows] = React.useState([]);
  const [recentCustomers, setRecentCustomers] = React.useState([]);
  const [editOpen, setEditOpen] = React.useState(false);
  const [currentCustomer, setCurrentCustomer] = React.useState(null);

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
    const customerData = await fetchCustomers();
    const from = fromDate ? new Date(fromDate + 'T00:00:00') : null;
    const to = toDate ? new Date(toDate + 'T23:59:59.999') : null;

    const filteredData = customerData.filter((customer) => {
      const createdDate = new Date(customer.created_at);
      return (!from || createdDate >= from) && (!to || createdDate <= to);
    });

    // Sort by most recent first
    const sortedData = filteredData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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
            ? new Date(customer.created_at).toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
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

    // Keep only top N most recent customers (default 5)
    setRecentCustomers(sortedData.slice(0, recentLimit));
  };

  React.useEffect(() => {
    refreshData();
  }, [fromDate, toDate]);

  return {
    columns: [
      {
        Header: <MDBox className="text-lowercase">Id</MDBox>,
        accessor: 'id',
        align: 'left',
      },
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
    recentCustomers, // array of most recent raw customer objects
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
