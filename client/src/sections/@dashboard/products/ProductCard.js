import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import Modal from '../../../components/Modal/ServiceDetailsWindow';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------
const StyledProductImg = styled('img')({
  top: '0',
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
  const { name, cover, price, colors, status, priceSale } = product;
  const [showProductDetails, setShowProductDetails] = useState(false);

  const handleProductClick = () => {
    setShowProductDetails(true);
  };

  const handleCloseDetails = () => {
    setShowProductDetails(false);
  };

  return (
    <Link
      color="inherit"
      underline="none" // Remove underline from the link
      onClick={handleProductClick} // Attach the click event to the Link component
      style={{ cursor: 'pointer' }} // Set the cursor to a pointer when hovering over the card
    >
      <Card>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {status && (
            <Label
              variant="filled"
              color={(status === 'sale' && 'error') || 'info'}
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: 'absolute',
                textTransform: 'uppercase',
              }}
            >
              {status}
            </Label>
          )}
          <StyledProductImg alt={name} src={cover} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link color="inherit" underline="hover">
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <ColorPreview colors={colors} />
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {priceSale && fCurrency(priceSale)}
              </Typography>
              &nbsp;
              {fCurrency(price)}
            </Typography>
          </Stack>
        </Stack>
        {showProductDetails && <Modal product={product} onClose={handleCloseDetails} />}
      </Card>
    </Link>
  );
}
