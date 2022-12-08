import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
// components

import Modal from '@mui/material/Modal';
import { useState } from 'react';
import EditCar from '../../../components/editCar';
import Label from '../../../components/Label';




// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,height:'100%',
  bgcolor: 'background.paper',
  overflow: "scroll",
  boxShadow: 24,
  p: 4,
};

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
  const {
    CarName,
    Price,
    colors,
    Status,

    Image,
    Location,
    Transmission,
    ExteriorColor,
    InteriorColor,
    FuelType,
    Seats,
    Drivetrain,id
  } = product;
  const images = Image.split(',');
  const priceSale = Price - 10;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditCar id={id}/>
        </Box>
      </Modal>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Button
          variant="contained"
          size="small"
          sx={{
            zIndex: 9,
            height: '25px',
            width: '40px',
            top: 11,
            right: 150,
            position: 'absolute',
            textTransform: 'uppercase',
          }}
          onClick={handleOpen}
        >
          {' '}
          Edit
        </Button>

        {Status === 'true' && (
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
            {Status === 'true' && 'sale'}
          </Label>
        )}
        <ProductImgStyle alt={CarName} src={images[0]} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {CarName}
          </Typography>
        </Link>

        {/* <ColorPreview colors={colors} /> */}
        <Stack direction="row" justifyContent="space-between">
          <Typography
            component="span"
            variant="body1"
            sx={{
              color: 'text.disabled',
              textDecoration: 'line-through',
            }}
          >
            {priceSale}
          </Typography>{' '}
          <Typography
            component="span"
            variant="subtitle1"
            sx={{
              color: 'green',
            }}
          >
            {Price}
          </Typography>
        </Stack>
        <Stack direction="column">
          <Stack direction="row" spacing={3}>
            <Box>{Location}</Box>
            <Box>{Transmission}</Box>
          </Stack>
          <Stack direction="row" spacing={3}>
            {' '}
            <Box> {ExteriorColor}</Box>
            <Box> {InteriorColor}</Box>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Box>{FuelType}</Box>
            <Box>{Seats}</Box>
          </Stack>
          <Stack direction="row">{Drivetrain}</Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
