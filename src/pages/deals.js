/* eslint-disable react/self-closing-comp */
/* eslint-disable  */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Container, Stack } from '@mui/material';
import Page from '../components/Page';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function Deals() {
  const axios = require('axios');
  const [deals, setDeals] = React.useState([]);
  
  React.useEffect(() => {
    axios.get('https://carshopserver.vercel.app/sendDeals').then((resp) => {
      setDeals(resp.data);
      //  console.log(Products[5].Image.data)
    });
  }, []);

  async function DeleteDeal(id) {
    await axios
      .post('https://carshopserver.vercel.app/deleteDeal', {
        id,
      })
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async function updateDeal(status, id) {
    await axios
      .post('https://carshopserver.vercel.app/updateDeal', {
        status,
        id,
      })
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //  updateDeal
  // console.log(deals)
  return (
    <Page title="Dashboard: Deals">
      <Container>
        <>
          <TableContainer component={Paper} sx={{ border: '1px solid gray' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="right">Phone Number</TableCell>
                  <TableCell align="right">Zip Code</TableCell>
                  <TableCell align="right">Interested Car</TableCell>
                  <TableCell align="right">Car ID</TableCell>
                  <TableCell align="right">Car Model</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deals.map((row, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.clientName}
                    </TableCell>
                    <TableCell align="right">{row.clientEmail}</TableCell>
                    <TableCell align="right">{row.clientNumber}</TableCell>
                    <TableCell align="right">{row.clientZip}</TableCell>
                    <TableCell align="right">{row.carName}</TableCell>
                    <TableCell align="right">{row.carId}</TableCell>
                    <TableCell align="right">{row.carModel}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant={row.status === 'true' ? 'contained' : 'outlined'}
                          onClick={() => {
                            updateDeal('true', row.id);
                          }}
                          disabled={row.status === 'true'}
                        >
                          {row.status === 'true' ? 'checked' : 'pending'}
                        </Button>
                        {row.status === 'true' ? (
                          ''
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => {
                              DeleteDeal(row.id);
                            }}
                          >
                            Delete
                          </Button>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </Container>
    </Page>
  );
}
