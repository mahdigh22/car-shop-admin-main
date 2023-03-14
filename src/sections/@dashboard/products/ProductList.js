import PropTypes from 'prop-types';
// material
import { Grid, Typography } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductList({ products, product,...other }) {
  console.log('rr',product)
  return (
    <Grid container spacing={3} {...other}>
      {products?.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
       {/* {product.map((product) => (
        <Typography>
         {product.CarName}
        </Typography>
      ))} */}
    </Grid>
  );
}
