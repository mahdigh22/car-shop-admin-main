import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box } from '@mui/material';
// components
import Page from '../components/Page';
import Loading from '../components/loading';
import Iconify from '../components/Iconify';
// sections

import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------
const URL = 'https://ip.nf/me.json';
export default function DashboardApp() {
  const theme = useTheme();
  const axios = require('axios');
  const [deals, setDeals] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [Products, setProducts] = useState([]);
  const [Ids, setIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([{ ip: '' }]);

  const userNames = Array.isArray(deals)
    ? deals?.map((name) => {
        return name?.carId;
      })
    : [];
  const userNames2 = Array.isArray(Products)
    ? Products?.map((name) => {
        return name?.id;
      })
    : [];
  const userNames3 = Array.isArray(users)
    ? users?.map((name) => {
        return name?.clientIp;
      })
    : [];
  function getDifference(arr1, arr2) {
    return (
      arr1
        // filtering difference in first array with second array
        ?.filter((x) => !arr2.includes(x))
        // filtering difference in second array with first array
        .concat(arr2.filter((x) => !arr1.includes(x)))
    );
  }

  const found = deals?.filter((obj) => {
    return obj.carId;
  });

  async function getGeoInfo() {
    await fetch(URL, { method: 'get' })
      .then((response) => response.json())
      .then((data) => {
        setInfo({ ...data });
      });
  }

  async function dealsinfo() {
    await axios
      .get('https://carshopserver.vercel.app/sendDeals')
      .then((resp) => {
        setDeals(resp.data);

        //  console.log(Products[5].Image.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function productsinfo() {
    await axios
      .get('https://carshopserver.vercel.app/products')
      .then((resp) => {
        setProducts(resp.data);
        setLoading(false);
        //  console.log(Products[5].Image.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function usersinfo() {
    await axios
      .get('https://carshopserver.vercel.app/users')
      .then((resp) => {
        setUsers(resp.data);
        //  console.log(Products[5].Image.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  React.useEffect(() => {
    usersinfo();
    productsinfo();
    dealsinfo();
    getGeoInfo();
  }, []);

  console.log('users', info);

  if (loading) {
    return (
      <Page title="Dashboard">
        <Container>
          <Box sx={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loading />
          </Box>
        </Container>
      </Page>
    );
  }
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Deals" total={deals?.length} icon={'mdi:deal-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={users?.length} color="info" icon={'ph:users-three-duotone'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Cars Number"
              total={Products?.length}
              color="warning"
              icon={'ic:round-directions-car'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Cars without deals"
              total={getDifference(userNames, userNames2).length}
              color="error"
              icon={'ant-design:bug-filled'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
