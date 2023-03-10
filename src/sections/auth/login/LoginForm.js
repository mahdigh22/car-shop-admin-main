/* eslint-disable  */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form

// @mui
import { Link, Stack, IconButton, InputAdornment, Typography } from '@mui/material';
// components

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const axios = require('axios');
  const [Email, setEmail] = useState();
  const [Pass, setPass] = useState();
  const [res, setRes] = useState();

  const saveEmail = (event) => {
    setEmail(event.target.value);
  };
  const savePass = (event) => {
    setPass(event.target.value);
  };
  async function getData() {
    await axios
      .post('https://carshopserver.vercel.app/api/auth', {
        Email,
        Pass,
      })
      .then(async function (response) {
        console.log(response);
        await axios
          .get('https://carshopserver.vercel.app/user/validateToken', {
            params: { token: response?.data },
            headers: {
              Authorization: `Bearer ${response?.data}`,
              'X-Custom-Header': 'foobar',
            },
          })
          .then(function (response) {
            if (response) {
              localStorage.setItem('token', JSON.stringify(response));
              navigate('/dashboard/products');
              window.location.reload();
            } else {
              navigate('/login');
            }
          });
      })
      .catch(function (error) {
        navigate('/login');
        alert('Oh wrong Email or Password!');
      });
  }

  async function CheckIfValid() {
    await getData();
  }

  return (
    <>
      <Stack spacing={3}>
        <Typography color={'red'}>Email:m@gmail.com</Typography>
        <Typography color={'red'}>password:1234</Typography>
        <TextField name="email" label="Email address" onChange={saveEmail} />

        <TextField
          name="password"
          label="Password"
          onChange={savePass}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <Button fullWidth size="large" type="submit" variant="contained" onClick={CheckIfValid}>
        Login
      </Button>
    </>
  );
}
