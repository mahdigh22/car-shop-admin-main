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

// ----------------------------------------------------------------------

export default function App() {
  const [open, setOpen] = useState();

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
        await setOpen(true);
      })
      .catch(async function (error) {
        await setOpen(false);
      });
  }

 
  setInterval(getToken, 3000);

  if (open === false ||token===null) {
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
