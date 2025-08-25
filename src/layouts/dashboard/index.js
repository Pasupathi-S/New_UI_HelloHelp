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
import Grid from '@mui/material/Grid';
import { CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import ComplexStatisticsCard from 'examples/Cards/StatisticsCards/ComplexStatisticsCard';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VideocamIcon from '@mui/icons-material/Videocam';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Dashboard components
import Projects from 'layouts/dashboard/components/Projects';
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true); // 🔹 Loading state

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(
          'https://lemonpeak-hellohelp-backend.onrender.com/api/call/dashboard-stats',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = res.data;
        console.log('Dashboard Stats Data:', data);

        setStats([
          {
            title: 'Total Agents',
            value: data.agents ?? '-',
            change: data.agents_change ?? '',
            icon: <PeopleIcon />,
            progressValue: data.agents_progress ?? 0,
            progressColor: 'primary',
          },
          {
            title: 'Total Customers',
            value: data.customers ?? '-',
            change: data.customers_change ?? '',
            icon: <PersonAddIcon />,
            progressValue: data.customers_progress ?? 0,
            progressColor: 'warning',
          },
          {
            title: 'Video Calls',
            value: data.video_calls ?? '-',
            change: data.video_calls_change ?? '',
            icon: <VideocamIcon />,
            progressValue: data.video_calls_progress ?? 0,
            progressColor: 'success',
          },
          {
            title: 'Today Customer Count',
            value: data.customers_created_yesterday ?? '-',
            icon: <AccessTimeIcon />,
          },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false); // 🔹 Stop loading
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {loading ? (
          // 🔹 Show loader while fetching
          <MDBox
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="60vh"
          >
            <CircularProgress size={50} />
            <Typography variant="body2" color="text" sx={{ mt: 2 }}>
              Loading Dashboard...
            </Typography>
          </MDBox>
        ) : (
          <>
            <MDBox py={3}>
              <Grid container spacing={3}>
                {stats.map((stat) => (
                  <Grid item xs={12} md={6} lg={3} key={stat.title}>
                    <MDBox mb={1.5} height="auto">
                      <ComplexStatisticsCard
                        title={stat.title}
                        count={stat.value}
                        percentage={{
                          color: stat.progressColor,
                          amount: stat.change,
                          label: '',
                        }}
                        icon={stat.icon}
                        progressValue={stat.progressValue}
                        progressColor={stat.progressColor}
                      />
                    </MDBox>
                  </Grid>
                ))}
              </Grid>
            </MDBox>
            <MDBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={8}>
                  <Projects />
                </Grid>
                {/* <Grid item xs={12} md={6} lg={4}>
                  <OrdersOverview />
                </Grid> */}
              </Grid>
            </MDBox>
          </>
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
