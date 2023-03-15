import { useState, useEffect } from 'react';
// material
import { Box, Button, Container, Stack, Typography } from '@mui/material';
// components

import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import Loading from '../components/loading';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [Products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [sort, setSort] = useState('Newest');
  const [loading, setLoading] = useState(true);

 
  const axios = require('axios');
 
  async function getcars() {
    await axios.get('https://carshopserver.vercel.app/products').then((resp) => {
      setProducts(resp.data);
      setLoading(false);
      //  console.log(Products[5].Image.data)
    });
  }
  async function getcarsHighLow() {
    await axios.get('https://carshopserver.vercel.app/HighLowproducts').then((resp) => {
      setProducts(resp.data);
      //  console.log(Products[5].Image.data)
    });
  }
  async function getcarsLowHigh() {
    await axios.get('https://carshopserver.vercel.app/LowHighproducts').then((resp) => {
      setProducts(resp.data);
      //  console.log(Products[5].Image.data)
    });
  }
  useEffect(() => {
    getcars();
  }, []);

  // console.log('pro', Products[0]?.Image.split(','))
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const onSubmit = () => {
    navigate('/dashboard/newCar');
  };
  const handleHighLow = () => {
    getcarsHighLow();
    setSort('High-Low');
  };

  const handleLowHigh = () => {
    getcarsLowHigh();
    setSort('Low-High');
  };
  const handleNewest = () => {
    getcars();
    setSort('Newest');
  };
  if (loading) {
    return (
      <Page title="Dashboard: Products">
        <Container>
          <Box sx={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loading />
          </Box>
        </Container>
      </Page>
    );
  }
  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Cars
        </Typography>
        <Stack direction="row" justifyContent="flex-end" sx={{ p: 2 }}>
          <Button variant="contained" size="large" onClick={onSubmit}>
            Add New Car
          </Button>
        </Stack>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {/* <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            /> */}
            <ProductSort
              handleHighLow={handleHighLow}
              handleLowHigh={handleLowHigh}
              sort={sort}
              handleNewest={handleNewest}
            />
          </Stack>
        </Stack>

        <ProductList products={Products} product={Products}  />
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}
