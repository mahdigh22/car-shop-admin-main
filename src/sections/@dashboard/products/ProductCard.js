import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
// components
import Label from '../../../components/Label';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { CarName, Image, Price, colors, Status, priceSale } = product;
  console.log('buffer',Image.data)
  const test=String.fromCodePoint(...Image.data)
console.log('image', test)


  return ( 
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {Status==='true' && (
          <Label
            variant="filled"
            color={(Status === 'true' && 'info') || 'error'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {Status==='true'&&'sale'}
          </Label>
        )}
        <ProductImgStyle alt={CarName} src={String.fromCodePoint(...Image.data)} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {CarName}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {/* {priceSale && fCurrency(priceSale)} */}
            </Typography>
            &nbsp;
            {Price}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
