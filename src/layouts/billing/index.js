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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import MasterCard from "examples/Cards/MasterCard";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
// import PaymentMethod from "layouts/billing/components/PaymentMethod";
import CallHistory from "layouts/billing/components/CallHistory";
// import CallDetails from "layouts/billing/components/CallDetails";
// import BillingInformation from "layouts/billing/components/BillingInformation";
// import Transactions from "layouts/billing/components/Transactions";

function Billing() {
  return (
    // <DashboardLayout>
    //   <DashboardNavbar absolute isMini />
    //   <MDBox mt={8}>
    //     <MDBox mb={3}>
    //       {/* <Grid container spacing={3}> */}
    //       {/* <Grid item xs={12} lg={8}>
    //           <Grid container spacing={3}> */}
    //       {/* <Grid item xs={12} xl={6}>
    //               <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
    //             </Grid> */}
    //       {/* <Grid item xs={12} md={6} xl={3}>
    //               <DefaultInfoCard
    //                 icon="account_balance"
    //                 title="salary"
    //                 description="Belong Interactive"
    //                 value="+$2000"
    //               />
    //             </Grid>
    //             <Grid item xs={12} md={6} xl={3}>
    //               <DefaultInfoCard
    //                 icon="paypal"
    //                 title="paypal"
    //                 description="Freelance Payment"
    //                 value="$455.00"
    //               />
    //             </Grid>
    //             <Grid item xs={12}>
    //               <PaymentMethod />
    //             </Grid> */}
    //       {/* </Grid> */}
    //       {/* </Grid> */}
    //       <Grid>
    //         <Grid item xs={12} lg={4}>
    //           <CallHistory />
    //         </Grid>
    //       </Grid>
    //       <Grid item xs={12} lg={4}>
    //         <CallDetails />
    //       </Grid>
    //       {/* </Grid> */}
    //     </MDBox>
    //     {/* <MDBox mb={3}>
    //       <Grid container spacing={3}>
    //         <Grid item xs={12} md={7}>
    //           <BillingInformation />
    //         </Grid>
    //         <Grid item xs={12} md={5}>
    //           <Transactions />
    //         </Grid>
    //       </Grid>
    //     </MDBox> */}
    //   </MDBox>
    //   <Footer />
    // </DashboardLayout>
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          {/* <Grid container spacing={3}> */}
          <Grid item xs={12} lg={6}>
            <CallHistory />
          </Grid>
          {/* <Grid item xs={12} lg={6}>
            <CallDetails />
          </Grid> */}
          {/* </Grid> */}
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default Billing;
