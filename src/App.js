/* eslint-disable  */

// routes

import { useEffect, useState } from 'react';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

import Login from './pages/Login';
import Loading from './components/loading';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function App() {
  const [open, setOpen] = useState();
  const [validate, setValidate] = useState(false);

  const axios = require('axios');
  const token = JSON.parse(localStorage.getItem('token'));
  async function getToken() {
    await axios
      .get('https://carshopserver.vercel.app/user/validateToken', {
        params: { token: token?.config?.params.token },
        headers: {
          Authorization: `Bearer ${token?.config?.params.token}`,
          'X-Custom-Header': 'foobar',
        },
      })
      .then(async function (response) {
        console.log('token', response);
        setOpen(true);
        setValidate(true);
      })
      .catch(async function (error) {
        await setOpen(false);
      });
  }

  useEffect(() => {
    getToken();
  });
  // setInterval(getToken, 2000);

  if (validate === false) {
    return (
      <Box sx={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loading />
      </Box>
    );
  }
  if (open === false) {
    return <Login />;
  }

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
