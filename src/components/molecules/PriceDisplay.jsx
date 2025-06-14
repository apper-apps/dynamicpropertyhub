import React from 'react';
import Text from '@/components/atoms/Text';

const PriceDisplay = ({ price, className = '', size = 'lg' }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Text 
      variant="heading" 
      weight="bold" 
      size={size}
      color="primary"
      className={className}
    >
      {formatPrice(price)}
    </Text>
  );
};

export default PriceDisplay;