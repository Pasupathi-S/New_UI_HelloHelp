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

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

function ComplexStatisticsCard({ color, title, count, percentage, icon }) {
  console.log(title);

  return (
    <Card
      sx={{
        height: '90px',
      }}
    >
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <MDBox textAlign="left" lineHeight={1.45}>
          <MDTypography
            variant="button"
            fontWeight="light"
            color="text"
            sx={{ fontSize: '14px', fontWeight: '500', color: '#737373', pb: 1.5 }}
          >
            {title}
          </MDTypography>
          <MDTypography variant="h4" sx={{ fontSize: '24px', fontWeight: '700', color: '#0A0A0A' }}>
            {count}
          </MDTypography>
        </MDBox>
        <MDBox
          sx={{
            backgroundColor:
              title === 'Total Agents'
                ? '#2460E8'
                : title === 'Total Customers'
                ? '#309A46'
                : title === 'Video Calls'
                ? '#892BDD'
                : title === 'One Day Customer Count'
                ? '#E1530E'
                : '',
          }}
          color={color === 'light' ? 'dark' : 'white'}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="3rem"
          height="3rem"
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </MDBox>
      </MDBox>
      {/* <Divider /> */}
      <MDBox pb={2} px={2}>
        <MDTypography component="p" variant="button" color="text" display="flex">
          <MDTypography
            component="span"
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.amount}
          </MDTypography>
          &nbsp;{percentage.label}
        </MDTypography>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: 'info',
  percentage: {
    color: 'success',
    text: '',
    label: '',
  },
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark',
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      'primary',
      'secondary',
      'info',
      'success',
      'warning',
      'error',
      'dark',
      'white',
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard;
