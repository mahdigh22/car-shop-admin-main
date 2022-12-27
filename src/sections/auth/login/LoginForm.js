/* eslint-disable  */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form

// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
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
  const [Data, setData] = useState([]);
  const [Email, setEmail] = useState();
  const [Pass, setPass] = useState();
  const [res, setRes] = useState();

  const saveEmail = (event) => {
    setEmail(event.target.value);
  };
  const savePass = (event) => {
    setPass(event.target.value);
  };
  async function  getData(){
   
    await axios
    .post('https://carshopserver.vercel.app/login', {
      Email,
      Pass,
    })
    .then(function (response) {
      setRes(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  const setToken = (userToken) => {
    console.log(userToken)
    localStorage.setItem('token', JSON.stringify(userToken));
  }

  
  async function CheckIfValid() {
   await getData();
    if (res === 'Done') {
      setToken(true);
      navigate('/dashboard/products');
    } 
    else {
      setToken(false);
      alert('Oh wrong Email or Password!')
    }
  };

  return (
    <>
      <Stack spacing={3}>
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
