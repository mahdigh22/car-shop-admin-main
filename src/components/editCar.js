/* eslint-disable react/self-closing-comp */
/* eslint-disable  */

import React, { useEffect, useState } from 'react';
import { Card, Grid, Button, TextField, Box, Stack, Typography, Divider, useMediaQuery, useTheme } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import storage from 'src/components/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function EditCar(props) {
  const { id,product } = props;
  const navigate = useNavigate();
  const axios = require('axios');

  const [Status, setStatus] = React.useState(true);
  const [imgsSrc, setImgsSrc] = useState([]);

  const [CarName, setCarName] = useState('');
  const [Model, setModel] = useState('');
  const [Price, setPrice] = useState('');
  const [Location, setLocation] = useState('');
  const [Transmission, setTransmission] = useState('');
  const [ExteriorColor, setExteriorColor] = useState('');
  const [InteriorColor, setInteriorColor] = useState('');
  const [FuelType, setFuelType] = useState('');
  const [Seats, setSeats] = useState('');
  const [Drivetrain, setDrivetrain] = useState('');
  const [Description, setDescription] = useState('');
  const [file, setFile] = useState([]);
  const [progress, setProgress] = useState('');
  const [urls, setURLs] = useState('');
  function handleChange(event) {
    // setFile(event.target.files);
    setFile([event.target.files]);
  }

  const uploadFiles = (files) => {
    const promises = [];
    // console.log('fil',files[0])
    setImgsSrc([]);
    for (let i = 0; i < files[0]?.length; i++) {
      // console.log('loop',files[0][i].name);

      const sotrageRef = ref(storage, `files/${files[0][i].name}`);

      const uploadTask = uploadBytesResumable(sotrageRef, files[0][i]);

      promises.push(uploadTask);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(prog);
        },
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
            setImgsSrc((prevState) => [...prevState, downloadURLs]);
            // console.log("File available at", downloadURLs);
          });
        }
      );
    }
    Promise.all(promises)
      .then(() => alert('All images uploaded'))

      .then((err) => console.log(err));
  };
  const [allDetails, setAllDetails] = useState({
    imgsSrc: [],
    CarName: '',
    Model: '',
    Price: '',
    Description: '',
    Status: '',
    Location: '',
    Transmission: '',
    ExteriorColor: '',
    InteriorColor: '',
    FuelType: '',
    Seats: '',
    Drivetrain: '',
  },[]);

  useEffect(() => {
    setAllDetails({
      ...allDetails,
      imgsSrc: imgsSrc,
      CarName: CarName,
      Model: Model,
      Price: Price,
      Description: Description,
      Status: Status,
      Location: Location,
      Transmission: Transmission,
      ExteriorColor: ExteriorColor,
      InteriorColor: InteriorColor,
      FuelType: FuelType,
      Seats: Seats,
      Drivetrain: Drivetrain,
      auction:product.auction
    });
  },[]);
  const changeHandler = (e) => {
    // setImgsSrc([]);

    // setFile([]);
    // console.log('img', imgsSrc);

    setAllDetails({
      ...allDetails,
      imgsSrc: imgsSrc,
      CarName: CarName,
      Model: Model,
      Price: Price,
      Description: Description,
      Status: Status,
      Location: Location,
      Transmission: Transmission,
      ExteriorColor: ExteriorColor,
      InteriorColor: InteriorColor,
      FuelType: FuelType,
      Seats: Seats,
      Drivetrain: Drivetrain,
      auction:product.auction
    });

    axios
      .post('https://carshopserver.vercel.app/hello2', {
        allDetails,id
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log('error',error);
      });

    // console.log('allDetails', allDetails);
    // window.location.reload();
  };
  
  // console.log('all',allDetails);
  console.log('id',product)
  const cancelRequest = () => {
    navigate('/dashboard/products');
  };
  const theme = useTheme();
  const smallScreens = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ p: 2, width: '100%' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Edit Car
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container>
            <Grid item xs={12} md={12} sx={{mb:1,gap:3}} display='flex'  alignItems='center' >
              <Button variant="outlined" component="label" sx={{ width: 180, height: 200 }}>
                <UploadIcon /> Upload Images
                <input hidden accept="image/*" multiple type="file" onChange={handleChange} />
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  uploadFiles(file);
                }}
              >
                upload Images
              </Button>
            </Grid>
            <Grid item md={12} lg={12}>
             
                <Stack direction="column" spacing={2}>
                  <Stack direction={smallScreens ? 'column' : 'row'} spacing={1}> 
                    <TextField
                      label="Car Name"
                      variant="outlined"
                      fullWidth
                      defaultValue={product?.CarName}
                      onChange={(e) => {
                        setCarName(e.target.value);
                      }}
                    />

                    <TextField
                      id="outlined-basic"
                      label="Location"
                      variant="outlined"
                      fullWidth
                      defaultValue={product?.Location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                      }}
                    />
                    
                  </Stack>
                  <Stack direction={smallScreens ? 'column' : 'row'} spacing={1}>
                    <TextField
                      id="outlined-basic"
                      label="Model"
                      defaultValue={product?.Model}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setModel(e.target.value);
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Transmission"
                      defaultValue={product?.Transmission}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setTransmission(e.target.value);
                      }}
                    />
                  </Stack>
                  <Stack direction={smallScreens ? 'column' : 'row'} spacing={1}>
                    <TextField
                      id="outlined-basic"
                      label="Price"
                      variant="outlined"
                      defaultValue={product?.Price}
                      fullWidth
                      type="number"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Exterior Color"
                      defaultValue={product?.ExteriorColor}
                      variant="outlined"
                      fullWidth
                      type="text"
                      onChange={(e) => {
                        setExteriorColor(e.target.value);
                      }}
                    />
                  </Stack>
                  <Stack direction={smallScreens ? 'column' : 'row'} spacing={1}>
                    <TextField
                      id="outlined-basic"
                      label="Interior Color"
                      defaultValue={product?.InteriorColor}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setInteriorColor(e.target.value);
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Fuel Type"
                      defaultValue={product?.FuelType}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setFuelType(e.target.value);
                      }}
                    />
                  </Stack>
                  <Stack direction={smallScreens ? 'column' : 'row'} spacing={1}>
                    <TextField
                      id="outlined-basic"
                      label="Seats"
                      defaultValue={product?.Seats}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setSeats(e.target.value);
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Drivetrain"
                      defaultValue={product?.Drivetrain}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setDrivetrain(e.target.value);
                      }}
                    />
                  </Stack>

                  <TextField
                    id="outlined-basic"
                    label="Description"
                    defaultValue={product?.Description}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Status}
                        onChange={(e) => {
                          setStatus(!Status);
                        }}
                      />
                    }
                    label="Sale"
                  />
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }} justifyContent="flex-end">
                  <Button variant="outlined" size="large" onClick={cancelRequest}>
                    Cancel
                  </Button>
                  <Button variant="contained" size="large" onClick={changeHandler}>
                    Edit
                  </Button>
                </Stack>
            
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
}
