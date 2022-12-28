import { useState, useEffect } from 'react';
// material
import { Button, Container, Stack, Typography } from '@mui/material';
// components

import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function EcommerceShop() {

  const [openFilter, setOpenFilter] = useState(false);
  const [Products, setProducts] = useState([]);
  const navigate = useNavigate();

  const axios = require('axios');
  async function getcars() {
    await axios.get('https://carshopserver.vercel.app/products').then(resp => {

      setProducts(resp.data);
      //  console.log(Products[5].Image.data)
    });
  }
  useEffect(() => {
    getcars()
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

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Cars
        </Typography>
        <Stack direction="row" justifyContent="flex-end" sx={{ p: 2 }}>
          <Button variant='contained' size='large' onClick={onSubmit}>Add New Car</Button>
        </Stack>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>

        </Stack>

        <ProductList products={Products} product={Products} />
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}
