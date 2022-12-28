// routes
import { useState } from 'react';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

import Login from './pages/Login';

// ----------------------------------------------------------------------


async function getToken() {

  const tokenString = localStorage.getItem('token');

  const userToken = JSON.parse(tokenString);
  console.log(userToken)
  return userToken;
}
export default function App() {
  const [open, setOpen] = useState(false);
  const token = getToken();
  console.log(token)
  if (!token) {
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
