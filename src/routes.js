// Material Dashboard 2 React layouts
import Dashboard from 'layouts/dashboard';
import Users from 'layouts/tables';
import Billing from 'layouts/billing';
import RTL from 'layouts/rtl';
import Notifications from 'layouts/notifications/push notifications';
// import NotificationHistory from "layouts/push notifications";
import NotificationHistory from './layouts/notifications/NotificationHistory';
// import Profile from "layouts/profile";
import SignIn from 'layouts/authentication/sign-in';
import SignUp from 'layouts/authentication/sign-up';
// @mui icons
import Icon from '@mui/material/Icon';
import PeopleIcon from '@mui/icons-material/People';

// Agents component
// import Agents from "layouts/tables/Agents";

const routes = [
  {
    type: 'collapse',
<<<<<<< HEAD
    name: <span style={{ color: '#737373', fontWeight: '700' }}>Dashboard</span>,
    key: 'dashboard',
    icon: (
      <Icon fontSize="small" sx={{ color: '#737373' }}>
        dashboard
      </Icon>
    ),
=======
    name: 'Dashboard',
    key: 'dashboard',
    icon: <Icon fontSize="small">dashboard</Icon>,
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
    route: '/dashboard',
    component: <Dashboard />,
  },
  {
    type: 'collapse',
<<<<<<< HEAD
    name: <span style={{ color: '#737373', fontWeight: '700' }}>Users</span>,
    key: 'users',
    icon: (
      <Icon fontSize="small" sx={{ color: '#737373' }}>
        person
      </Icon>
    ),
=======
    name: 'Users',
    key: 'users',
    icon: <Icon fontSize="small">person</Icon>,
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
    route: '/users',
    component: <Users />,
  },
  {
    type: 'collapse',
<<<<<<< HEAD
    name: <span style={{ color: '#737373', fontWeight: '700' }}>Call History</span>,
    key: 'call-history',
    icon: (
      <Icon fontSize="small" sx={{ color: '#737373' }}>
        call
      </Icon>
    ),
=======
    name: 'Call History',
    key: 'call-history',
    icon: <Icon fontSize="small">call</Icon>,
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
    route: '/call-history',
    component: <Billing />,
  },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  {
    type: 'collapse',
<<<<<<< HEAD
    name: <span style={{ color: '#737373', fontWeight: '700' }}>Push Notifications</span>,
    key: 'notifications',
    icon: (
      <Icon fontSize="small" sx={{ color: '#737373' }}>
        notifications
      </Icon>
    ),
=======
    name: 'Push Notifications',
    key: 'notifications',
    icon: <Icon fontSize="small">notifications</Icon>,
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
    route: '/notifications',
    component: <Notifications />,
  },
  {
    type: 'collapse',
<<<<<<< HEAD
    name: <span style={{ color: '#737373', fontWeight: '700' }}>Notification History</span>,
    key: 'notification-history',
    icon: (
      <Icon fontSize="small" sx={{ color: '#737373' }}>
        notifications
      </Icon>
    ),
=======
    name: 'Notification History',
    key: 'notification-history',
    icon: <Icon fontSize="small">notifications</Icon>,
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
    route: '/notification-history',
    component: <NotificationHistory />,
  },
  // {
  //   //   // type: "collapse",
  //   //   // name: "Profile",
  //   //   // key: "profile",
  //   //   // icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  {
    type: 'collapse',
<<<<<<< HEAD
    name: <span style={{ color: '#737373', fontWeight: '700' }}> Logout </span>,
    key: 'sign-in',
    icon: (
      <Icon fontSize="small" sx={{ color: '#737373' }}>
        logout
      </Icon>
    ),
=======
    name: 'Logout',
    key: 'sign-in',
    icon: <Icon fontSize="small">logout</Icon>,
>>>>>>> abc9b78c4c1ca065f8b8785ad8106686ed0b6e2e
    route: '/authentication/sign-in',
    component: <SignIn />,
  },
  {
    // type: "collapse",
    // name: "Sign Up",
    // key: "sign-up",
    // icon: <Icon fontSize="small">assignment</Icon>,
    route: '/authentication/sign-up',
    component: <SignUp />,
  },
  // {
  //   type: "collapse",
  //   name: "Agents",
  //   key: "agents",
  //   icon: <PeopleIcon fontSize="small" />,
  //   route: "/agents",
  //   component: <Agents />,
  // },
];

export default routes;
