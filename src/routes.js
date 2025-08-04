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
    name: 'Dashboard',
    key: 'dashboard',
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: '/dashboard',
    component: <Dashboard />,
  },
  {
    type: 'collapse',
    name: 'Users',
    key: 'users',
    icon: <Icon fontSize="small">person</Icon>,
    route: '/users',
    component: <Users />,
  },
  {
    type: 'collapse',
    name: 'Call History',
    key: 'call-history',
    icon: <Icon fontSize="small">call</Icon>,
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
    name: 'Push Notifications',
    key: 'notifications',
    icon: <Icon fontSize="small">notifications</Icon>,
    route: '/notifications',
    component: <Notifications />,
  },
  {
    type: 'collapse',
    name: 'Notification History',
    key: 'notification-history',
    icon: <Icon fontSize="small">notifications</Icon>,
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
    name: 'Logout',
    key: 'sign-in',
    icon: <Icon fontSize="small">logout</Icon>,
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
