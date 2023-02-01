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
  const [open, setOpen] = useState(false);

  const axios = require('axios');
const token = JSON.parse(localStorage.getItem('token'));
   async function getToken() {
    
    console.log('token',token.config.params.token)
    await axios
      .get('https://carshopserver.vercel.app/user/validateToken', {
        params: { token: token.config.params.token },
        headers: {
          Authorization: `Bearer ${token.config.params.token}`,
          'X-Custom-Header': 'foobar',
        },
      })
      .then(function (response) {
        setOpen(true)

       
      })
      .catch(function (error) {
       
        setOpen(false)
        
      })
      
  }
  
   setInterval( getToken, 1000);
   

    if (!open) {
    return <Login  />;
  }
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
