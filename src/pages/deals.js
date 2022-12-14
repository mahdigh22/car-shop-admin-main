import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Page from '../components/Page';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Deals() {
  const axios = require('axios');
  const [deals, setDeals] = React.useState([]);
  React.useEffect(() => {
    axios.get('https://carshopserver.vercel.app/sendDeals').then((resp) => {
      setDeals(resp.data);
      //  console.log(Products[5].Image.data)
    });
  }, []);
  // console.log(deals)
  return (
    <Page title="Dashboard: Deals">
      <Container>
        <>
          <TableContainer component={Paper} sx={{border:'1px solid gray'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Phone Number</TableCell>
                  <TableCell align="right">Zip Code</TableCell>
                  <TableCell align="right">Interested Car</TableCell>
                  <TableCell align="right">Car ID</TableCell>
                  <TableCell align="right">Car Model</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deals.map((row,index) => (
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
