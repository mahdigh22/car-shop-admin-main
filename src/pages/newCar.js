/* eslint-disable react/self-closing-comp */
/* eslint-disable  */
import React, { useState } from "react";
import { Card, Grid, Button, TextField, Box, Stack, Typography, Divider } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';

export default function NewCar() {

  const navigate = useNavigate();
  const axios = require('axios');
  const [Status, setStatus] = React.useState(true);
  const [imgsSrc, setImgsSrc] = useState();
  const [CarName, setCarName] = useState();
  const [Model, setModel] = useState();
  const [Price, setPrice] = useState();
  const [Description, setDescription] = useState();
  
  const onChange = (e) => {
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgsSrc( reader.result);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  };

  const [allDetails, setAllDetails] = useState({
    imgsSrc: '',
    CarName: '',
    Model: '',
    Price: '',
    Description: '',
    Status: '',
  });
  const changeHandler = e => {
    setAllDetails({ ...allDetails, imgsSrc: imgsSrc, CarName: CarName, Model: Model, Price: Price, Description: Description, Status: Status })
    axios.post('http://localhost:5000/hello', {
      allDetails
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  console.log(allDetails);

const cancelRequest=()=>{
  navigate('/dashboard/products');
}

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>


        <Card sx={{ p: 2, width: '80%' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Add New Car</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container>
            <Grid item xs={12} md={3}>
              <Button variant="outlined" component="label" sx={{ width: 180, height: 200 }}>
                <UploadIcon /> Upload Images
                <input hidden accept="image/*" multiple type="file" onChange={onChange} />
              </Button>
            </Grid>
            <Grid item xs={12} md={9}>

              <Stack direction="column" spacing={2}>
                <TextField id="outlined-basic" label="Car Name" variant="outlined" fullWidth onChange={(e) => {
                  setCarName(e.target.value)
                }} />
                <TextField id="outlined-basic" label="Model" variant="outlined" fullWidth onChange={(e) => {
                  setModel(e.target.value)
                }} />
                <TextField id="outlined-basic" label="Price" variant="outlined" fullWidth type="number" onChange={(e) => {
                  setPrice(e.target.value)
                }} />
                <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth multiline
                  rows={4} onChange={(e) => {
                    setDescription(e.target.value)
                  }} />
                <FormControlLabel control={<Checkbox checked={Status} onChange={(e) => {
                  setStatus(!Status)
                }} />} label="Sale" />
              </Stack>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }} justifyContent="flex-end">
                <Button variant="outlined" size="large" onClick={cancelRequest}>Cancel</Button>
                <Button variant="contained" size="large" onClick={changeHandler}>Save</Button>
              </Stack>
            </Grid>
          </Grid>
        </Card></Box>
    </>
  )
}